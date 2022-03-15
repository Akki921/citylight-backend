var express = require("express");
var router = express.Router();
var cashbackHandler = require("../controllers/Cashback.Controller");

router.post("/createCashbackWallet", async (req, res, next) => {
  let cashbackCreate = await cashbackHandler.createCashbackWallet(req.body);

  if (!cashbackCreate.status) return res.status(400).json(cashbackCreate);

  res.status(200).json(cashbackCreate);
});
router.get("/getAllCashbackWallet", async (req, res, next) => {
  let cashbackCreate = await cashbackHandler.getAllCashbackWallet();

  if (!cashbackCreate.status) return res.status(400).json(cashbackCreate);

  res.status(200).json(cashbackCreate);
});

router.post("/CashbackTransaction", async (req, res, next) => {
  let transactionMake = await cashbackHandler.makeTransaction(req.body);
  if (!transactionMake.status) return res.status(400).json(transactionMake);
  res.status(200).json(transactionMake);
});

router.get("/getAllCashbackTransactionbyid/:id", async (req, res, next) => {
  console.log("req.params.id,", req.params.id);
  let TransactionGet = await cashbackHandler.getAllTransactionbyid(
    req.params.id
  );

  if (!TransactionGet.status) return res.status(400).json(TransactionGet);

  res.status(200).json(TransactionGet);
});

router.get("/getCashbackWallet/:id", async (req, res, next) => {
  let TransactionGet = await cashbackHandler.getAllCashbackWalletDataById(
    req.params.id
  );

  if (!TransactionGet.status) return res.status(400).json(TransactionGet);

  res.status(200).json(TransactionGet);
});

router.post("/makefullfilledCashbackpayment", async (req, res, next) => {
  let transactionMake = await cashbackHandler.makefullfilledCashbackpayment(req.body);
  res.status(200).json(transactionMake);
});

module.exports = router;
