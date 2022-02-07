/* eslint-disable */
import axios from "axios";

module.exports.login = async (username, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        username,
        password,
      },
    });

    if (res.data.status === "success") {
      // showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    // showAlert("error", err.response.data.message);
  }
};

module.exports.logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if ((res.data.status = "success")) location.reload(true);
  } catch (err) {
    console.log(err.response);
    // showAlert("error", "Error logging out! Try again.");
  }
};
