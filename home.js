  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBrxicjLKFXCIy0WP0QJHme-SubV0wZv8k",
    authDomain: "weall-37ba9.firebaseapp.com",
    databaseURL: "https://weall-37ba9.firebaseio.com",
    projectId: "weall-37ba9",
    storageBucket: "weall-37ba9.appspot.com",
    messagingSenderId: "1096537884940",
    appId: "1:1096537884940:web:00954907af450ede61e129"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message)); 

    alert("Sign Up");

  }

  function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message)); 

    alert("Sign In" + email);

  }

  function signOut(){
    auth.signOut();
    alert("signed");

  }
