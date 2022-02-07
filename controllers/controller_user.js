const ModelUser = require("../models/model_user");
const jwt = require("jsonwebtoken");
const { readFileSync } = require("fs");
const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const user = new ModelUser();
  var allUser = await user.getAllUser();
  return res.status(200).json({
    status: "success",
    length: allUser.length,
    data: allUser,
  });
});

exports.postSignUp = catchAsync(async (req, res, next) => {
  const validation = ModelUser.validateRegister(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.message,
    });
  }

  const user = new ModelUser(req.body);
  var exisUser = await user.checkExistence();
  if (exisUser === undefined || exisUser.length === 0) {
    var newUser = await user.save();
    return res.status(201).json({
      status: "success",
      data: newUser,
    });
  } else {
    return next(
      new AppError(
        "user with username or email is exist, change username or email!",
        400
      )
    );
  }
});

exports.postLogin = catchAsync(async (req, res, next) => {
  const validation = ModelUser.validateLogin(req.body);
  if (validation.error) {
    return next(new AppError(validation.error.message, 400));
  }
  const user = new ModelUser(req.body);
  var result = await user.login();
  delete result["password"];
  const secret = readFileSync("./private.key");
  const token = jwt.sign(
    {
      id: result.id,
      username: result.username,
    },
    secret,
    {
      expiresIn: "24h",
    }
  );

  return res.status(200).json({
    status: "success",
    token,
  });
});
