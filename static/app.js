const socket = io('http://localhost:3002');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const email = document.getElementById('email');
const btn = document.getElementById('login');

msgCont.style.display = 'none';
msgBox.style.display = 'none';
//get old messages from the server
const messages = [];
function getMessages() {
    fetch('http://localhost:3002/api/chat')
        .then((response) => response.json())
        .then((data) => {
            loadDate(data);
            data.forEach((el) => {
                messages.push(el);
            });
        })
        .catch((err) => console.error(err));
}
getMessages();

if (btn) {
    btn.addEventListener('click', () => {
        if (email.value.trim().length > 0) {
            email.disabled = true;
            msgBox.style.display = 'block';
            msgCont.style.display = 'block';
            loadDate(messages);
            btn.style.display = 'none';
        }
        else {
            alert('Please enter your username');
        }
    });
}

//When a user press the enter key, send message.
msgBox.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        if (e.target.value.trim().length != 0) {
            sendMessage({ email: email.value, text: e.target.value });
            e.target.value = '';
            return;
        }
        alert('Please enter your message');
    }
});

//Display messages to the users
function loadDate(data) {
    let messages = '';
    data.map((message) => {
        if (message.email === email.value) {
            messages += `<li class="w-50 p-2 rounded mb-2 text-dark" style="background-color:#fa46ad" >
            <span class="fw-bolder">${message.email}</span>
            <br>
            ${message.text}
            </li> `;
        }
        else {
            //#f7cbe4
            messages += `<li class="w-50 p-2 rounded mb-2 text-dark" style="background-color:
            #faafda" >
            <span class="fw-bolder">${message.email}</span>
            <br>
            ${message.text}
            </li> `;
        }


    });
    msgCont.innerHTML = messages;
}

//socket.io
//emit sendMessage event to send message
function sendMessage(message) {
    socket.emit('sendMessage', message);
}
//Listen to recMessage event to get the messages sent by users
socket.on('recMessage', (message) => {
    messages.push(message);
    // loadDate(messages);
})