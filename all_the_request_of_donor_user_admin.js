firebase.auth().onAuthStateChanged(function (loggedUser) {
    if (loggedUser) {
        readAllUsers()
    } else {
        alert("No Active User ");
    }
});
//קריאת כל המשתמשים על ידי מאזינים
function readAllUsers() {
    var usersRef = firebase.database().ref(`/requestsOfUserDonor`)
    var i = 0
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {
            
            i = i + 1
            document.querySelector('#root').innerHTML += `
            <div><u><b><h3>בקשה מספר: ${i} </h3></b></u></div>
            <div><b>שם המשתמש:</b></div>
            <div>${data.val().firstName} ${data.val().lastName} </div>
            <div><b>באיזה תחום רצה להתנדב:</b></div>
            <div>${data.val().volunteering} </div>
            <div><b>איפה רצו להתנדב:</b></div>
            <div>${data.val().volunteerPlace} </div>
            <div><b>מתי היה להם נוח :</b></div>
            <div>${data.val().volunteerTime} </div>
            <div><b>סכום הכסף שאני מעוניין לתרום:</b></div>
            <div>${data.val().sumOfMoney} </div>
            <div><b>סכום הכסף שאני מעוניין לתרום במדויק :</b></div>
            <div>${data.val().exactAmountOfMoney} </div>
            <br />
            <br />
            <br />
            `
    });
}