var express = require("express");
var router = express.Router();
var addressHandler = require("../controllers/AddressSlip.Controller");
const { route } = require("./role.router");


router.post("/createslip",  async (req, res, next) => {
  let addressHandlerCreate = await addressHandler.createAddressSlip(req.body);

  if (!addressHandlerCreate.status) return res.status(400).json(addressHandlerCreate);

  res.status(200).json(addressHandlerCreate);
});

router.post("/editupdateBrand",async(req,res,next)=>{
    let brandCreate = await brandHandler.editupdateBrand(req.body);

  if (!brandCreate.status) return res.status(400).json(brandCreate);

  res.status(200).json(brandCreate);

});
router.get("/getAllslip", async (req, res, next) => {
  let addressHandlerCreat = await addressHandler.getAllSlip();

  if (!addressHandlerCreat.status) return res.status(400).json(addressHandlerCreat);

  res.status(200).json(addressHandlerCreat);
});

router.get("/getbrandone/:id", async (req, res, next) => {
    let brandCreate = await brandHandler.getBrandByID(req.params.id);
  
    // if (!brandCreate.status) return res.status(400).json(brandCreate);
  
    res.status(200).json(brandCreate);
  });

module.exports = router;
