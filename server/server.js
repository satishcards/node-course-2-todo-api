const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
const {bcrypt}=require('bcryptjs');
require('./config/config');

const _=require('lodash');

var {mongoose}=require('./db/mongoose');
var {User}=require('./models/users');
var {Todos}=require('./models/todos');
var {authenticate}=require('./middleware/authenticate');
var app=express();
app.use(bodyParser.json());

const port =process.env.PORT || 3000;
app.post('/todos',authenticate,(req,res)=>{
    var todo=new Todos({
        text:req.body.text,
        _creator:req.user._id
    });
    todo.save().then((doc)=>{
        console.log(doc);
        res.status(200).send(doc);
    },(err)=>{
        console.log(err);
        res.status(400).send(err);
    });
});
app.get('/todos',authenticate,(req,res)=>{
    //var satish='<h1><center>SMARTCHIP</center></h1>'
    Todos.find({_creator:req.user._id}).then((todos)=>{
      //  res.send(satish);
      console.log(todos);
       res.send({todos});
    },(err)=>{
        res.send(err);
    });

});
app.get('/todos/:id',authenticate,(req,res)=>{

    var id=req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todos.findOne({_id:id,_creator:req.user._id}).then((todo)=>{
        if(!todo){
             res.status(400).send("Id not found");
        }
        res.status(200).send({todo});
    },(err)=>{
        res.status(404).send();
    }).catch((err)=>{
        res.status(404).send();
    });


})
app.delete('/todos/:id',authenticate,(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Id invalid');
    }
    Todos.findOneAndRemove({_id:id,_creator:req.user._id}).then((result)=>{
        if(!result)
            return res.status(404).send('ID not found');
        res.status(200).send({result});
    }).catch((err)=>{
        res.status(404).send('Not able to delete');
    });

});
app.patch('/todos/:id',authenticate,(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Invalid Id');
    }
    var body=_.pick(req.body,['text','completed']);
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt=new Date().getTime();
    }else{
        body.completed=false;
        body.completedAt=null;
    }
    console.log(body);
    Todos.findOneAndUpdate({_id:id,_creator:req.user._id},{$set:body},{new:true}).then((todo)=>{
        res.status(200).send(todo);
    }).catch((err)=>{
        res.status(404).send('Unable to Update');
    });
});

app.post('/users',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user=new User(body);
    
    user.save().then(()=>{
        //res.status(200).send(user);
        
        return user.generateAuthToken();
    }).then((token)=>{
        console.log(user);
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        console.log(e);
        res.status(400).send(e);
    })
});
app.post('/users/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    //var user =new User(body);
    var email=body.email;
    var password=body.password;
    User.findByCredentials(body).then((user)=>{
        //res.send(user);
       return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
    }).catch((e)=>{
        res.status(400).send();
    });
       

});
app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },(e)=>{
        console.log(e);
    res.status(400);
});
});
    





app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
    

});


app.listen(port,()=>{
    console.log(`listening on port ${port}`);

});
module.exports={app};


// var user=new User({
//     email:'satish.cards@yahoo.com  '
// });
// user.save().then((doc)=>{
//     console.log('User added:'+doc);
// },(err)=>{
//     console.log(err);
// });


// var newTodos= new Todos({
//     text:' satish   ',
//     completed:true,
//     completedAt: new Date().valueOf()
// });

// newTodos.save().then((doc)=>{
//     console.log("saved Todos:"+doc);
// },(error)=>{
//     console.log("unable to save Todos:"+error);
// });