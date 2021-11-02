function toggleDropDown (e) {
    e.nextElementSibling.classList.toggle('dropDownVisible');
    e.children[0].classList.toggle('rotateIcon');
}

function w3_open () {
    document.getElementById("content").style.marginLeft = "200px";
    document.getElementById("mySidebar").style.width = "200px";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
}

function w3_close () {
    document.getElementById("content").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}

function openChatBot (e) {
    document.querySelector('.chat-api').classList.add('chat-bot__open');
    document.querySelector('.toggle-chat-api').style.display = 'none';
    document.querySelector('.chat-container').classList.remove('chat-container__closed');
    document.querySelector('.chat-container').classList.add('chat-container__open');
    
    
}

function closeChatBot() {
    document.querySelector('.chat-api').classList.remove('chat-bot__open');
    document.querySelector('.toggle-chat-api').style.display = 'block';
    
    document.querySelector('.chat-container').classList.add('chat-container__closed');
    document.querySelector('.chat-container').classList.remove('chat-container__open');
}
