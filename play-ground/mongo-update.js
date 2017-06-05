const {MongoClient,ObjectId}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("Unable to connect to mongodb"+err);
    }
    
    
    // db.collection('Users').findOneAndUpdate(
    //     {_id: new ObjectId('59356d5e42ca6728384f2a5d')},
    //     {$set:{age:30}},
    //     {returnOriginal:false})
    // .then((res)=>{
    //     console.log(res);
    // })
    db.collection('Todos').findOneAndUpdate({text:'To do Lunch'},{$set:{completed:true}},{returnOriginal:false}).then((res)=>{
        console.log(res);
    });
   
    db.close();
});