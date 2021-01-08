var logUserId
var key

firebase.auth().onAuthStateChanged(function (loggedUser) {
    if (loggedUser) {
        logUserId = loggedUser.uid
        allTheRequest1()
    } else {
        alert("No Active User ");
    }
});

// הדפסה של כל הבקשות שנמצאות בטיפול
function allTheRequestInProcess() {
    document.querySelector('#root').innerHTML = ""
    document.querySelector('#root').innerHTML += `
    <br/>
    <div><h3><b>את/ה נמצא/ת כרגע בכל הבקשות שנמצאות בטיפול:</h3></b></div>
    `
    inProcess()
}
//קריאת כל המשתמשים על ידי מאזינים
function inProcess() {
    var usersRef = firebase.database().ref(`/inProcess`)
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {

        data.forEach(function (childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            key = childSnapshot.key
            if (data.key === logUserId) {
                document.querySelector('#root').innerHTML += `
                <div><h3><b><u> הבקשה של: ${childData.firstName} ${childData.lastName} </u></b></h3></div>
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

// הדפסה של כל הבקשות שבוצעו
function allTheRequestDone() {
    document.querySelector('#root').innerHTML = ""
    document.querySelector('#root').innerHTML += `
    <br />
    <div><h3><b>את/ה נמצא/ת כרגע בכל הבקשות שבוצעו :</h3></b></div>
    `
    doneRequest()
}
//קריאת כל המשתמשים על ידי מאזינים
function doneRequest() {
    var usersRef = firebase.database().ref(`/doneRequest`)
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {

        data.forEach(function (childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            key = childSnapshot.key
            if (data.key === logUserId) {
                document.querySelector('#root').innerHTML += `
                <div><h3><b><u> הבקשה של: ${childData.firstName} ${childData.lastName} </u></b></h3></div>
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


function allTheRequest1() {
    document.querySelector('#root').innerHTML = ""
    document.querySelector('#root').innerHTML += `
    <br />
    <div><h3><b>את/ה נמצא/ת כרגע בכל הבקשות:</h3></b></div>
    `
    inProcess()
    doneRequest()
}
