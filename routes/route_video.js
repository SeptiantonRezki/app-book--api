const express = require("express");
const router = express.Router();
const controllerVideo = require("../controllers/controller_video");

router.route("/sample-video").get(controllerVideo.getVideoStream);

module.exports = router;
