const express=require("express");
const router=express.Router();
const LoginHandler=require("../controllers/CustomerLogin.Controller")



router.post("/clogin",async(req,res)=>{
    console.log(req.body);
    const clogin=await LoginHandler.createLogin(req.body);
    if(!clogin) return res.status(400).json(clogin);
    res.status(200).json(clogin);
})

router.get("/getlogin",async(req,res)=>{
    const clogin= await LoginHandler.getAllLogin();
    if(!clogin) return res.status(400).json(clogin);
    res.status(200).json(clogin);
})

module.exports=router;