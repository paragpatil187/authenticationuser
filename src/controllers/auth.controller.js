require("dotenv").config();
const jwt = require("jsonwebtoken");
const User= require("../models/user.model");

const newToken = (user) =>{
    return jwt.sign ({ user: user}, process.env.JWT_ACCESS_KEY);
}

const register= async (req,res)=>{
try{
    //check if email is already exists
    let user=await User.findOne({email:req.body.email}).lean().exec()
// if exist then thriow error
if(user) return res.status(400).json({status:"failed",
message:"please provide a different email address"

});
//else create user, hash the password because plain password may harmful
user=await User.create(req.body);
//create token

const token = newToken(user);

// return user and token
 return res.status(201).json({user,token});

}
catch(e){
    return res.status(500).json({status:"failed", message:e.message});
}



}
const login=async(req,res)=>{
    try{
        //check if email is already exists
        let user=await User.findOne({email:req.body.email})
        if(!user) return res.status(400).json({status:"failed",
message:"please provide a different email address"

});
// if it does not exist then throw an error
const match = await user.checkPassword(req.body.password);
if(!match)
  return res.status(400).json({
    status:"failed",
    message:"Please provide correct email adress and password",
  });
  // if it matches create the token
  const token =newToken(user);
  //return user and token
  return res.status(201).json({user,token});


    }
    catch(e){
        return res.status(500).json({status:"failed", message:e.message});
    }




    
}








 


module.exports={register,login};