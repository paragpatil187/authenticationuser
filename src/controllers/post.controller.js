const express=require("express");
const Post = require("../models/post.model");
const authenticate= require("../middlewear/authenticate")


const router = express.Router();
router.post("/", async(req,res)=>{
    try{
        const post=await Post.create(req.body)
    
        
    
    return res.status(201).json({post});

    
    }catch(e) {
        return res.status(500).json({status:"failed", message:e.message});
    }

});
router.get("/",authenticate, async (req, res) => {
    const post = await Post.find().lean().exec();
  
    return res.send(post);
  });
  
  module.exports = router;
  /*
  router.post("/", authenticate, async(req,res)=>{
    try{
        const user=req.user;
    const post= await Post.create({
        title:req.body.title,
        body:req.body.body,
        user:user.user._id,
    });
    return res.status(201).json({post});
    }catch(e) {
        return res.status(500).json({status:"failed", message:e.message});
    }

});
router.get("/", async (req, res) => {
    const post = await Post.find().lean().exec();
  
    return res.send(post);
  });
  
  */ 