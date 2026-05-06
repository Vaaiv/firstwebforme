const userModel=require('../models/user.model');

async function register(req,res){
    const {username,email,password}=req.body;

    const user=await userModel.create({
        username,email,password
    });

    


}

module.exports={register};