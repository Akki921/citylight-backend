var express = require("express");
var router = express.Router();
var CustomerCollectionHandler=require("../controllers/CustomerCollection.Controller");



router.post("/createcollection",  async (req, res, next) => {
  let CustomerCollectionCreate = await CustomerCollectionHandler.createBrand(req.body);

  if (!CustomerCollectionCreate.status) return res.status(400).json(CustomerCollectionCreate);

  res.status(200).json(CustomerCollectionCreate);
});


router.get("/getallcollection", async (req, res, next) => {
  let CustomerCollectionCreate = await CustomerCollectionHandler.getAllBand();

  if (!CustomerCollectionCreate.status) return res.status(400).json(CustomerCollectionCreate);

  res.status(200).json(CustomerCollectionCreate);
});


module.exports = router;
