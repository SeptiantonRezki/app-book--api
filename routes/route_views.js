const express = require("express");
const router = express.Router();
const controlleViews = require("../controllers/controller_views");

router.route("/").get(controlleViews.home);
router.route("/home").get(controlleViews.home);
router.route("/item/form").get(controlleViews.itemForm);
router.route("/item/:id").get(controlleViews.itemDetail);
router.route("/login").get(controlleViews.loginPage);
router.route("/update").get(controlleViews.loginPage);
router.route("/video-sample-1").get(controlleViews.pageStream);

module.exports = router;
