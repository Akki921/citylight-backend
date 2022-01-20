var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
var subCategoryHandler = require("../controllers/Category.Controller");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads/subCategory"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });



  var upload = multer({ storage });
router.post("/subcategory",upload.fields([{name:'subCategoryImage'}]),async (req, res, next) => {
    let subCategoryCreate = await subCategoryHandler.createSubCategory(req.body);
  
    if (!subCategoryCreate.status) return res.status(400).json(subCategoryCreate);
  
    res.status(200).json(subCategoryCreate);
  }
);
router.post("/create",  async (req, res, next) => {
  let categoryCreate = await categoryHandler.createCategory(req.body);

  if (!categoryCreate.status) return res.status(400).json(categoryCreate);

  res.status(200).json(categoryCreate);
});


router.post("/updateStatus", async (req, res, next) => {
    let categoryCreate = await categoryHandler.updateStatus(req.body);
  
    // if (!categoryCreate.status) return res.status(400).json(categoryCreate);
  
    res.status(200).json(categoryCreate);
  });

module.exports = router;
