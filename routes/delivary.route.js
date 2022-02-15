const express=require("express");
const router=express.Router();
const DelivaryHandler=require("../controllers/Delivary.Controller")



router.post("/createDelivary",async(req,res)=>{
    const Delivary=await DelivaryHandler.createDelivary(req.body);
    if(!Delivary) return res.status(400).json(Delivary);
    res.status(200).json(Delivary);
})

router.get("/getalldelivary",async(req,res)=>{
    const Delivary= await DelivaryHandler.getAlldelivary();
    if(!Delivary) return res.status(400).json(Delivary);
    res.status(200).json(Delivary);
})
// router.post("/updatesubscription", async (req, res, next) => {
//     let subscriptionupdate = await subscriptionupdate.updateiscancle(req.body);
//     //console.log(req.body)
//     if (!subscriptionupdate.status) return res.status(400).json(subscriptionupdate);
  
//     res.status(200).json(stockUpdate);
//   });

//   router.post("/updateisselected", async (req, res, next) => {
//     let subscriptionupdate = await SubscriptionHandler.updateisSelcted(req.body);
//     if (!subscriptionupdate.status) return res.status(400).json(subscriptionupdate);
//     res.status(200).json(subscriptionupdate);
//   });

//   router.post("/updateAllSelcted", async (req, res, next) => {
//     let subscriptionupdate = await SubscriptionHandler.updateAllSelcted(req.body);
//     if (!subscriptionupdate.status) return res.status(400).json(subscriptionupdate);
//     res.status(200).json(subscriptionupdate);
//   });

//   router.get("/getsubscriptionbylogin/:id",async(req,res)=>{
//     console.log('req.params.id,',req.params.id);
//     const subscriptionupdate= await SubscriptionHandler.getSubscriptionbyloginid(req.params.id);
//     if(!subscriptionupdate) return res.status(400).json(subscriptionupdate);
//     res.status(200).json(subscriptionupdate);
//   })
//   router.post("/createSubscriptionAndUpdateonce",async(req,res)=>{
//     const addSubscription=await SubscriptionHandler.createupdateSubscriptiononce(req.body);
//     if(!addSubscription) return res.status(400).json(addSubscription);
//     res.status(200).json(addSubscription);
// })

module.exports=router;