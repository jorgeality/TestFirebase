var databas = firebase.firestore();
const setting = { timestampsInSnapshots: true };
databas.settings(setting);
//var sections =['Login','Register'];
//next('Login');
verificarInLogin();
function verificarInLogin() {
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

            window.onload = loadpage();

            console.log('hola');
            verificarUsuarioActivo(email);
            ReadData();
        } else {

            var contenido = document.getElementById('contenido');
            contenido.innerHTML = '';

        }
    });
}
function loadpage(){
    window.location.href = 'index.html';
}
/*function next(x){
    document.getElementById(x).style.display = 'block';
    for(var s in sections){
        if(sections[s] != x){
            document.getElementById(sections[s]).style.display = 'none';
        }
    }
}*/
