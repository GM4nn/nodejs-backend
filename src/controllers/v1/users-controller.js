const bcrypt = require('bcrypt');
const users = require('../../mongo/models/users');
const products = require('../../mongo/models/products');
const jwt = require('jsonwebtoken')
const expiresIn = 60*10;

const login = async (req, res) =>{
  try {
    const {email,password } = req.body;
    const user = await users.findOne({email})
    if(user){
      const itsOk = await bcrypt.compare(password,user.password) //COMPARAR LA PASSWORD CON EL HASH DEL PASSWORD
      if(itsOk){
        const token = jwt.sign({userId:user._id,role:user.role}, process.env.JWT_SECRET,{expiresIn}) // genera la json web token y expirara en 10 minutos
        res.send({status:'ok',data:{token,expiresIn}})
      }
      else{
        res.status(403).send({status:"INVALID PASSWORD",message:""})
      }
    }
    else{
      res.status(401).send({status:"USER NOT FOUND",message:"Usuario no existente"})
    }
  } catch (error) {
    res.status(500).send({status:"e",message:error.message})
  }
}

const createUser = async (req, res) => {
  try{
    const {username,email,password,data} = req.body;
    const hash = await bcrypt.hash(req.body.password, 15); //encriptar la contraseña
    await users.create({
      username, //username:username
      email,
      password:hash, //hash de la contraseña
      data,
    })
    res.send({ status: 'ok', message: 'user Created' });
  }
  catch(error){
    if(error.code === 11000 ){
      res.status(400).send({ status: 'DUPLICATED_VALUES', message:error.keyValue});
      return;
    }
    res.status(500).send({ status: 'ERROR', message: error.message});
  }
};

const deleteUser = async (req, res) =>  {
  try {

    const {userId} = req.body;

    if(!userId){
      throw new Error('Missing param userID');
    }
    
    await users.findByIdAndDelete(userId);

    await products.deleteMany({userId})

    res.send({ status: 'ok', message: 'user deleted' });
  } catch (error) {
    res.status(403).send({status:'ERROR',message:error.message});
  }
  
};

const getUsers = async (req, res) => {
  try {
    const usersAll =  await users.find().select({password:0,role:0,__v: 0}); // 1 = incluir y 0 = exluir , de esta manera excluye los campos que no quiere retornar
    res.send({ status: 'ok', data: usersAll });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
  
};

const updateUser = async (req, res) => {
  try {
    const {username,email,data} = req.body;
    await users.findByIdAndUpdate(req.sessionData.userId,{
      username,
      email,
      data
    })
    res.send({ status: 'ok', message: 'user updated' });
    
  } catch (error) {
    if(error.code === 11000 ){
      res.status(400).send({ status: 'DUPLICATED_VALUES', message:error.keyValue});
      return;
    }
    res.status(500).send({ status: 'ERROR', message: error.message});
  }
};

module.exports = { createUser, deleteUser, getUsers, updateUser,login };
