const ModelItem = require("../models/model_item");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.home = catchAsync(async (req, res, next) => {
  const itemModel = new ModelItem();
  const items = await itemModel.allItem();
  return res.render("pages/home", {
    title: "Home",
    items,
  });
});

exports.itemForm = async (req, res, next) => {
  return res.render("pages/item/item-form", {
    title: "form",
  });
};

exports.itemDetail = catchAsync(async (req, res, next) => {
  if (req.params.id == null || req.params.id == undefined) {
    return res.render("pages/404", { message: "item not found" });
  }
  const itemModel = new ModelItem();
  const item = await itemModel.oneItem({ id: req.params.id });
  return res.render("pages/item/item-detail", {
    title: "Item Detail",
    item: item[0],
  });
});

exports.loginPage = async (req, res, next) => {
  return res.render("pages/user/user-login", {
    title: "Login",
  });
};

exports.updatePage = async (req, res, next) => {
  return res.render("pages/user/user-update", {
    title: "Update Profile",
  });
};

exports.pageStream = async(req, res, next) => {
  return res.render("pages/stream/page-detail-stream", {
    title: "Detail Stream",
  });
}


