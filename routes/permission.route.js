var express = require("express");
var router = express.Router();
var permissionHandler = require("../controllers/Permission.Controller");
const { route } = require("./role.router");


router.post("/create",  async (req, res, next) => {
    
  let permissionCreate = await permissionHandler.createPermission(req.body);

  // if (!permissionCreate.status) return res.status(400).json(permissionCreate);

  res.status(200).json(permissionCreate);
});

router.get("/getAll", async (req, res, next) => {
  let permissionData = await permissionHandler.getPermission();

  // if (!permissionData.status) return res.status(400).json(permissionData);

  res.status(200).json(permissionData);
});

router.get("/getAllpermissionrole",  async (req,res,next)=>{
  let permissionData = await permissionHandler.getPermissionRole();

  // if (!permissionData.status) return res.status(400).json(permissionData);

  res.status(200).json(permissionData);
});
router.post("/createpermissionrole",async(req,res,next)=>{
  let permissionroleCreate = await permissionHandler.applyingpermission(req.body);

  // if (!permissionroleCreate.status) return res.status(400).json(permissionroleCreate);

  res.status(200).json(permissionroleCreate);
});

router.post("/editpermissionrole",async(req,res,next)=>{
  let permissionroleCreate = await permissionHandler.updateuserpermission(req.body);

  // if (!permissionroleCreate.status) return res.status(400).json(permissionroleCreate);

  res.status(200).json(permissionCreate);
});

router.post("/deletepermission",async(req,res,next)=>{
  let permissionroleCreate = await permissionHandler.updatepermission(req.body.id);

  // if (!permissionroleCreate.status) return res.status(400).json(permissionroleCreate);

  res.status(200).json(permissionCreate);
});
module.exports = router;
