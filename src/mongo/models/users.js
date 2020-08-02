const mongoose = require('mongoose');
//const schema = mongoose.schema;
const {Schema} = mongoose;

const USerSchema = new Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    data:{
        type:{age:Number,isMale:Boolean}
    },
    role:{type:String, enum:['admin','seller'], default:'seller'}
})

const model = mongoose.model('User',USerSchema);

module.exports = model;