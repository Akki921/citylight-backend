var express = require("express");
var router = express.Router();
var orderHandler = require("../controllers/Order.Controller");

router.post("/createOrderandUpdate", async (req, res, next) => {
  let orderCreate = await orderHandler.createOrder(req.body);
  console.log("categoryCreate", orderCreate);
  if (!orderCreate.status) return res.status(400).json(orderCreate);

  res.status(200).json(orderCreate);
});

// router.post("/updateeditorder", async (req, res, next) => {
//   let orderCreate = await orderHandler.updateEditOrder(req.body);
//   console.log(req.body)

//   if (!orderCreate.status) return res.status(400).json(orderCreate);

//   res.status(200).json(orderCreate);
// });
router.get("/getAllOrder", async (req, res, next) => {
  let orderCreate = await orderHandler.getAllOrder();

  if (!orderCreate.status) return res.status(400).json(orderCreate);

  res.status(200).json(orderCreate);
});
router.get("/getorderbylogin/:id",async(req,res)=>{
  console.log('req.params.id,',req.params.id);
  const orderCreate= await orderHandler.getOrderbyloginid(req.params.id);
  if(!orderCreate) return res.status(400).json(orderCreate);
  res.status(200).json(orderCreate);
})

router.post("/updateStatus", async (req, res, next) => {
  console.log(req.body);
  
  let orderCreate = await orderHandler.updateStatus(req.body);

   if (!orderCreate.status) return res.status(400).json(orderCreate);

  res.status(200).json(orderCreate);
});

module.exports = router;
