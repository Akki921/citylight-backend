var express = require("express");
var router = express.Router();
var userRoleHandler = require("../controllers/UserRole.Controller");

router.post("/assignrole",  async (req, res) => {
  const userData = await userRoleHandler.assignRole(req.body);
  if (!userData.status) return res.status(400).json(userData);

  res.status(200).json(userData);
});



router.get("/getuserrole",  async (req, res) => {
  const userData = await userRoleHandler.getUserRole();
  if (!userData.status) return res.status(400).json(userData);
  res.status(200).json(userData);
});

router.post("/edituserrole",  async (req, res) => {
  const userData = await userRoleHandler.editUserRole(req.body);
  if (!userData.status) return res.status(400).json(userData);
  res.status(200).json(userData);
});
router.delete("/deleteuserrole/:id", async (req, res, next) => {
  let userRoleData = await userRoleHandler.deleteUserRole(req.params.id);

  if (!userRoleData.status) return res.status(400).json(rolesData);

  res.status(200).json(userRoleData);
});




module.exports = router;
