const express=require("express");
const router=express.Router();
const CustomerProfileHandler=require("../controllers/CustomerProfile.Controller")



router.post("/createProfile",async(req,res)=>{
    const addProfile=await CustomerProfileHandler.createCustomerProfile(req.body);
    if(!addProfile) return res.status(400).json(addProfile);
    res.status(200).json(addProfile);
})

router.post("/createcProfile",async(req,res)=>{
    const addProfile=await CustomerProfileHandler.createcProfile(req.body);
    if(!addProfile) return res.status(400).json(addProfile);
    res.status(200).json(addProfile);
})

router.get("/getallProfile",async(req,res)=>{
    const addProfile= await CustomerProfileHandler.getProfiles();
    if(!addProfile) return res.status(400).json(addProfile);
    res.status(200).json(addProfile);
})
router.get("/getcustomerprofile/:id",async(req,res)=>{
    console.log('req.params.id,',req.params.id);
    const addProfile= await CustomerProfileHandler.getprofilebyloginid(req.params.id);
    if(!addProfile) return res.status(400).json(addProfile);
    res.status(200).json(addProfile);
})

router.post("/updatecoupancode",async(req,res)=>{
    const addProfile=await CustomerProfileHandler.updatecoupancode(req.body);
    if(!addProfile) return res.status(400).json(addProfile);
    res.status(200).json(addProfile);
})
module.exports=router;