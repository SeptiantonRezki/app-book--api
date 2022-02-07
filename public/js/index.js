/* eslint-disable */
import "@babel/polyfill";
import { login, logout } from "./login";

const loginForm = document.getElementsByClassName("form--login")[0];

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(username, password);
  });
}
