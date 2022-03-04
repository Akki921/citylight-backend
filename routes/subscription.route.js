const express=require("express");
const router=express.Router();
const SubscriptionHandler=require("../controllers/Subscription.Controller")



router.post("/createSubscriptionAndUpdate",async(req,res)=>{
    const addSubscription=await SubscriptionHandler.createSubscription(req.body);
    if(!addSubscription) return res.status(400).json(addSubscription);
    res.status(200).json(addSubscription);
})

router.get("/getallSubscription",async(req,res)=>{
    const addSubscription= await SubscriptionHandler.getAllSubscription();
    if(!addSubscription) return res.status(400).json(addSubscription);
    res.status(200).json(addSubscription);
})
// router.post("/updatesubscription", async (req, res, next) => {
//     let subscriptionupdate = await subscriptionupdate.updateiscancle(req.body);
//     //console.log(req.body)
//     if (!subscriptionupdate.status) return res.status(400).json(subscriptionupdate);
  
//     res.status(200).json(stockUpdate);
//   });

  router.post("/updateisselected", async (req, res, next) => {
    let subscriptionupdate = await SubscriptionHandler.updateisSelcted(req.body);
    if (!subscriptionupdate.status) return res.status(400).json(subscriptionupdate);
    res.status(200).json(subscriptionupdate);
  });

  router.post("/updateAllSelcted", async (req, res, next) => {
    let subscriptionupdate = await SubscriptionHandler.updateAllSelcted(req.body);
    if (!subscriptionupdate.status) return res.status(400).json(subscriptionupdate);
    res.status(200).json(subscriptionupdate);
  });

  router.get("/getsubscriptionbylogin/:id",async(req,res)=>{
    console.log('req.params.id,',req.params.id);
    const subscriptionupdate= await SubscriptionHandler.getSubscriptionbyloginid(req.params.id);
    if(!subscriptionupdate) return res.status(400).json(subscriptionupdate);
    res.status(200).json(subscriptionupdate);
  })
  router.post("/createSubscriptionAndUpdateonce",async(req,res)=>{
    const addSubscription=await SubscriptionHandler.createupdateSubscriptiononce(req.body);
    if(!addSubscription) return res.status(400).json(addSubscription);
    res.status(200).json(addSubscription);
})

router.post("/updateAllfullfiled", async (req, res, next) => {
  let subscriptionupdate = await SubscriptionHandler.updateAllFullfilled(req.body);
  if (!subscriptionupdate.status) return res.status(400).json(subscriptionupdate);
  res.status(200).json(subscriptionupdate);
});

router.post("/updateAllAssignOrder", async (req, res, next) => {
  let subscriptionupdate = await SubscriptionHandler.updateAllAssignOrder(req.body);
  if (!subscriptionupdate.status) return res.status(400).json(subscriptionupdate);
  res.status(200).json(subscriptionupdate);
});
module.exports=router;