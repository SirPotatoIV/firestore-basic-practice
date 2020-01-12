function main(){
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyD7aPopuGh5ioSkxFAOHYVzj3N3jyj6EQs",
        authDomain: "full-firebase-practice.firebaseapp.com",
        databaseURL: "https://full-firebase-practice.firebaseio.com",
        projectId: "full-firebase-practice",
        storageBucket: "full-firebase-practice.appspot.com",
        messagingSenderId: "676263439171",
        appId: "1:676263439171:web:596a4f691553fbe0df9df6",
        measurementId: "G-X7PQCHBHNK"
        };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    
    // get document elements
    const emailInputEl = document.getElementById("emailInput");
    const passwordInputEl = document.getElementById("passwordInput");
    const loginBtnEl = document.getElementById("loginBtn");
    const loginStatusEl = document.getElementById("loginStatus");

    function login(){
        // add login event
        loginBtnEl.addEventListener("click", async function(){
            event.preventDefault()
            // get email and password
            const email = emailInputEl.value;
            const password = passwordInputEl.value;
            const auth = firebase.auth()
            // sign in
            try{
                const response = await auth.signInWithEmailAndPassword(email, password);
            }
            catch(err){
                console.log("issue occurred during login: ", err)
            }
        })
    }
    login()

    function authenticationState(){
        // checks if user is logged in or not
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                console.log(firebaseUser)
                loginStatusEl.innerText = "You are logged in."
            } else {
                console.log("not logged in")
                loginStatusEl.innerText = "You are NOT logged in."               
            }
        })
    }
    authenticationState()
}
main();