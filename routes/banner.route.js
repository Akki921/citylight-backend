const express=require("express");
const router=express.Router();
const BannerHandler=require("../controllers/Banner.Controller")



router.post("/addbanner",async(req,res)=>{
    const addbanner=await BannerHandler.createBanner(req.body);
    if(!addbanner) return res.status(400).json(addbanner);
    res.status(200).json(addbanner);
})

router.get("/getallbanner",async(req,res)=>{
    const getbanner= await BannerHandler.getAllBanner();
    if(!getbanner) return res.status(400).json(getbanner);
    res.status(200).json(getbanner);
})

module.exports=router;