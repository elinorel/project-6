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
            newReques(loggedUser.uid)
        } else {
            alert("No Active User ");
        }
    });}


function newReques(userId) {
    var food = document.getElementById("food").value
    var socialAssistance = document.getElementById("socialAssistance").value
    var appliances = document.getElementById("appliances").value
    var money = document.getElementById("money").value
    var reasonForMoney = document.getElementById("reasonForMoney").value

    var RequestData = {
        UserId : userId,
        food : food,
        socialAssistance: socialAssistance,
        appliances: appliances,
        money: money,
        reasonForMoney: reasonForMoney
      }

    //insert user details to DB
    writeRequestData(RequestData, userId)

    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
    });
}

//כתיבה לדאטאבייס
function writeRequestData(request, userId) {
    database.ref('requestsOfUserAtRisk/' + userId).set(request, (error) => {
        if (error) {
            alert("Something went wrong..." + error.errorMessage)
        } else {
            alert("Your request has been added to the system")
            location.replace("User_at_risk.html")
        }
    })
}