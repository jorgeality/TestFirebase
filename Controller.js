var database = firebase.firestore();
const settings = { timestampsInSnapshots: true };
database.settings(settings);
var IdDoc = '';



function registrar() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function ingresar() {
    var emailLogin = document.getElementById('emailLogin').value;
    var passwordlogin = document.getElementById('passwordLogin').value;
    console.log(emailLogin + '' + passwordlogin);
    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordlogin).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
    verificarLogin();
}

function verificarLogin() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log('existe usuario activo');
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
            verificarUsuarioActivo(email);
            window.onload = loadpage();
            ReadData();
        } else {
            // User is signed out.
            var contenido = document.getElementById('contenido');
            contenido.innerHTML = '';
            window.location.href = 'login.html';
            // ...
        }
    });
}

function verificarUsuarioActivo(content) {
    var contenido = document.getElementById('contenido');
    contenido.innerHTML = '<a onclick="logout()">logOut</a>';
}
function logout() {
    firebase.auth().signOut().then(function () {
        window.location.href = 'login.html';
        console.log('succesfull');
        var tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
    }).catch(function (error) {
        console.log(error);
    })
}

function saveRecord() {

    database.collection("people").add({
        LastName: document.getElementById('recordLastName').value,
        Age: document.getElementById('recordAge').value,
        Id: document.getElementById('recordId').value,
        Name: document.getElementById('recordName').value
    }).then(function (docRef) {
        console.log("Documen written with ID: ", docRef.id);
        document.getElementById('recordLastName').value = '';
        document.getElementById('recordAge').value = '';
        document.getElementById('recordId').value = '';
        document.getElementById('recordName').value = '';
        ReadData();
    }).catch(function (error) {
        console.log(error);
    });

}


function ReadData() {
    database.collection("people").get().then((querySnapshot) => {
        var tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        querySnapshot.forEach((doc) => {
            tbody.innerHTML +=
                `<tr>` +
                `<td><a onclick="getRecordToUpdate('` + doc.id + `');"><i class="fas fa-highlighter"></i></a> / <a onclick="getRecordToDelete('` + doc.id + `');"><i class="far fa-trash-alt"></i></a></td>` +
                `<td>` + doc.data().Id + `</td>` +
                `<td>` + doc.data().LastName + `</td>` +
                `<td>` + doc.data().Name + `</td>` +
                `<td>` + doc.data().Age + `</td>` +
                `</tr>`;
        });
    });
}

function getRecordToUpdate(docId) {
    IdDoc = docId;
    database.collection("people").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.id == docId) {
                document.getElementById('recordLastNameUpdate').value = doc.data().LastName;
                document.getElementById('recordAgeUpdate').value = doc.data().Age;
                document.getElementById('recordIdUpdate').value = doc.data().Id;
                document.getElementById('recordNameUpdate').value = doc.data().Name;
            }
        });
    });
}
function getRecordToDelete(docId) {

    if(confirm("are you sure to delete this record?")){
        database.collection("people").doc(docId).delete().then(function() {
            console.log("Document successfully deleted!");
            ReadData();
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

}
function updateRecord() {
    console.log('id : ',IdDoc);
    database.collection("people").doc(IdDoc).update({
        "LastName" : document.getElementById('recordLastNameUpdate').value,
        "Age" : document.getElementById('recordAgeUpdate').value,
        "Id" : document.getElementById('recordIdUpdate').value,
        "Name": document.getElementById('recordNameUpdate').value
    })
    .then(function() {
        console.log("Document successfully updated!");
        ReadData();
    });
    IdDoc = '';
}


verificarLogin();
