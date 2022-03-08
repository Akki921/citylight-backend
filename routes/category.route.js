var express = require("express");
var router = express.Router();
var categoryHandler = require("../controllers/Category.Controller");

router.post("/create", async (req, res, next) => {
  let categoryCreate = await categoryHandler.createCategory(req.body);
  console.log("categoryCreate", categoryCreate);
  if (!categoryCreate.status) return res.status(400).json(categoryCreate);

  res.status(200).json(categoryCreate);
});

router.post("/editupdateCategory", async (req, res, next) => {
  let categoryCreate = await categoryHandler.editupdatecategory(req.body);
  //console.log(req.body)

  if (!categoryCreate.status) return res.status(400).json(categoryCreate);

  res.status(200).json(categoryCreate);
});
router.get("/getcategories", async (req, res, next) => {
  let categoryCreate = await categoryHandler.getAllCategory();

  if (!categoryCreate.status) return res.status(400).json(categoryCreate);

  res.status(200).json(categoryCreate);
});

router.post("/updateStatus", async (req, res, next) => {
  let categoryCreate = await categoryHandler.updateStatus(req.body);

  // if (!categoryCreate.status) return res.status(400).json(categoryCreate);

  res.status(200).json(categoryCreate);
});

router.post("/addcount", async (req, res, next) => {
  let categoryCreate = await categoryHandler.addcount(req.body);
  res.status(200).json(categoryCreate);
});

router.post("/deletecategory", async (req, res, next) => {
  let categoryCreate = await categoryHandler.DeleteCategory(req.body);
  res.status(200).json(categoryCreate);
});
module.exports = router;
