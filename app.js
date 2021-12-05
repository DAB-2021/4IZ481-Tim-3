$(document).ready(function(){
    $(".send__button").off("click.send").on("click.send", function() {
        var text1 = $('input').val()
        
        if (text1 === "") {
            return
        }

        updateChatText(text1, false)
        body = {message: text1}
        console.log(body)
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(body),
            url: "http://localhost:5005/webhooks/rest/webhook",
            success: function (results) {
                let msg2 = results[0]
                $('input').val("")
                updateChatText(msg2.text)
            }
        })
    })
})

class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }
}

function updateChatText(message, name=true) {
    let html;
    if (name === true)
    {
        html = '<div class="messages__item messages__item--visitor">' + message + '</div>'
    }
    else
    {
        html = '<div class="messages__item messages__item--operator">' + message + '</div>'
    }

    const chatmessage = document.querySelector('.chatbox__messages');
    chatmessage.innerHTML += html;
}


const chatbox = new Chatbox();
chatbox.display();