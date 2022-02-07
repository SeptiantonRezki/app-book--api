const midtransClient = require("midtrans-client");
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// const SERVER_KEY = process.env.MIDTRANS_SERVER_API_KEY
// const AUTH_STRING = Base64(`${SERVER_KEY}:`)
// AUTH_STRING = "VlQtc2VydmVyLUNwbzAza1lET2MwY05VS2d0NmhuTGtLZzo="

const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_API_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_API_KEY,
});

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_API_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_API_KEY,
});

// const coreApi = new midtransClient.CoreApi({
//   isProduction: false,
//   serverKey: process.env.EXAMPLE_MIDTRANS_SERVER_API_KEY,
//   clientKey: process.env.EXAMPLE_MIDTRANS_CLIENT_API_KEY,
// });

// const snap = new midtransClient.Snap({
//   isProduction: false,
//   serverKey: process.env.EXAMPLE_MIDTRANS_SERVER_API_KEY,
//   clientKey: process.env.EXAMPLE_MIDTRANS_CLIENT_API_KEY,
// });

module.exports = {
  coreApi,
  snap,
};
