var express = require("express");
var router = express.Router();
var moduleHandler=require("../controllers/Module.Controller");


router.post("/createmodule",  async (req, res, next) => {
  let moduleCreate = await moduleHandler.createModule(req.body);

  if (!moduleCreate.status) return res.status(400).json(moduleCreate);

  res.status(200).json(moduleCreate);
});


router.get("/getmodules",  async (req, res, next) => {
    
  let getModules = await moduleHandler.getModule();

  if (!getModules.status) return res.status(400).json(getModules);

  res.status(200).json(getModules);
});



module.exports = router;
