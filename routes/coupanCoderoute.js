const express = require("express");
const router = express.Router();
const { getCoupan,newCoupancode} = require("../controllers/coupan.Controller");

router.get("/getCoupan", getCoupan);
router.post("/createnewCoupancode", newCoupancode)

module.exports = router;