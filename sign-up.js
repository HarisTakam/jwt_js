// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBLxzI6sOD7dDqG1I4vrhrcjHx333mrX_M",
  authDomain: "athentificationjs.firebaseapp.com",
  databaseURL: "https://athentificationjs-default-rtdb.firebaseio.com",
  projectId: "athentificationjs",
  storageBucket: "athentificationjs.appspot.com",
  messagingSenderId: "234612526374",
  appId: "1:234612526374:web:8eec24d71e45e4d74585e7",
  measurementId: "G-SML5YPPPJS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const db = getDatabase();

//------------------------------------------------REFERENCES---------------------------------------------------//

const name = document.getElementById("NameInp"),
  email = document.getElementById("EmailInp"),
  userName = document.getElementById("UserInp"),
  password = document.getElementById("PassInp"),
  subBtn = document.getElementById("SubBtn");

//------------------------------------------------VALIDATION---------------------------------------------------//

function isEmptyOrpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

function Validation() {
  let nameRegex = /^[a-zA-Z]+$/;
  let emailRegex = /^[a-zA-Z0-9]+@(kmail)\.africa$/;
  let userRegx = /^[a-zA-Z0-9]{5,}$/;

  if (
    isEmptyOrpaces(name.value) ||
    isEmptyOrpaces(email.value) ||
    isEmptyOrpaces(userName.value)
  ) {
    alert("You cannot left any field empty");
    return false;
  }

  if (!nameRegex.test(name.value)) {
    alert("oups! the name should only contian alphabet!");
    return false;
  }
  if (!emailRegex.test(email.value)) {
    alert("oups! Enter  a valid email!");
    return false;
  }
  if (!userRegx.test(userName.value)) {
    alert(
      "oups! username can only  alphanumeric \n - username must be alest 5 characters \n - username cannot containe spaces"
    );
    return false;
  }

  return true;
}

//------------------------------------------------REGISTER USER TO FIREBASE---------------------------------------------------//

function RegisterUser() {
  if (!Validation()) {
    return;
  }
  const dbRef = ref(db);

  get(child(dbRef, "UserList/" + userName.value)).then((snapshot) => {
    if (snapshot.exists()) {
      alert("Account Already exist");
    } else {
      set(ref(db, "UserList/" + userName.value), {
        fullName: name.value,
        email: email.value,
        userName: userName.value,
        password: EncriptePassword(),
      })
        .then(() => {
          alert("User added successfully");
        })
        .catch("Oups error !", Error);
    }
  });
}

//------------------------------------------------ENCRIPTION---------------------------------------------------//
function EncriptePassword() {
  let EncriptePassword = CryptoJS.AES.encrypt(password.value, password.value);
  return EncriptePassword.toString();
}

//------------------------------------------------ASSIGN THE EVENTS---------------------------------------------------//

subBtn.addEventListener("click", RegisterUser);
