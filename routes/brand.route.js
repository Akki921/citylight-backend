var express = require("express");
var router = express.Router();
var brandHandler = require("../controllers/Brand.Controller");
const { route } = require("./role.router");

router.post("/create", async (req, res, next) => {
  let brandCreate = await brandHandler.createBrand(req.body);

  if (!brandCreate.status) return res.status(400).json(brandCreate);

  res.status(200).json(brandCreate);
});

router.post("/editupdateBrand", async (req, res, next) => {
  let brandCreate = await brandHandler.editupdateBrand(req.body);
  if (!brandCreate.status) return res.status(400).json(brandCreate);

  res.status(200).json(brandCreate);
});
router.get("/getAll", async (req, res, next) => {
  let brandCreate = await brandHandler.getAllBand();

  if (!brandCreate.status) return res.status(400).json(brandCreate);

  res.status(200).json(brandCreate);
});

router.get("/getbrandone/:id", async (req, res, next) => {
  let brandCreate = await brandHandler.getBrandByID(req.params.id);

  // if (!brandCreate.status) return res.status(400).json(brandCreate);

  res.status(200).json(brandCreate);
});

router.post("/deleteupdateBrand", async (req, res, next) => {
  let brandCreate = await brandHandler.DeleteBrand(req.body);
  if (!brandCreate.status) return res.status(400).json(brandCreate);
  res.status(200).json(brandCreate);
});

module.exports = router;
