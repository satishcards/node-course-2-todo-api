const {MongoClient,ObjectId}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("Unable to connect to mongodb"+err);
    }

    db.collection('Todos').find().count().then((count)=>{
            console.log(`Todos Count:${count}`);
    },(err)=>{
        console.log('unable to find Todos:'+err);
    });
    db.collection('Users').find({name:"Satish"}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,4));
    },(err)=>{
        console.log("unable to find Todos"+err);
    });
       
    // db.collection('Todos').find({
    //     _id: new ObjectId("59356bc535309a2c98c44804")}).toArray().then((docs)=>{
    //         console.log(JSON.stringify(docs,undefined,3));
    // },(err)=>{
    //     console.log('unable to find Todos:'+err);
    // });
   // console.log(result);
    db.close();
});