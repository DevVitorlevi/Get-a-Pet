const router = require("express").Router();
const UserController = require("../controllers/UserController");

const verifyToken = require('../helpers/verify-token')
const {ImageUpload} = require('../helpers/image-upload')

router.post("/registrar", UserController.registrar);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUser);
router.patch('/edit/:id',verifyToken,ImageUpload.single("image"),UserController.editUser)
module.exports = router;
