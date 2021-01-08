var logUserId
var key
var name1= findName()
var lname= findName()
var fname=findName1()
var llname=findName1()
var usid=findName1()
var ffname=findName2()
var lllname=findName2()
var uusid=findName2()

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
            findName(data.key)
            document.querySelector('#root').innerHTML += `
            <div><h3><b><u>הבקשה ש${name1} ${lname} לקח/ה על עצמו/ה</u></b></h3></div>
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
            findName(data.key)
            document.querySelector('#root').innerHTML += `
            <div><h3><b><u>הבקשה ש${name1} ${lname} לקח/ה על עצמו/ה</u></b></h3></div>
            <div><h3><b><u>הבקשה של:${childData.firstName} ${childData.lastName} </u></b></h3></div>
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


function allTheRequest1() {
    document.querySelector('#root').innerHTML = ""
    document.querySelector('#root').innerHTML += `
    <br />
    <div><h3><b>את/ה נמצא/ת כרגע בכל הבקשות:</h3></b></div>
    `
    inProcess()
    doneRequest()
}

function findName(usre11) {
    var usersRef = firebase.database().ref(`/userDonor`)
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {
        if(data.val().userId === usre11){
            name1=data.val().firstName
            lname=data.val().lastName
        }
    });
}
function se(){
    const Name = document.getElementById('SearchByName').value
    findName1(Name)

}

function Search(usid){
    document.querySelector('#root').innerHTML = ""
    var usersRef = firebase.database().ref(`/inProcess`)
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {
        data.forEach(function (childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            console.log(`sjdcnskdjc= ${data.key}`)
            console.log(`usid= ${usid}`)
            if(usid === data.key){
                console.log("נכנסססססס")
                document.querySelector('#root').innerHTML += `
                <div><h3><b><u>הבקשה ש${fname} ${llname} לקח/ה על עצמו/ה</u></b></h3></div>
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
        })
    })
}

function findName1(usre11) {
    var usersRef = firebase.database().ref(`/userDonor`)
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {
        // childData will be the actual contents of the child
        if(data.val().firstName === usre11){
            fname=data.val().firstName
            llname=data.val().lastName
            usid = data.val().userId
            Search(usid)
        }
    });
}

function se1(){
    const Name1 = document.getElementById('SearchByName1').value
    findName2(Name1)
}

function Search1(usid){
    document.querySelector('#root').innerHTML = ""
    var usersRef = firebase.database().ref(`/doneRequest`)
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {
        data.forEach(function (childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            console.log(`sjdcnskdjc= ${data.key}`)
            console.log(`usid= ${usid}`)
            if(usid === data.key){
                console.log("נכנסססססס")
                document.querySelector('#root').innerHTML += `
                <div><h3><b><u>הבקשה ש${ffname} ${lllname} לקח/ה על עצמו/ה</u></b></h3></div>
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
        })
    })
}

function findName2(usre11) {
    var usersRef = firebase.database().ref(`/userDonor`)
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {
        // childData will be the actual contents of the child
        if(data.val().firstName === usre11){
            ffname=data.val().firstName
            lllname=data.val().lastName
            uusid = data.val().userId
            Search1(uusid)
        }
    });
}