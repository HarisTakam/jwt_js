//------------------------------------------------REFERENCES---------------------------------------------------//
let userlink = document.getElementById("userlink");
let singoutlink = document.getElementById("singoutlink");
let header = document.getElementById("header");
let CurrenteUser = null;

//------------------------------------------------FUNCTIONS---------------------------------------------------//

function GetUserName() {
  let KeepLoggedIn = localStorage.getItem("KeepLoggedIn");

  if (KeepLoggedIn == "Yessssss") {
    CurrenteUser = JSON.parse(localStorage.getItem("user"));
  } else {
    CurrenteUser = JSON.parse(sessionStorage.getItem("user"));
  }
}

function SignOut() {
  sessionStorage.removeItem("user");
  localStorage.removeItem("user");
  localStorage.removeItem("KeepLoggedIn");
  window.location = "index.html";
}

//------------------------------------------------WINDOWS LOADS---------------------------------------------------//
window.onload = function () {
  GetUserName();

  if (CurrenteUser == null) {
    userlink.innerText = "Create a new Account";
    userlink.classList.replace("nav-link", "btn");
    userlink.classList.add("btn-danger");
    userlink.href = "sign-up.html";

    singoutlink.innerText = "LOGIN";
    singoutlink.classList.replace("nav-link", "btn");
    singoutlink.classList.add("btn-success");
    singoutlink.href = "login.html";
  } else {
    userlink.innerText = CurrenteUser.userName;
    header.innerText = "Welcome " + CurrenteUser.userName;
    userlink.classList.replace("btn", "nav-link");
    userlink.classList.add("btn-danger");
    userlink.href = "#";

    singoutlink.innerText = "Sign Out";
    singoutlink.classList.replace("btn", "nav-link");
    singoutlink.classList.add("btn-sucess");
    singoutlink.href = "javascript:SignOut()";
  }
};
