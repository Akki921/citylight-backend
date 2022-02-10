var express = require("express");
var router = express.Router();
var CustomerCollectionHandler=require("../controllers/CustomerCollection.Controller");



router.post("/createcollection",  async (req, res, next) => {
  let CustomerCollectionCreate = await CustomerCollectionHandler.createCustomerCollection(req.body);

  if (!CustomerCollectionCreate.status) return res.status(400).json(CustomerCollectionCreate);

  res.status(200).json(CustomerCollectionCreate);
});

router.post("/query",  async (req, res, next) => {
  let CustomerCollectionCreate = await CustomerCollectionHandler.createCustomerCollectionquery(req.body);

  if (!CustomerCollectionCreate.status) return res.status(400).json(CustomerCollectionCreate);

  res.status(200).json(CustomerCollectionCreate);
});


router.get("/getallcollection", async (req, res, next) => {
  let CustomerCollectionCreate = await CustomerCollectionHandler.getAllCustomerCollection();

  if (!CustomerCollectionCreate.status) return res.status(400).json(CustomerCollectionCreate);

  res.status(200).json(CustomerCollectionCreate);
});


module.exports = router;
