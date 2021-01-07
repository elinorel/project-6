function signUp() {
  var email = document.getElementById("email");
  var password = document.getElementById("Password1");

  registerNewUser(email.value, password.value)
}

function registerNewUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password).then((loggedUser) => {
    // Signed in with email and password, now insert details to DB
    var userId = loggedUser.user.uid
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var tel = document.getElementById("tel").value
    var adress = document.getElementById("adress").value
    var id = document.getElementById("id").value
    var myBirthdayDate = document.getElementById("myBirthdayDate").value
    var food = document.getElementById("food").value
    var socialAssistance = document.getElementById("socialAssistance").value
    var appliances = document.getElementById("appliances").value
    var money = document.getElementById("money").value
    var reasonForMoney = document.getElementById("reasonForMoney").value

    var newUser = {
      userId: userId,
      email: email,
      firstName: firstName,
      lastName: lastName,
      tel: tel,
      adress: adress,
      id: id,
      myBirthdayDate: myBirthdayDate,
    }

    var RequestData = {
      UserId : userId,
      food : food,
      socialAssistance: socialAssistance,
      appliances: appliances,
      money: money,
      reasonForMoney: reasonForMoney
    }

    //insert user details to DB
    writeUserData(newUser, userId)
    writeRequestData(RequestData, userId)
  })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
    });
}

//כתיבה לדאטאבייס
function writeUserData(user, userId) {
  database.ref('userAtRisk/' + userId).set(user, (error) => {
    if (error) {
      alert("Something went wrong..." + error.errorMessage)
    } else {
      alert("Sign up complete!")
    }
  })

}

//כתיבה לדאטאבייס
function writeRequestData(request, userId) {
  database.ref('requestsOfUserAtRisk/' + userId).set(request, (error) => {
    if (error) {
      alert("Something went wrong..." + error.errorMessage)
    } else {
      alert("Sign up complete!")
      location.replace("User_at_risk.html")
    }
  })

}


//בדיקה אם משתמש מחובר
firebase.auth().onAuthStateChanged(function (loggedUser) {
  if (loggedUser) {
    readUserDetails(loggedUser.uid)
    readUserDetailsOfRequest(loggedUser.uid)
  } else {
    alert("No Active User ");
  }
});

//קריאה מהדאטאבייס
function readUserDetails(userId) {
  firebase.database().ref('/userAtRisk/' + userId).on('value').then((snapshot) => {
    var firstName = snapshot.val().firstName
    var lastName = snapshot.val().lastName
    var email = snapshot.val().email
    var tel = snapshot.val().tel
    var adress = snapshot.val().adress
    var id = snapshot.val().id
    var myBirthdayDate = snapshot.val().myBirthdayDate

    // ...

    //String formatting: use ` ` (נמצא משמאל לספרה 1 במקלדת)
    alert(`Active User: ${firstName} ${lastName}, email:${email}`);


  });

  function readUserDetailsOfRequest(userId) {
    firebase.database().ref('/requestsOfUserAtRisk/' + userId).on('value').then((snapshot) => {
      var food = snapshot.val().food
      var socialAssistance = snapshot.val().socialAssistance
      var appliances = snapshot.val().appliances
      var money = snapshot.val().money
      var reasonForMoney = snapshot.val().reasonForMoney

    });
  }
}
