const express = require("express");
const router = express.Router();
const controllerUser = require("../controllers/controller_user");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.route("/").get(controllerUser.getAllUser);

router.route("/signup").post(urlencodedParser, controllerUser.postSignUp);
router.route("/login").post(urlencodedParser, controllerUser.postLogin);

module.exports = router;
