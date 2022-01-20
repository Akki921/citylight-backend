var express = require("express");
var router = express.Router();
var settingHandler = require("../controllers/Setting.Controller");


router.post("/create",  async (req, res, next) => {
  let settingData = await settingHandler.createSetting(req.body);

  // if (!settingData.status) return res.status(400).json(settingData);

  res.status(200).json(settingData);
});

router.get("/getAll", async (req, res, next) => {
  let settingData = await settingHandler.getAllSetting();

  // if (!settingData.status) return res.status(400).json(settingData);

  res.status(200).json(settingData);
});

module.exports = router;
