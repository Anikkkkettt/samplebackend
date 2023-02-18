const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/test").then(()=>
{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log("Connection couldnot be established");
})