const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const nameSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    }
})
const Name = mongoose.model('Name',nameSchema);
module.exports= Name;

