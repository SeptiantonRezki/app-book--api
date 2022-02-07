const express = require("express");
const router = express.Router();
const controllerPayment = require("../controllers/controller_payment");

router.route("/check-out").get(controllerPayment.checkOutSnap);
router.route("/status").get(controllerPayment.statusPayment);

module.exports = router;
