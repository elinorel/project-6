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
      var volunteering = document.getElementById("volunteering").value
      var volunteerPlace = document.getElementById("volunteerPlace").value
      var volunteerTime = document.getElementById("volunteerTime").value
      var sumOfMoney = document.getElementById("sumOfMoney").value
      var exactAmountOfMoney = document.getElementById("exactAmountOfMoney").value
      var sendingMassege = document.getElementById("sendingMassege").value
      var contribution = document.getElementById("contribution").value
  
  
      var newUser = {
        userId: userId,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        tel: tel,
        adress: adress,
        id: id,
        myBirthdayDate: myBirthdayDate
      }
  
      var RequestData = {
        UserId : userId,
        firstName: firstName,
        lastName: lastName,
        volunteering : volunteering,
        volunteerPlace: volunteerPlace,
        volunteerTime: volunteerTime,
        sumOfMoney: sumOfMoney,
        exactAmountOfMoney: exactAmountOfMoney
      }

      var moneyRequest ={
        firstName: firstName,
        lastName: lastName,
        email: email,
        tel: tel,
        sendingMassege:sendingMassege,
        contribution: contribution

      }
  
      //insert user details to DB
      writeUserData(newUser, userId)
      writeRequestData(RequestData, userId)
      writeMoneyRequestData(moneyRequest, userId)
    })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });
  }
  
  //כתיבה לדאטאבייס
  function writeUserData(user, userId) {
    database.ref('userDonor/' + userId).set(user, (error) => {
      if (error) {
        alert("Something went wrong..." + error.errorMessage)
      } else {
        alert("Sign up complete!")
      }
    })
  }
  
  //כתיבה לדאטאבייס
  function writeRequestData(request, userId) {
    database.ref('requestsOfUserDonor/' + userId).set(request, (error) => {
      if (error) {
        alert("Something went wrong..." + error.errorMessage)
      } else {
        alert("Sign up complete!")
        location.replace("donor_user.html")

      }
    })
  }
  
  function writeMoneyRequestData(moneyRequest, userId) {
    database.ref('moneyRequestOfDonorUser/' + userId).set(moneyRequest, (error) => {
      if (error) {
        alert("Something went wrong..." + error.errorMessage)
      } else {
        alert("Sign up complete!")
        location.replace("donor_user.html")

      }
    })
  }

  //בדיקה אם משתמש מחובר
  firebase.auth().onAuthStateChanged(function (loggedUser) {
    if (loggedUser) {
      readUserDetails(loggedUser.uid)
  
    } else {
      alert("No Active User ");
    }
  });
  
  //קריאה מהדאטאבייס
  function readUserDetails(userId) {
    firebase.database().ref('/userDonor/' + userId).on('value').then((snapshot) => {
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
  