const express=require("express");
const router=express.Router();
const StockHandler=require("../controllers/Stock.Controller")



router.post("/addstock",async(req,res)=>{
    const addStock=await StockHandler.createStock(req.body);
    if(!addStock) return res.status(400).json(addStock);
    res.status(200).json(addStock);
})

router.get("/getallstock",async(req,res)=>{
    const getStock= await StockHandler.getAllStock();
    if(!getStock) return res.status(400).json(getStock);
    res.status(200).json(getStock);
})
router.post("/updateStock", async (req, res, next) => {
    let stockUpdate = await StockHandler.updateStock(req.body);
    //console.log(req.body)
  
    if (!stockUpdate.status) return res.status(400).json(stockUpdate);
  
    res.status(200).json(stockUpdate);
  });

module.exports=router;