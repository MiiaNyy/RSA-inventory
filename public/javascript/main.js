function toggleDropDown (e) {
    e.nextElementSibling.classList.toggle('dropDownVisible');
    e.children[0].classList.toggle('rotateIcon');
}

function w3_open () {
    // On smaller screens put sidebar on top of the main content. Bigger screens, move contents margin to left
    if ( screen.width >= 700 ) {
        document.getElementById("content").style.marginLeft = "200px";
    }
    
    document.getElementById("sidebar").style.width = "200px";
    document.getElementById("sidebar__content").style.visibility = "visible";
    document.getElementById("openNav").style.display = 'none';
}

function w3_close () {
    document.getElementById("content").style.marginLeft = "30px";
    document.getElementById("sidebar").style.width = "30px";
    document.getElementById("sidebar__content").style.visibility = "hidden";
    document.getElementById("openNav").style.display = "inline-block";
}

function openChatBot (e) {
    document.querySelector('.chat-api').classList.add('chat-bot__open');
    document.querySelector('.toggle-chat-api').style.display = 'none';
    document.querySelector('.chat-container').classList.remove('chat-container__closed');
    document.querySelector('.chat-container').classList.add('chat-container__open');
    
    
}

function closeChatBot () {
    document.querySelector('.chat-api').classList.remove('chat-bot__open');
    document.querySelector('.toggle-chat-api').style.display = 'block';
    
    document.querySelector('.chat-container').classList.add('chat-container__closed');
    document.querySelector('.chat-container').classList.remove('chat-container__open');
}

function rearrangeItemOrder (item) {
    console.log('clicked little arrow')
}
