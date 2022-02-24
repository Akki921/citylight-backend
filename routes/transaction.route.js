var express = require("express");
var router = express.Router();
var transactionHandler = require("../controllers/Transaction.Controller");



router.get("/getAllTransaction", async (req, res, next) => {
    let WalletGet = await transactionHandler.getAllTransaction();
  
    // if (!brandCreate.status) return res.status(400).json(brandCreate);
  
    res.status(200).json(WalletGet);
  });


  // router.get("/getAllTransactionbyid/:id", async (req, res, next) => {
  //   console.log('req.params.id,',req.params.id);
  //   let TransactionGet = await walletHandler.getAllTransactionbyid(req.params.id);
  
  //   // if (!brandCreate.status) return res.status(400).json(brandCreate);
  
  //   res.status(200).json(TransactionGet);
  // });


  
module.exports = router;
