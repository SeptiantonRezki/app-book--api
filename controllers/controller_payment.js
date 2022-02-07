const { snap, coreApi } = require("./../config/midtrans");
const ModelItem = require("../models/model_item");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.checkOutSnap = catchAsync(async (req, res, next) => {
  let amount = req.query.amount;
  let total = req.query.total;
  let idItem = req.query.id;
  if (
    amount == undefined ||
    amount == null ||
    total == undefined ||
    total == null ||
    idItem == undefined ||
    idItem == null
  ) {
    return next(new AppError("you must enter a valid item", 400));
  }
  const itemModel = new ModelItem();
  const item = await itemModel.oneItem({ id: idItem });
  if (item == null || item == undefined) {
    return next(new AppError("item is not found", 400));
  }
  if (amount * total !== item[0].harga * total) {
    return next(new AppError("you must enter a valid value", 400));
  }

  let parameter = {
    transaction_details: {
      order_id: "order-id-node-" + Math.round(new Date().getTime() / 1000),
      gross_amount: amount,
    },
    credit_card: {
      secure: true,
    },
  };
  var resultCreateTransaction = await snap.createTransaction(parameter);
  res.render("pages/payment/checkout", {
    token: resultCreateTransaction.token,
    clientKey: snap.apiConfig.clientKey,
    title: "Check Out",
  });
});

exports.statusPayment = catchAsync(async (req, res, next) => {
  res.render("status_payment");
});
