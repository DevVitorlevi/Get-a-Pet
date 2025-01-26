const router = require("express").Router();
const UserController = require("../controllers/UserController");

const verifyToken = require('../helpers/verify-token')

router.post("/registrar", UserController.registrar);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUser);
router.patch('/edit/:id',verifyToken,UserController.editUser)
module.exports = router;
