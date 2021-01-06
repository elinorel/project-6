firebase.auth().onAuthStateChanged(function (loggedUser) {
    if (loggedUser) {
        readAllUsers()
    } else {
        alert("No Active User ");
    }
});

//קריאת כל המשתמשים על ידי מאזינים
function readAllUsers() {
    var usersRef = firebase.database().ref(`/moneyRequestOfDonorUser`)
    var i = 0
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {
       
            i = i + 1
            document.querySelector('#root').innerHTML += `
            <div><u><b><h3>חוות דעת מספר: ${i} </h3></b></u></div>
            <div><b>שם המשתמש:</b></div>
            <div>${data.val().firstName} ${data.val().lastName} </div>
            <div><b>אני מעוניין לקבל את ההודעה דרך:</b></div>
            <div>${data.val().sendingMassege} </div>
            <div><b>התרומה בוצעה?</b></div>
            <div>${data.val().contribution} </div>
            <div><b>אימייל:</b></div>
            <div>${data.val().email} </div>
            <div><b>מספר טלפון:</b></div>
            <div>${data.val().tel} </div>

            <br />
            <br />
            <br />
            `
    });
}