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
            <div><u><b><h3>בקשה מספר: ${i} </h3></b></u></div>
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
