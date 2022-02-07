const db = require("../config/db");

class ModelItem {
  allItem() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM tbl_item", [], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
  oneItem({ id }) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tbl_item WHERE id = ?",
        [id],
        (error, results, fields) => {
          if (error) {
            const errorSend = new Error(error);
            errorSend.statusCode = 404;
            return reject(errorSend);
          }
          return resolve(results);
        }
      );
    });
  }
}

module.exports = ModelItem;
