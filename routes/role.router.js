var express = require("express");
var router = express.Router();
var roleHandler = require("../controllers/Role.Controller");


router.post("/create",  async (req, res, next) => {
  

  let roleCreate = await roleHandler.createRole(req.body);

  if (!roleCreate.status) return res.status(400).json(roleCreate);

  res.status(200).json(roleCreate);
});

router.get("/getrole", async (req, res, next) => {
  let rolesData = await roleHandler.getRole();

  if (!rolesData.status) return res.status(400).json(rolesData);

  res.status(200).json(rolesData);
});

router.delete("/roledelete/:id", async (req, res, next) => {
    let rolesData = await roleHandler.deleteRole(req.params.id);
  
    if (!rolesData.status) return res.status(400).json(rolesData);
  
    res.status(200).json(rolesData);
  });

module.exports = router;
