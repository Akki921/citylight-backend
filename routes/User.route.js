var express = require("express");
var router = express.Router();
var userHandler = require("../controllers/User.Controller");
// const verification = require("../utils/jwt.handler");

router.post("/createuser",  async (req, res, next) => {
 
  let userCreate = await userHandler.createUser(req.body);

  // if (!userCreate.status) return res.status(400).json(userCreate);

  res.status(200).json(userCreate);
});

router.post("/login", async (req, res, next) => {
  let userLogin = await userHandler.loginUser(
    req.body.email,
    req.body.password
  )
  // if (!userLogin.status) return res.status(400).json(userLogin);
  res.status(200).json(userLogin);
});

router.get("/getdata",  async (req, res) => {
  const userData = await userHandler.getAllUser();
  res.send(userData);
});

router.patch("/delete-user/:id",  async (req, res) => {
  let userDelete = await userHandler.deleteUser(req.params.id);
  res.send(userDelete);
});

router.put("/user-list/:id",  async (req, res) => {
  let userUpdate = await userHandler.updateUser(req.params.id, req.body);
  res.send(userUpdate);
});
router.get("/:id", async (req, res) => {
  const userDatas = await userHandler.getSingleUser(req.params.id);
  res.send(userDatas);
});
module.exports = router;
