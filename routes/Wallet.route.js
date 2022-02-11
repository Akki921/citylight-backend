var express = require("express");
var router = express.Router();
var walletHandler = require("../controllers/Wallet.Controller");


router.post("/createWallet",  async (req, res, next) => {
 
  let walletCreate = await walletHandler.createWallet(req.body);

  // if (!userCreate.status) return res.status(400).json(userCreate);

  res.status(200).json(walletCreate);
});
router.get("/getAllWallet", async (req, res, next) => {
    let WalletGet = await walletHandler.getAllWallet();
  
    // if (!brandCreate.status) return res.status(400).json(brandCreate);
  
    res.status(200).json(WalletGet);
  });


router.post("/makeTransaction",  async (req, res, next) => {
 
    let transactionMake = await walletHandler.makeTransaction(req.body);
  
    // if (!userCreate.status) return res.status(400).json(userCreate);
  
    res.status(200).json(transactionMake);
  });


  router.get("/getAllTransactionbyid/:id", async (req, res, next) => {
    console.log('req.params.id,',req.params.id);
    let TransactionGet = await walletHandler.getAllTransactionbyid(req.params.id);
  
    // if (!brandCreate.status) return res.status(400).json(brandCreate);
  
    res.status(200).json(TransactionGet);
  });


  router.get("/getWallet/:id", async (req, res, next) => {
    let WalletData = await walletHandler.getWalletDataById(req.params.id);
  
    // if (!brandCreate.status) return res.status(400).json(brandCreate);
  
    res.status(200).json(WalletData);
  });
//   router.post("/createWallet",  async (req, res, next) => {
 
//     let walletCreate = await walletHandler.createWallet(req.body);
  
//     // if (!userCreate.status) return res.status(400).json(userCreate);
  
//     res.status(200).json(walletCreate);
//   });

router.post("/makeorderfullfilled",  async (req, res, next) => {
 
  let transactionMake = await walletHandler.makefullfilledorder(req.body);

  // if (!userCreate.status) return res.status(400).json(userCreate);

  res.status(200).json(transactionMake);
});

module.exports = router;
