var express = require("express");
var router = express.Router();
var cashbackHandler = require("../controllers/Cashback.Controller");


router.post("/createCashbackWallet",  async (req, res, next) => {
 
  let cashbackCreate = await cashbackHandler.createCashbackWallet(req.body);

   if (!cashbackCreate.status) return res.status(400).json(cashbackCreate);

  res.status(200).json(cashbackCreate);
});
router.get("/getAllCashbackWallet", async (req, res, next) => {
    let cashbackCreate = await cashbackHandler.getAllCashbackWallet();
  
     if (!cashbackCreate.status) return res.status(400).json(cashbackCreate);
  
    res.status(200).json(cashbackCreate);
  });


router.post("/makeTransaction",  async (req, res, next) => {
 
    let transactionMake = await walletHandler.makeTransaction(req.body);
  
     if (!transactionMake.status) return res.status(400).json(transactionMake);
  
    res.status(200).json(transactionMake);
  });


  router.get("/getAllTransactionbyid/:id", async (req, res, next) => {
    console.log('req.params.id,',req.params.id);
    let TransactionGet = await walletHandler.getAllTransactionbyid(req.params.id);
  
     if (!TransactionGet.status) return res.status(400).json(TransactionGet);
  
    res.status(200).json(TransactionGet);
  });


//   router.get("/getCashbackWallet/:id", async (req, res, next) => {
//     let WalletData = await walletHandler.getWalletDataById(req.params.id);
  
//     // if (!brandCreate.status) return res.status(400).json(brandCreate);
  
//     res.status(200).json(WalletData);
//   });

router.post("/makeorderfullfilled",  async (req, res, next) => {
 
  let transactionMake = await walletHandler.makefullfilledorder(req.body);

  // if (!userCreate.status) return res.status(400).json(userCreate);

  res.status(200).json(transactionMake);
});

module.exports = router;
