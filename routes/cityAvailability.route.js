const express=require("express");
const router=express.Router();
const CityAvaibilityHandler=require("../controllers/CityAvailability.Controller")



router.post("/addavaibilitycity",async(req,res)=>{
    const addCity=await CityAvaibilityHandler.createCityAvailability(req.body);
    if(!addCity) return res.status(400).json(addCity);
    res.status(200).json(addCity);
})

router.get("/getallavaibilitycity",async(req,res)=>{
    const getCity= await CityAvaibilityHandler.getAllCityAvailabilitycustomer();
    if(!getCity) return res.status(400).json(getCity);
    res.status(200).json(getCity);
})
router.get("/getallavaibilitycityadmin",async(req,res)=>{
    const getCity= await CityAvaibilityHandler.getAllCityAvailabilityadmin();
    if(!getCity) return res.status(400).json(getCity);
    res.status(200).json(getCity);
})
module.exports=router;