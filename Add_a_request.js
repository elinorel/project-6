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
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var adress = document.getElementById("adress").value
    var street = document.getElementById("street").value
    var houseNumber = document.getElementById("houseNumber").value
    var food = document.getElementById("food").value
    var socialAssistance = document.getElementById("socialAssistance").value
    var appliances = document.getElementById("appliances").value
    var money = document.getElementById("money").value
    var reasonForMoney = document.getElementById("reasonForMoney").value

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
    writeRequestData(RequestData, userId)

    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
    });
}

//כתיבה לדאטאבייס
function writeRequestData(request, userId) {
    var newRequest = database.ref('requestsOfUserAtRisk/' + userId).push()
    newRequest.set(request, (error) => {
        if (error) {
            alert("Something went wrong..." + error.errorMessage)
        } else {
            alert("Your request has been added to the system")
            location.replace("User_at_risk.html")
        }
    })
}