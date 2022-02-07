const db = require("../config/db");
const { hashSync, compareSync } = require("bcryptjs");
const { userValidator, logSchema } = require("../validator");

class ModelUser {
  constructor(userData) {
    this.userData = { ...userData };
  }
  getAllUser() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user", [], (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

  checkExistence() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user WHERE username = ? OR email = ?",
        [this.userData["username"], this.userData["email"]],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  getUser({ id }) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user WHERE id = ?",
        [id],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  static validateRegister(userData) {
    return userValidator.validate(userData);
  }

  static validateLogin(userData) {
    return logSchema.validate(userData);
  }

  // register
  save() {
    return new Promise((resolve, reject) => {
      const hashedPass = hashSync(this.userData["password"], 12);
      this.userData["password"] = hashedPass;
      db.query(
        "INSERT INTO user (id, name, password, username, email) VALUES (NULL, ?, ?, ?, ?);",
        [
          this.userData["name"],
          this.userData["password"],
          this.userData["username"],
          this.userData["email"],
        ],
        async (error, results, fields) => {
          if (error) reject(error);
          var user = await this.getUser({
            id: results.insertId,
          });
          resolve(user);
        }
      );
    });
  }
  // login
  login() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user WHERE username = ?",
        [this.userData["username"]],
        (error, results, fields) => {
          if (error) return reject(error);
          var userResult = results[0];
          if (userResult == undefined || userResult == null || !compareSync(this.userData["password"], userResult.password)) {
            const errorSend = new Error(
              "Please enter valid username and password"
            );
            errorSend.statusCode = 404;
            reject(errorSend);
          }
          return resolve(userResult);
        }
      );
    });
  }
}

module.exports = ModelUser;
