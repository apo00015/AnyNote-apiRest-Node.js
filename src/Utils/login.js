export function loginWithGoogle() {
    //variables
    var firebaseConfig = {
        apiKey: "AIzaSyDdE5H3eoVeOLmOQStH1pR1mDUKSmoBIHI",
        authDomain: "loginwithoauth2-bcb89.firebaseapp.com",
        projectId: "loginwithoauth2-bcb89",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        console.log(user.email);
        //updateUser(user);
        console.log(mi_variable_global)
        const ruta = "/notas/" + user.email
        location.href = ruta;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

        console.log(errorMessage);
    });
}

export function logout() {
    firebase.auth().signOut().then(function () {
        user_name_h1.innerHTML = "Acceso";
        login_btn.style.display = "inline-block";
        logout_btn.style.display = "none";

    }).catch(function (error) {
        // An error happened.
    });

}