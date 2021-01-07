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
            DeleteUserAtRisk(userId)
            alert("User deleted successfully")
            location.replace("admin_user.html")
        } else {
            alert("No Active User ");
        }
    });
}

//קריאה מהדאטאבייס
function DeleteUserAtRisk(userId) {
    userId.delete().then(function () {
        // User deleted.
        var ref = firebase.database().ref(
            "Users/".concat(userId, "/")
        );
        ref.remove();
    });

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
    <div>${userDetails.firstName} ${userDetails.lastName} שלום, נא להעתיק ולהדביק את ה-userId של השמתמש שאת/ה מעוניין/ת למחוק</div>
    `
}



