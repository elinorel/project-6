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
    var usersRef = firebase.database().ref(`/inProcess`)
    var i = 0
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {

        data.forEach(function (childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            key = childSnapshot.key
            i = i + 1
            document.querySelector('#root').innerHTML += `
            <div><u><b><h3>בקשה מספר: ${i} </h3></b></u></div>
            <div><b>Id:</b></div>
            <div>${key}</div>
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


function Search() {
    Userat = document.getElementById('SearchByuser').value;
    InProcess()
}


function InProcess() {
    var usersRef = firebase.database().ref(`/inProcess`)

    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {

        data.forEach(function (childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            morekey = childSnapshot.key
            if (morekey === Userat) {
                var userId = childData.userId
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
    var Request = database.ref('doneRequest/' + logUserId).push()
    Request.set(selectRequest, (error) => {
        if (error) {
            alert("Something went wrong..." + error.errorMessage)
        } else {
            sendToData()
        }
    })
}

function sendToData() {
    var userId = document.getElementById("SearchByuser").value
    DeleteRequetAtRisk(userId)
    alert("Thank you for your contribution, your selection has been registered in the system")
    location.replace("donor_user.html")
}

//קריאה מהדאטאבייס
function DeleteRequetAtRisk(userId) {
    var updates = {}
    updates['/inProcess/' + logUserId + '/' + userId] = null

    return firebase.database().ref().update(updates)
}


//קריאה מהדאטאבייס
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
    document.querySelector('#root1').innerHTML += `
    <div> ${userDetails.firstName} ${userDetails.lastName} שלום, על מנת לבצע את הבקשה שלקחת על עצמך תצטרך להעתיק את הID של אותה בקשה שאתה רוצה לקחת ולהדביקה בסוף הדף </div>
    `
}

