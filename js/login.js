let logged = false;
let logList = [];

function initialize() {
    var chatBubble = document.getElementById('chat-bubble');
    chatBubble.addEventListener("click", openChat);

    const REGISTER_FORM = document.getElementById("register-form");
    if (REGISTER_FORM != null) {
        REGISTER_FORM.addEventListener("submit", register);
    }

    const LOGIN_FORM = document.getElementById("login-form");
    if (LOGIN_FORM != null) {
        LOGIN_FORM.addEventListener("submit", login);
    }

    if (sessionStorage.getItem('logged') == null) {
        console.log("null");
        sessionStorage.setItem('logged', null);
    }

    const LOG_DIV = document.getElementById("log-div");
    if (LOG_DIV != null) {
        LOG_DIV.innerHTML = `<h1>${sessionStorage.getItem("logMessage")}</h1>`;
        setTimeout(() => { window.location.href = "index.html"; }, 3000);
    }

}

//Open the chat log ---------------------
function openChat() {
    const CHAT_CONTENT = document.getElementById('chat-content');
    CHAT_CONTENT.style.display = (CHAT_CONTENT.style.display === 'block') ? 'none' : 'block';
    const CHAT_BUBBLE = document.getElementById('chat-bubble');
    CHAT_BUBBLE.style.backgroundColor = (CHAT_CONTENT.style.display === 'block') ? "#d4a373" : "white";
    const CHAT_ICON = document.getElementById('chat-icon');
    CHAT_ICON.style.color = (CHAT_CONTENT.style.display === 'block') ? "white" : "#d4a373";
}

//LOGIN & REGISTER -----------------------

function login(event) {
    event.preventDefault();
    logList = retriveLogFromLocalStorage();
    const LG_UNAME = event.target["lg-uname"].value;
    const LG_PASSWORD = event.target["lg-password"].value;

    const LG_PASSWORD_ERROR = document.getElementById("lg-password-error");
    const LG_UNAME_ERROR = document.getElementById("lg-uname-error");
    const LG_PASSWORD_NOT_FOUND = document.getElementById("lg-password-not-found");
    const LG_UNAME_NOT_FOUND = document.getElementById("lg-uname-not-found");

    let logged = sessionStorage.getItem('logged');
    if (logged == 'false' || logged == 'null') {

        if (LG_UNAME == "") {
            LG_UNAME_ERROR.style.visibility = "visible";
        }
        if (LG_PASSWORD == "") {
            LG_PASSWORD_ERROR.style.visibility = "visible";
        } else {
            LG_PASSWORD_ERROR.style.visibility = "hidden";
            LG_UNAME_ERROR.style.visibility = "hidden";

            for (let t = 0; t < logList.length; t++) {
                if (logList[t].username === event.target["lg-uname"].value) {
                    LG_UNAME_NOT_FOUND.style.visibility = "hidden";
                    if (logList[t].password === event.target["lg-password"].value) {
                        LG_PASSWORD_NOT_FOUND.style.visibility = "hidden";
                        logged = true;
                        redirect("logged in succesfully");
                        break;
                    } else {
                        LG_PASSWORD_NOT_FOUND.style.visibility = "visible";
                    }
                } else {
                    LG_UNAME_NOT_FOUND.style.visibility = "visible";
                    logged = false;
                }
            }
        }

    } else {
        redirect("You are already log in");
    }
    sessionStorage.setItem('logged', logged);
    sessionStorage.setItem('username', LG_UNAME);
}

function register(event) {
    event.preventDefault();
    logList = retriveLogFromLocalStorage();
    const UNAME = event.target.uname.value;
    const EMAIL = event.target.email.value;
    const PASSWORD = event.target.password.value;

    const RG_UNAME_ERROR = document.getElementById("uname-error");
    const RG_EMAIL_ERROR = document.getElementById("email-error");
    const RG_PASSWORD_ERROR = document.getElementById("password-error");

    if (UNAME == "" || EMAIL == "" || PASSWORD == "") {
        if (UNAME == "") { RG_UNAME_ERROR.style.visibility = "visible"; }
        if (EMAIL == "") { RG_EMAIL_ERROR.style.visibility = "visible"; }
        if (PASSWORD == "") { RG_PASSWORD_ERROR.style.visibility = "visible"; }
        console.log("error");
    } else {
        RG_UNAME_ERROR.style.visibility = "hidden";
        RG_EMAIL_ERROR.style.visibility = "hidden";
        RG_PASSWORD_ERROR.style.visibility = "hidden";
        logList.push({
            username: UNAME,
            email: EMAIL,
            password: PASSWORD,
        });
        saveLogInLocalStorage(logList);
        redirect("Registration succesfull");
    }
}


function logOut() {
    if (sessionStorage.getItem('logged')) {
        sessionStorage.setItem('logged', 'false');
        sessionStorage.setItem('username', '');
        redirect("logged out succesfully");
    }
}
initialize();

//LOCAL STORAGE

function saveLogInLocalStorage(log) {
    var logJSON = JSON.stringify(log);
    localStorage.setItem("logData", logJSON);
}

function retriveLogFromLocalStorage() {
    var logRecoveredJSON = localStorage.getItem("logData");
    return JSON.parse(logRecoveredJSON) || [];
}

//Login redirect

function redirect(message) {
    sessionStorage.setItem("logMessage", message);
    window.location.href = "redirect.html";
}