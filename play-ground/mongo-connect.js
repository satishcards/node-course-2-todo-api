//const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectId}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{

    if(err){
        return console.log("Unable to connect Mongo Db");
    }
    console.log("Connected to MongoDb server");
    // db.collection('Todos').insertOne({
    //     text:'Something todo',
    //     completed:false

    // },(err,result)=>{
    //     if(err){
    //         console.log("unable to insert Todo"+err);
    //     }
    //     else{
    //         console.log(JSON.stringify(result.ops,undefined,2));
    //     }

    // });
    db.collection('Users').insertOne({
            name:'K.V.Satish Kumar',
            age:40,
            location:"Malkajgiri"
    },(err,result)=>{
        if(err){
            console.log("unable to insert Users"+err);
        }
        else{
            console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
        }
    });
    db.close();
});