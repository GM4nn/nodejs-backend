const jwt = require('jsonwebtoken');
const e = require('express');

const isValidHostName = (req, res,next) => {
    const validHosts = ['dina.ec','localhost','127.0.0.1' ]
    console.log("req.hostname ",req.hostname)
    if(validHosts.includes(req.hostname)){
        next();//llamar al siguiente flujo
    }
    else{
      res.status(403).send({status:'ACCESS_DENIED'})
    }
}

const isAuth = (req,res,next) =>{
    try {
        console.log('req.headers ',req.headers)
        const {token} = req.headers;
        if(token){
            const data = jwt.verify(token,process.env.JWT_SECRET)
            console.log("data " ,data);
            req.sessionData = { userId : data.userId,role:data.role};
            next();
        }
        else{
            throw {
                code:403,
                status:'ACCESS_DENIED',
                message:'Missing header token'
            };
           
        }
      
    } catch (error) {
            console.log(error)
           res.status(error.code || 500).send({ status:error.status || 'ERROR',message:error.message})  
    }

}

const isAdmin = (req,res,next) =>{
    try {
       const { role } = req.sessionData;
       if(role != 'admin'){
            throw{
                code:403,
                status:'ACCESS DENIED',
                message:'INVALID ROLE'
            }
       }
       next();
      
    } catch (error) {
            console.log(error)
           res.status(error.code || 500).send({ status:error.status || 'ERROR',message:error.message})  
    }

}

module.exports = { isValidHostName,isAuth,isAdmin}