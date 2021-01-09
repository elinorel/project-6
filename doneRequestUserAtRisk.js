var logUserId
var key
var morekey
var Userat

firebase.auth().onAuthStateChanged(function (loggedUser) {
    if (loggedUser) {
        logUserId = loggedUser.uid
        readUserDetails(logUserId)
        readAllUsers()
    } else {
        alert("No Active User ");
    }
});

//קריאת כל המשתמשים על ידי מאזינים
function readAllUsers() {
    document.querySelector('#root').innerHTML = ""

    var usersRef = firebase.database().ref(`/requestsOfUserAtRisk`)
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {
        var i = 0

        data.forEach(function (childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            key = childSnapshot.key
            i = i + 1
            if (childData.UserId === logUserId) {
                document.querySelector('#root').innerHTML += `
                <div><h3><b><u>בקשה מספר:${i}</u></b></h3></div>
                <div><b>Id:</b></div>
                <div>${key}</div>
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
            }
        });
    });
}


function Search() {
    Userat = document.getElementById('SearchByuser').value;
    InProcess()
}


function InProcess() {
    var usersRef = firebase.database().ref(`/requestsOfUserAtRisk`)

    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {

        data.forEach(function (childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            morekey = childSnapshot.key
            if (morekey === Userat) {
                var userId = childData.UserId
                var firstName = childData.firstName
                var lastName = childData.lastName
                var adress = childData.adress
                var street = childData.street
                var houseNumber = childData.houseNumber
                var appliances = childData.appliances
                var food = childData.food
                var money = childData.money
                var reasonForMoney = childData.reasonForMoney
                var socialAssistance = childData.socialAssistance

                var selectRequest = {
                    userId: userId,
                    firstName: firstName,
                    lastName: lastName,
                    adress: adress,
                    street: street,
                    houseNumber: houseNumber,
                    appliances: appliances,
                    food: food,
                    money: money,
                    reasonForMoney: reasonForMoney,
                    socialAssistance: socialAssistance
                }

                writeInProcessData(selectRequest)
            }
        });
    });
}

//כתיבה לדאטאבייס
function writeInProcessData(selectRequest) {
    var Request = database.ref('doneRequestOfUserAtRisk/' + logUserId).push()
    Request.set(selectRequest, (error) => {
        if (error) {
            alert("Something went wrong..." + error.errorMessage)
        } else {
            alert("Thank you very much for your update, the update was successfully registered")
            location.replace("User_at_risk.html")        
        }
    })
}

//קריאה מהדאטאבייס
function readUserDetails(userId) {
    firebase.database().ref('/userAtRisk/' + userId).once('value').then((snapshot) => {
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
    <div> ${userDetails.firstName} ${userDetails.lastName} שלום, נא להעתיק ולהדביק בתיבה את הID של הבקשה שאת/ה מעוניין/ת לעדכן שהתבצעה בהצלחה</div>
    `
}

