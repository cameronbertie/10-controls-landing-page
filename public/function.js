// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAcmJoLbgmqHAbb8ZftjEck1IUg-JPmRA0",
  authDomain: "controls-landing-page-42337.firebaseapp.com",
  projectId: "controls-landing-page-42337",
});


var db = firebase.firestore();
window.onload = function() {
  if(!localStorage.getItem('loaded')) {
    
      localStorage.setItem('loaded', "true");
      window.location.reload();
  }
}
window.addEventListener("load", (event) => {
  let formCard = document.getElementById("form-card");

  let formContent = document.getElementById("email-form");
  cookiesArray = document.cookie.split(";").map((cookie) => {
    return cookie;
  });
  let cookies = {};
  cookiesArray.forEach((cookie) => {
    let key = cookie.split("=")[0];
    let val = cookie.split("=")[1];
    cookies[key] = val;
  });
  let emailCookie = cookies.email;
  console.log(cookies);
  if (emailCookie) {
    let successMessage = document.getElementById("success-content");
    successMessage.style.display = "block";
    formCard.style.display = "block";
  } else {
    formContent.style.display = "flex";
    formCard.style.display = "block";
  }
});
const form = document.querySelector("#email-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let loadingIcon = document.getElementById("button-loading");
  let arrowIcon = document.getElementById("button-arrow");

  arrowIcon.style.display = "none";
  loadingIcon.style.display = "block";

  db.collection("emails")
    .add({
      email: form.email.value,
    })
    .then((docRef) => {
      let successMessage = document.getElementById("success-content");
      let formContent = document.getElementById("email-form");
      document.cookie = `email=${true}; expires=Sun, 1 Jan 2023 00:00:00 UTC`;
      console.log("Document written with ID: ", docRef.id);
      formContent.style.display = "none";
      successMessage.style.display = "block";
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});
