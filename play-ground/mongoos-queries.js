const {ObjectID}=require('mongodb');
const {mongoose}=require('./../server/db/mongoose');
const {Todos}=require('./../server/models/todos');
const {Users}=require('./../server/models/users');

// var id='5936dac06c84192718230450';

// Todos.find({_id:id}).then((todos)=>{
//     console.log('todos:',todos);
// });
// Todos.findOne({_id:id}).then((todos)=>{
//     console.log('todos:',todos);
// });
// Todos.findById(id).then((todo)=>{
//     console.log('todo:',todo);
// });
var id='593668d4234a542a846256a345';
Users.findById(id).then((user)=>{
    if(!user){
        return console.log("Id Not found");
    }
    console.log(user);
},(err)=>{
    console.log('error',err);
})