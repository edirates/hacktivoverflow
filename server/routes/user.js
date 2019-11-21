const router = require("express").Router();
const UserController = require("../controllers/user.js");
const authentication = require("../middlewares/authentication.js");
const googleVerify = require("../middlewares/googleVerify.js");

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.get('/', authentication, UserController.findOne)
router.post("/gsignin", googleVerify, UserController.gsignin);

module.exports = router;