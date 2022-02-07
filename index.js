const express = require("express");
const path = require("path");
const app = express();
const routeUser = require("./routes/route_user");
const routePayment = require("./routes/route_payment");
const routeViews = require("./routes/route_views");
const routeVideos = require("./routes/route_video");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');



const winston = require("winston");
// const { LoggingWinston } = require("@google-cloud/logging-winston");
// const loggingWinston = new LoggingWinston();
// const logger = winston.createLogger({
//   level: "info",
//   transports: [new winston.transports.Console(), loggingWinston],
// });

app.set("views", "views");
app.set("view engine", "ejs");

app.use(cors());

app.use(express.static("public"));
// GET FILE => http://localhost:8080/images/image-one.jpg

// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use("/api/v1/users", routeUser);
app.use("/api/v1/payments", routePayment);
app.use("/api/v1/videos", routeVideos);
app.use("/", routeViews);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

const PORT = process.env.PORT || 50011;

app.listen(PORT, () => {
  console.log(`app deployed at Port ${PORT}`);
});
