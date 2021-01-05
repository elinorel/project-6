function signOut(){
    auth.signOut();
    alert("sign Out");
    location.replace("HTMLPage1.html");
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
  firebase.database().ref('/adminUser/' + userId).once('value').then((snapshot) => {
      var firstName = snapshot.val().firstName
      var lastName = snapshot.val().lastName
      var tel = snapshot.val().tel
      var email = snapshot.val().email
      var id = snapshot.val().id
      var adress = snapshot.val().adress


      var userDetails = {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
          tel:tel,
          email:email,
          id: id,
          adress:adress
      }
      show(userDetails)

  });
}

function show(userDetails) {
  document.querySelector('#root').innerHTML += `
  <br />
  <div> <b>שם ושם משפחה: </b> ${userDetails.firstName} ${userDetails.lastName}</div>
  <br />
  <div> <b>מספר טלפון: </b> ${userDetails.tel}</div>
  <br />
  <div> <b>מייל: </b> ${userDetails.email}</div>
  <br />
  <div> <b>תעודת זהות: </b> ${userDetails.id}</div>
  <br />
  <div> <b>כתובת: </b> ${userDetails.adress}</div>
  `
}


