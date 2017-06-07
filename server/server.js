var express=require('express');
var bodyParser=require('body-parser');

const {ObjectID}=require('mongodb');
var {mongoose}=require('./db/mongoose');
var {User}=require('./models/users');
var {Todos}=require('./models/todos');
var app=express();
app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
    var todo=new Todos({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        console.log(doc);
        res.status(200).send(doc);
    },(err)=>{
        console.log(err);
        res.status(400).send(err);
    });
});
app.get('/todos',(req,res)=>{
    //var satish='<h1><center>SMARTCHIP</center></h1>'
    Todos.find().then((todos)=>{
      //  res.send(satish);
       res.send({todos});
    },(err)=>{
        res.send(err);
    });

});
app.get('/todos/:id',(req,res)=>{

    var id=req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todos.findById(id).then((todo)=>{
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
app.listen(3000,()=>{
    console.log("listening on port 3000");

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