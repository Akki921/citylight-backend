const express=require("express");
const router=express.Router();
const VoccationHandler=require("../controllers/Voccation.Controller")



router.post("/createAndUpadateVoccation",async(req,res)=>{
    const Voccation=await VoccationHandler.createVoccation(req.body);
    if(!Voccation) return res.status(400).json(Voccation);
    res.status(200).json(Voccation);
})

router.get("/getAllVoccation",async(req,res)=>{
    const Voccation= await VoccationHandler.getAllVoccation();
    if(!Voccation) return res.status(400).json(Voccation);
    res.status(200).json(Voccation);
})
router.get("/getVoccationbyProfile/:id",async(req,res)=>{
    console.log('req.params.id,',req.params.id);
    const Voccation= await VoccationHandler.getVoccationProfileID(req.params.id);
    if(!Voccation) return res.status(400).json(Voccation);
    res.status(200).json(Voccation);
})

module.exports=router;