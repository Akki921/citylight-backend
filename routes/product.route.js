const express = require("express");
const router = express.Router();
const { createProduct,getproduct,updateproduct,updateproductqty} = require("../controllers/Product.Controller");

router.post(
  "/addproduct",
  createProduct
);

router.post("/editupdateProduct",
updateproduct);
router.post("/updateqty",
updateproductqty);
router.get("/getproduct", getproduct);

// router.get("/product/deleteproduct/:id", async (req, res) => {
//   const produtdelete = await deleteproduct(req.params.id);
//   res.send(produtdelete);
// });
// router.post(
//   "/create-product",
//   verify.verify,
//   upload.single("productPicture"),
//   async (req, res, next) => {
//     let productCreate = await productHandler.createProduct(req.body, req.file);

//     if (!productCreate.status) return res.status(400).json(productCreate);

//     res.status(200).json(productCreate);
//   }
// );

// router.get("/get-all-product", verify.verify, async (req, res, next) => {
//   let productData = await productHandler.getAllProduct();

//   if (!productData.status) return res.status(400).json(productData);

//   res.status(200).json(productData);
// });

// router.get("/:id", verify.verify, async (req, res) => {
//   let getProduct = await productHandler.getProduct(req.params.id);
//   res.send(getProduct);
// });

module.exports = router;
