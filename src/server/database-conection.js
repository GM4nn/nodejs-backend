const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const connection = () => {
    console.log("MONGO", process.env.MONGO);
    mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{ 
        console.log("conected to mongodb")
    }).catch(err=>{
        console.log("ERROR IN MONGODB",err.message)
    });
}
  
module.exports = connection
  