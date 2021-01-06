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
            UpdateOfDonorUserDonation(loggedUser.uid)
            alert("Thank you for your contribution, the contribution has been successfully updated")
            location.replace("donor_user.html")
        } else {
            alert("No Active User ");
        }
    });
}

//קריאה מהדאטאבייס
function UpdateOfDonorUserDonation(userId) {
    var contribution = document.getElementById("contribution").value
  

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    if(contribution.trim().length !==0)
        updates['/moneyRequestOfDonorUser/' + userId + '/contribution'] = contribution;
  

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
    <div>${userDetails.firstName} ${userDetails.lastName} שלום, אנו מוקירים תודה על תרומתך</div>
    <div>במידה וביצעת את התרומה אנא עדכן זאת </div>
    `
}

