// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoSuvLMpExEsoQZOb1W24d24KhopJv0hw",
    authDomain: "bonsai-bites.firebaseapp.com",
    databaseURL: "https://bonsai-bites-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bonsai-bites",
    storageBucket: "bonsai-bites.appspot.com",
    messagingSenderId: "991587759660",
    appId: "1:991587759660:web:287bc2196966718eea8389",
};

// Initialize Firebase


initializeApp(firebaseConfig);

const DB = getDatabase();

function initializeMessages() {

    const CHAT_FORM = document.getElementById("chat-content");
    console.log(CHAT_FORM);
    
    if(CHAT_FORM != null) {
        CHAT_FORM.addEventListener("submit", addMessages);
    }
    const MESSAGES_REF = ref(DB, "messages/");

    onValue(MESSAGES_REF, showMessages);
}

function showMessages(snapshot) {
    const CHAT_CONTENT = document.getElementById("chat-content");
    const MESSAGES_FROM_FIREBASE = snapshot.val();

    var chatLogHTML = "";
    logged = sessionStorage.getItem('logged');
    if (logged == 'true') {
        for (let m in MESSAGES_FROM_FIREBASE) {
            const TEXT = MESSAGES_FROM_FIREBASE[m].message;
            const SENDER = MESSAGES_FROM_FIREBASE[m].sender;
            chatLogHTML += `
            <div class="message-container">
            <div class="message-text">
            <span class="sender-name">${SENDER}</span>
            <p>${TEXT}</p>
            </div>
            </div>
            `;
        }
        //Send button container
        chatLogHTML += `
        <form id="chat-form">
        <div class="input-container">
        <input id="chat-text" type="text" placeholder="Write a message">
        </div>
        <button type="submit" class="input-button">Send</button>
        </form>
        `;
    } else {
        chatLogHTML = `
        <div class="message-container">
        <div class="message-text">
        <span class="sender-name">System:</span>
        <p>Please, Log in First</p>
        </div>
        </div>
        <div class="input-container">
        </div>
        <a href="login.html"><button class="input-button">Log In</button></a>
        `;
    }

    CHAT_CONTENT.innerHTML = chatLogHTML;
}

function addMessages(event){
    event.preventDefault();
    console.log("awdawdawd");
    const SENDER = sessionStorage.getItem("username");
    const TEXT = event.target["chat-text"].value;

    const NEW_MESSAGE = {
        sender: SENDER,
        message: TEXT
    }

    const MESSAGES_REF = ref(DB, "messages/");
    push(MESSAGES_REF, NEW_MESSAGE);
}

initializeMessages();