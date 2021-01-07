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
            document.querySelector('#root').innerHTML += `
            <div><u><b><h3>משתמש מספר: ${i} </h3></b></u></div>
            <div><b>שם המשתמש:</b></div>
            <div>${data.val().firstName} ${data.val().lastName} </div>
            <div><b>כתובת:</b></div>
            <div>${data.val().adress} </div>
            <div><b>רחוב:</b></div>
            <div>${data.val().street} </div>
            <div><b>מספר בית:</b></div>
            <div>${data.val().houseNumber} </div>
            <div><b>מייל:</b></div>
            <div>${data.val().email} </div>
            <div><b>תעודת זהות:</b></div>
            <div>${data.val().id} </div>
            <div><b>תאריך לידה:</b></div>
            <div>${data.val().myBirthdayDate} </div>
            <div><b>טלפון:</b></div>
            <div>${data.val().tel} </div>
            <div><b>User Id:</b></div>
            <div>${data.val().userId} </div>
            <br />
            <br />
            <br />
            `
    });
}