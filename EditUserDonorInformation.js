//בדיקה אם משתמש מחובר
firebase.auth().onAuthStateChanged(function (loggedUser) {
    if (loggedUser) {
        readUserDetails(loggedUser.uid)
    } else {
        alert("No Active User ");
    }
});

function sendToData() {
    firebase.auth().onAuthStateChanged(function (loggedUser) {
        if (loggedUser) {
            UpdateOfUserAtRiskInformation(loggedUser.uid)
            alert("Updating the new details is saved in the system")
            location.replace("donor_user.html")
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
    var id = document.getElementById("id").value
    var myBirthdayDate = document.getElementById("myBirthdayDate").value

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    if(firstName.trim().length !==0)
        updates['/userDonor/' + userId + '/firstName'] = firstName;
    if(lastName.trim().length !==0)
        updates['/userDonor/' + userId + '/lastName'] = lastName;
    if(email.trim().length !==0)
        updates['/userDonor/' + userId + '/email'] = email;
    if(tel.trim().length !==0)
        updates['/userDonor/' + userId + '/tel'] = tel;
    if(adress.trim().length !==0)
        updates['/userDonor/' + userId + '/adress'] = adress;
    if(id.trim().length !==0)
        updates['/userDonor/' + userId + '/id'] = id;
    if(myBirthdayDate.trim().length !==0)
        updates['/userDonor/' + userId + '/myBirthdayDate'] = myBirthdayDate;

    return firebase.database().ref().update(updates);

}


function readUserDetails(userId) {
    firebase.database().ref('/userDonor/' + userId).once('value').then((snapshot) => {
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
    document.querySelector('#root').innerHTML += `
    <div> ${userDetails.firstName} ${userDetails.lastName} שלום, נא מלא/י את השדות שאת/ה מעוניין/ת לשנות </div>
    `
}

