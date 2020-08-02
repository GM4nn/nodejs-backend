const mongoose = require('mongoose');
//const schema = mongoose.schema;
const {Schema} = mongoose;

const productSchema = new Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    price:{type:Number,required:true},
    //images:{ type:[ {type:String, required:true} ], default:[]},
    userId: {type: mongoose.Schema.Types.ObjectId , ref:'User', required:true}
},{
    timestamps:true //capturar fecha de creacion del esquema y actualizacion del esquema
})

const model = mongoose.model('product',productSchema);

module.exports = model;