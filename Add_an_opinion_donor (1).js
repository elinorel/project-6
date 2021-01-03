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
            newOpinion(loggedUser.uid)
        } else {
            alert("No Active User ");
        }
    });}


function newOpinion(userId) {
    var userExperience = document.getElementById("userExperience").value
    var PurposeImplementation = document.getElementById("PurposeImplementation").value
    var NoGoalImplementation = document.getElementById("NoGoalImplementation").value
    var Satisfaction = document.getElementById("Satisfaction").value
    var NotSatisfaction = document.getElementById("NotSatisfaction").value

    var newOpinion = {
        userId: userId,
        userExperience: userExperience,
        PurposeImplementation: PurposeImplementation,
        NoGoalImplementation: NoGoalImplementation,
        Satisfaction: Satisfaction,
        NotSatisfaction: NotSatisfaction
    }

    //insert user details to DB
    writeOpinionData(newOpinion, userId)

    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
    });
}

//כתיבה לדאטאבייס
function writeOpinionData(opinionDonor, userId) {
    var newOpinion = database.ref('opinionOfUserDonor/' + userId).push()
    newOpinion.set(opinionDonor, (error) => {
        if (error) {
            alert("Something went wrong..." + error.errorMessage)
        } else {
            alert("Your opinion has been received in the system")
            location.replace("donor_user.html")
        }
    })
}


//קריאה מהדאטאבייס
function readUserDetails(userId) {
    firebase.database().ref('/userDonor/' + userId).once('value').then((snapshot) => {
        console.log(`firstName= ${snapshot.val().firstName}`)
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
    <div> ${userDetails.firstName} ${userDetails.lastName} שלום, דעתך חשובה לנו, בבקשה הבע/י את דעתך </div>
    `
}


