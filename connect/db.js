const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://Anikkket:JVBhX0gm6cfi10Mo@cluster0.8wes253.mongodb.net/test?retryWrites=true&w=majority").then(()=>
{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log("Connection couldnot be established");
})