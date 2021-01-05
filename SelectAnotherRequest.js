firebase.auth().onAuthStateChanged(function (loggedUser) {
    if (loggedUser) {
        readAllUsers()
    } else {
        alert("No Active User ");
    }
});
//קריאת כל המשתמשים על ידי מאזינים
function readAllUsers() {
    var usersRef = firebase.database().ref(`/requestsOfUserAtRisk`)
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {
        var i = 0

        data.forEach(function (childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
       
            
            i = i + 1
            document.querySelector('#root').innerHTML += `
            <button onclick="sendToData()" id="sendToData"><u><b><h3>בקשה מספר: ${i} </h3></b></u></button>
            <div><b>שם המשתמש:</b></div>
            <div>${childData.firstName} ${childData.lastName} </div>
            <div><b>כתובת:</b></div>
            <div>${childData.adress} </div>
            <div><b>רחוב:</b></div>
            <div>${childData.street} </div>
            <div><b>מספר בית:</b></div>
            <div>${childData.houseNumber} </div>
            <div><b>מצרכים:</b></div>
            <div>${childData.appliances} </div>
            <div><b>מזון:</b></div>
            <div>${childData.food} </div>
            <div><b>סכום כסף:</b></div>
            <div>${childData.money} </div>
            <div><b>סיבת כסף:</b></div>
            <div>${childData.reasonForMoney} </div>
            <div><b>עזרה חברתית:</b></div>
            <div>${childData.socialAssistance} </div>
            <br />
            <br />
            <br />
            `
        });
    });
}

function sendToData() {
    firebase.auth().onAuthStateChanged(function (loggedUser) {
        if (loggedUser) {
            newOpinion(loggedUser.uid)
        } else {
            alert("No Active User ");
        }
    });}

function newOpinion(userId) {
    var usersRef = firebase.database().ref(`/requestsOfUserAtRisk`)
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {
        data.forEach(function (childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            
        });
    });
    //insert user details to DB
    writeOpinionData(newOpinion, userId)

    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
    });
}

// //כתיבה לדאטאבייס
// function writeOpinionData(opinionDonor, userId) {
//     var newOpinion = database.ref('opinionOfUserDonor/' + userId).push()
//     newOpinion.set(opinionDonor, (error) => {
//         if (error) {
//             alert("Something went wrong..." + error.errorMessage)
//         } else {
//             alert("Your opinion has been received in the system")
//             location.replace("donor_user.html")
//         }
//     })
// }