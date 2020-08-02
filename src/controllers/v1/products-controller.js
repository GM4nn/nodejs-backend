const products = require('../../mongo/models/products');
const users = require('../../mongo/models/users');

const createProduct = async (req, res) => {
    const {title,desc,price,images,userId } = req.body;
    try{
        const user = await users.findOne({_id:userId})
        if(!user){
            throw new Error('El usuario ligado al producto no existe')
        }
        const prod = await products.create({
            title,
            desc,
            price,
            images,
            userId
        });
        res.send({status:'ok',data:prod})
    }catch(err){
        console.log("create product error ",err);
        res.status(500).send({status:'ERROR',data:err.message});
    }

};

const deleteProduct = async (req, res) => {
    try {
        const { _id } = req.body;
        const productDeleted = await products.findByIdAndDelete({_id})
        if(!_id){
            throw new Error('Missing Param ID')
        }
        else if(!productDeleted){
            throw new Error('This product not exists')
        }
        res.send({stauts:'ok',message:'Product Deleted'})
    } catch (error) {
        console.log("el error ",error)
        res.status(500).send({status:'ERROR',message:error.message})
    }
};

const updateProduct = async (req,res) =>{
    try {
        const {_id,title,desc,price,images,userId} = req.body;
        const userP = await users.findById({_id:userId});
        const productP = await products.findById({_id});
        if(!userP){
            throw new Error('User not found')
        }
        else if(userId != req.sessionData.userId){
            throw new Error('Action not permitied for this user')
        }
        
        else if(!productP){
            throw new Error('Product not found')
        }
        await products.findByIdAndUpdate(_id,{
            title,
            desc,
            price,
            images,
            userId
        })
        res.send({status:'ok',message:'Product updated'})
    } catch (error) {
        res.status(500).send({status:'ERROR',message:error.message})
    }
}

const getProducts = async (req, res)  => {

    try {
        const Products =await  products.find({price:{$gt:18} }).select('title desc price images').populate('userId','username email data role');
        console.log("ok ",Products);
        res.send({status:'ok',data:Products});
    } catch (error) {
        console.log("create product error ",error);
        res.status(500).send({status:'ERROR',data:error.message});
    }
    

};

const getProductsByUser = async (req, res)  => {

    try {
        const ProductsByUser = await products.find({
            userId:req.params.userId
        })
        res.send({status:'ok',data:ProductsByUser});
    } catch (error) {
       
        res.status(500).send({status:'ERROR',data:error.message});
    }
    

};

module.exports = { createProduct, deleteProduct, getProducts,getProductsByUser,updateProduct };
