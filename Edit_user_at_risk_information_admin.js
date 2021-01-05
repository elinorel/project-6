//בדיקה אם משתמש מחובר
firebase.auth().onAuthStateChanged(function (loggedUser) {
    if (loggedUser) {
        readUserDetails(loggedUser.uid)
    } else {
        alert("No Active User ");
    }
});

firebase.auth().onAuthStateChanged(function (loggedUser) {
    if (loggedUser) {
        readAllUsers()
    } else {
        alert("No Active User ");
    }
});
//קריאת כל המשתמשים על ידי מאזינים
function readAllUsers() {
    var usersRef = firebase.database().ref(`/userAtRisk`)
    var i = 0
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {
            
            i = i + 1
            document.querySelector('#root1').innerHTML += `
            <div><u><b><h3>משתמש מספר: ${i} </h3></b></u></div>
            <div><b>שם המשתמש:</b></div>
            <div>${data.val().firstName} ${data.val().lastName} </div>
            <div><b>User Id:</b></div>
            <div>${data.val().userId} </div>
            <br />
            <br />
            <br />
            `
    });
}

function sendToData() {
    firebase.auth().onAuthStateChanged(function (loggedUser) {
        if (loggedUser) {
            var userId = document.getElementById("userId").value
            UpdateOfUserAtRiskInformation(userId)
            alert("Updating the new details is saved in the system")
            location.replace("admin_user.html")
        } else {
            alert("No Active User ");
        }
    });
}

//קריאה מהדאטאבייס
function UpdateOfUserAtRiskInformation(userId) {
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var email = document.getElementById("email").value
    var tel = document.getElementById("tel").value
    var adress = document.getElementById("adress").value
    var street = document.getElementById("street").value
    var houseNumber = document.getElementById("houseNumber").value
    var id = document.getElementById("id").value
    var myBirthdayDate = document.getElementById("myBirthdayDate").value

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    if(firstName.trim().length !==0)
        updates['/userAtRisk/' + userId + '/firstName'] = firstName;
    if(lastName.trim().length !==0)
        updates['/userAtRisk/' + userId + '/lastName'] = lastName;
    if(email.trim().length !==0)
        updates['/userAtRisk/' + userId + '/email'] = email;
    if(tel.trim().length !==0)
        updates['/userAtRisk/' + userId + '/tel'] = tel;
    if(adress.trim().length !==0)
        updates['/userAtRisk/' + userId + '/adress'] = adress;
    if(street.trim().length !==0)
        updates['/userAtRisk/' + userId + '/street'] = street;
    if(houseNumber.trim().length !==0)
        updates['/userAtRisk/' + userId + '/houseNumber'] = houseNumber;
    if(id.trim().length !==0)
        updates['/userAtRisk/' + userId + '/id'] = id;
    if(myBirthdayDate.trim().length !==0)
        updates['/userAtRisk/' + userId + '/myBirthdayDate'] = myBirthdayDate;

    return firebase.database().ref().update(updates);

}


function readUserDetails(userId) {
    firebase.database().ref('/adminUser/' + userId).once('value').then((snapshot) => {
        var firstName = snapshot.val().firstName
        var lastName = snapshot.val().lastName

        var userDetails = {
            userId: userId,
            firstName: firstName,
            lastName: lastName
        }
        show(userDetails)

    });
}

function show(userDetails) {
    document.querySelector('#root1').innerHTML += `
    <div>${userDetails.firstName} ${userDetails.lastName} שלום, נא להעתיק ולהדביק את ה-userId של השמתמש שאת/ה מעוניין/ת לערוך לו את הפרטים</div>
    `
    document.querySelector('#root').innerHTML += `
    <div>נא מלא/י את השדות שאת/ה מעוניין/ת לשנות </div>
    `
}

