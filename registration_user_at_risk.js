
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
    var street = document.getElementById("street").value
    var houseNumber = document.getElementById("houseNumber").value
    var id = document.getElementById("id").value
    var myBirthdayDate = document.getElementById("myBirthdayDate").value
    var food = document.getElementById("food").value
    var socialAssistance = document.getElementById("socialAssistance").value
    var appliances = document.getElementById("appliances").value
    var money = document.getElementById("money").value
    var reasonForMoney = document.getElementById("reasonForMoney").value

    var newUser = {
      userId: userId,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      tel: tel,
      adress: adress,
      houseNumber:houseNumber,
      street:street,
      id: id,
      myBirthdayDate: myBirthdayDate,
    }

    var RequestData = {
      UserId : userId,
      firstName: firstName,
      lastName: lastName,
      adress: adress,
      street:street,
      houseNumber:houseNumber,
      food : food,
      socialAssistance: socialAssistance,
      appliances: appliances,
      money: money,
      reasonForMoney: reasonForMoney
    }

    //insert user details to DB
    writeUserData(newUser, userId)
    writeRequestData(RequestData, userId)
    writeRequestData2(RequestData, userId)
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
  var newRequest = database.ref('requestsOfUserAtRisk/' + userId).push()
  newRequest.set(request, (error) => {
    if (error) {
      alert("Something went wrong..." + error.errorMessage)
    } else {
      alert("Sign up complete!")
      location.replace("User_at_risk.html")
    }
  })

}

//כתיבה לדאטאבייס
function writeRequestData2(request, userId) {
  var newRequest = database.ref('requests/' + userId).push()
  newRequest.set(request, (error) => {
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

    alert(`Active User: ${firstName} ${lastName}, email:${email}`);


  });
}
