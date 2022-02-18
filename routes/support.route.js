const express=require("express");
const router=express.Router();
const StockHandler=require("../controllers/Support.Controller")



router.post("/addsupport",async(req,res)=>{
    const addStock=await StockHandler.createSupport(req.body);
    if(!addStock) return res.status(400).json(addStock);
    res.status(200).json(addStock);
})

router.get("/getallsupport",async(req,res)=>{
    const getStock= await StockHandler.getAllSupport();
    if(!getStock) return res.status(400).json(getStock);
    res.status(200).json(getStock);
})
// router.post("/updateStock", async (req, res, next) => {
//     let stockUpdate = await StockHandler.updateStock(req.body);
//     //console.log(req.body)
  
//     if (!stockUpdate.status) return res.status(400).json(stockUpdate);
  
//     res.status(200).json(stockUpdate);
//   });
router.get("/getsupport/:id",async(req,res)=>{
    console.log(req.params.id)
    const getStock= await StockHandler.getSupportProfileid(req.params.id);
    if(!getStock) return res.status(400).json(getStock);
    res.status(200).json(getStock);
})
module.exports=router;