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

    const firestore = firebase.firestore()
    const docRef = firestore.doc("samples/petData")
    
    // get login document elements
    const emailInputEl = document.getElementById("emailInput");
    const passwordInputEl = document.getElementById("passwordInput");
    const loginBtnEl = document.getElementById("loginBtn");
    const loginStatusEl = document.getElementById("loginStatus");

    // get voting document elements
    const petChoiceEls = document.getElementsByName("pet");
    const voteBtnEl = document.getElementById("voteBtn");
    const petDislayEl = document.getElementById("petDisplay");

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
                // console.log(firebaseUser)
                loginStatusEl.innerText = "You are logged in."
            } else {
                // console.log("not logged in")
                loginStatusEl.innerText = "You are NOT logged in."               
            }
        })
    }
    authenticationState()

    function voteBtn(){
        voteBtnEl.addEventListener("click", function(){
            const vote = getVote();
            saveToDatabase(vote);
        })
    }
    voteBtn()

    function getVote(){
        for(let i=0; i < petChoiceEls.length; i++){
            if(petChoiceEls[i].checked){
                return petChoiceEls[i].value;
            }
        }
    }

    async function saveToDatabase(vote){
        const textToSave = vote;
        console.log(`I am going to save ${vote} as the best pet.`)
        try{ 
            const response = await docRef.set({
                petStatus: textToSave
            })
            console.log("Pet vote saved!: ", response)
        }
        catch(err){
            console.log("Error occurred trying to save vote: ", err)
        } 
    }

    function getRealTimeUpdates(){
        docRef.onSnapshot(function(doc){
            if(doc && doc.exists) {
                const myData = doc.data();
                petDislayEl.innerHTML = myData.petStatus;
            }
        })
    }
    getRealTimeUpdates()

}
main();