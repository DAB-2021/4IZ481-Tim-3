$(document).ready(function(){
    $("form").submit(function(e){
        e.preventDefault();
        var text1 = $('input').val()
        
        if (text1 === "") {
            return
        }

        updateChatText(text1, false)
        $(".chatbox__messages").scrollTop($(".chatbox__messages")[0].scrollHeight);
        $('input').val("")
        body = {message: text1}

        $.ajax({
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(body),
            url: "http://localhost:5005/webhooks/rest/webhook",
            success: function (results) {
                updateChatText(parseLink(results[0].text))
                $(".chatbox__messages").scrollTop($(".chatbox__messages")[0].scrollHeight);
            }
        })
    });
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

function parseLink(text) {
    const regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig
    return str.replace(regex, "<a href='$1' target='_blank'>$1</a>")
}

const chatbox = new Chatbox();
chatbox.display();