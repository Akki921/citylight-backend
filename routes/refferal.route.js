const express= require("express");
const PermissionController = require("../controllers/Permission.Controller");
const router= express.Router();
const refferalHandler=require("../controllers/Refferal.Controller");


router.post("/refferal",async(req,res,next)=>{
const refferalCreate= await refferalHandler.createRefferal(req.body);
if(!refferalCreate.status) return res.status(400).json(refferalCreate);
res.status(200).json(refferalCreate);
});

router.get("/getrefferal",async(req,res)=>{
    const refferal =await refferalHandler.getRefferal();
    if(!refferal.status) return res.status(400).json(refferal);
    res.status(200).json(refferal);
});

module.exports=router;