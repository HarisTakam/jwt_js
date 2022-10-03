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

const userName = document.getElementById("UserInp"),
  password = document.getElementById("PassInp"),
  subBtn = document.getElementById("SubBtn");

  //------------------------------------------------AUTHENTICATE PROCESS---------------------------------------------------//

  function AuthenticateUser(){
    const dbRef = ref(db);

    get(child(dbRef, "UserList/" + userName.value)).then((snapshot) => {
      if (snapshot.exists()) {
        let dbpass = DecriptePassword(snapshot.val().password);

        if(dbpass == password.value){
            login(snapshot.val());
        }else{
            alert("User does not exist")
        }
      } else {
        alert("Username and password is invalid")
      }
    });
  }


  //------------------------------------------------DECRIPTION---------------------------------------------------//
function DecriptePassword(dbpass) {
  let DecriptePassword = CryptoJS.AES.decrypt(dbpass, password.value);
  return DecriptePassword.toString(CryptoJS.enc.Utf8);
}

  //------------------------------------------------LOGIN---------------------------------------------------//
function login(user){
    let KeepLoggedIn = document.getElementById("customSwitch1").checked;

    if(!KeepLoggedIn){
        sessionStorage.setItem("user", JSON.stringify( user));
        window.location = "index.html"
    }else{
        localStorage.setItem("KeepLoggedIn", "Yessssss");
        localStorage.setItem("user", JSON.stringify(user));
        window.location="index.html";
    }
}

//------------------------------------------------ASSIGN THE EVENTS---------------------------------------------------//

subBtn.addEventListener("click", AuthenticateUser);