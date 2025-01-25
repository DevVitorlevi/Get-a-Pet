const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/registrar", UserController.registrar);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUser);

module.exports = router;
