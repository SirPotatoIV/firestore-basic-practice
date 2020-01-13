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
                await auth.signInWithEmailAndPassword(email, password);
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
                // User is not logged in
                loginStatusEl.innerText = "You are logged in."
                // if getRealTimeUpdates is started prior to someone being logged in errors occur due to the current Firestore permissions I have set.
                getRealTimeUpdates()
            } else {
                // User is not logged in
                loginStatusEl.innerText = "You are NOT logged in."               
            }
        })
    }
    authenticationState()

    function voteBtn(){
        // Start event listener for vote button
        voteBtnEl.addEventListener("click", function(){
            // call getVote to get the users vote
            const vote = getVote();
            // call saveToDatabase to save the users vote to the database
            saveToDatabase(vote);
        })
    }
    voteBtn()

    function getVote(){
        // loops through all the choice elements and sees if one is checked. If checked, that checked element is the vote.
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
            // sends the users vote to the Firestore database
            await docRef.set({
                petStatus: textToSave
            })
            console.log("Pet vote saved!")
        }
        catch(err){
            console.log("Error occurred trying to save vote: ", err)
        } 
    }
    
    // continuely listens for updates to the database at the specific database document "docRef"
    function getRealTimeUpdates(){
        // starts the listener
        docRef.onSnapshot(function(doc){
            if(doc && doc.exists) {
                // gets the data from the database when an update occurs
                const myData = doc.data();
                // sets the pet display el to the updated value of petStatus
                petDislayEl.innerHTML = myData.petStatus;
            }
        })
    }
}
main();