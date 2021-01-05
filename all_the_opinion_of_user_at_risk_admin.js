firebase.auth().onAuthStateChanged(function (loggedUser) {
    if (loggedUser) {
        readAllUsers()
    } else {
        alert("No Active User ");
    }
});
//קריאת כל המשתמשים על ידי מאזינים
function readAllUsers() {
    var usersRef = firebase.database().ref(`/opinionOfUserAtRisk`)
    //האזנה להוספה של משתמשים
    usersRef.on('child_added', (data) => {
        var i = 0

        data.forEach(function (childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
       
            
            i = i + 1
            document.querySelector('#root').innerHTML += `
            <div><u><b><h3>חוות דעת מספר: ${i} </h3></b></u></div>
            <div><b>שם המשתמש:</b></div>
            <div>${childData.firstName} ${childData.lastName} </div>
            <div><b>דירוג חווית המשתמש:</b></div>
            <div>${childData.userExperience} </div>
            <div><b>שביעות רצוני מהשירות:</b></div>
            <div>${childData.PurposeImplementation} </div>
            <div><b>במידה ואיני הייתי מרוצה מהשירות:</b></div>
            <div>${childData.NoGoalImplementation} </div>
            <div><b>שביעות רצוני מהאתר:</b></div>
            <div>${childData.Satisfaction} </div>
            <div><b>במידה ואיני מרוצה מהאתר:</b></div>
            <div>${childData.NotSatisfaction} </div>
            <br />
            <br />
            <br />
            `
        });
    });
}