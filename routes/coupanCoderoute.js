const express = require("express");
const router = express.Router();
const { getCoupan,newCoupancode,updatecoupan,stopcoupan} = require("../controllers/coupan.Controller");

router.get("/getCoupan", getCoupan);
router.post("/createnewCoupancode", newCoupancode)
router.post("/coupanCount", updatecoupan)
router.post("/stopcoupan",stopcoupan)
module.exports = router;