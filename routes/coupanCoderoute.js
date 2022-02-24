const express = require("express");
const router = express.Router();
const { getCoupan,newCoupancode,updatecoupan} = require("../controllers/coupan.Controller");

router.get("/getCoupan", getCoupan);
router.post("/createnewCoupancode", newCoupancode)
router.post("/coupanCount", updatecoupan)
module.exports = router;