const {MongoClient,ObjectId}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("Unable to connect to mongodb"+err);
    }
    //delete many
    // db.collection('Todos').deleteMany({text:'To do Lunch'}).then((res)=>{
    //     console.log(res);
    // });
    
    //delete one
    // db.collection('Todos').deleteOne({text:'To do Lunch'}).then((res)=>{
    //     console.log(res.result);
    // });  

    // db.collection('Todos').findOneAndDelete({completed:false}).then((res)=>{
    //     console.log(res);
    // });  
    // db.collection("Users").deleteMany({name:'K.V.Satish Kumar'}).then((res)=>{
    //     console.log(res.result);
    // });
    db.collection('Users').findOneAndDelete({_id: new ObjectId('59358703c21cb6347cecd932')}).then((res)=>{
        console.log(res);

    });
    
   
    db.close();
});