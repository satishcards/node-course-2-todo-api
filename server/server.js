var express=require('express');
var bodyParser=require('body-parser');


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
app.listen(3000,()=>{
    console.log("listening on port 3000");

});


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