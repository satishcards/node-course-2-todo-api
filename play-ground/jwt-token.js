const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');

var data={
    id:10
};
var token=jwt.sign(data,"satish");
var decodedtoken=jwt.verify(token,"satish");
console.log('DECODED',decodedtoken);