const express=require("express");
const router=express.Router();
const CityHandler=require("../controllers/City.Controller")



router.post("/addcity",async(req,res)=>{
    const addCity=await CityHandler.createCity(req.body);
    if(!addCity) return res.status(400).json(addCity);
    res.status(200).json(addCity);
})

router.get("/getallcity",async(req,res)=>{
    const getCity= await CityHandler.getAllCity();
    if(!getCity) return res.status(400).json(getCity);
    res.status(200).json(getCity);
})

module.exports=router;