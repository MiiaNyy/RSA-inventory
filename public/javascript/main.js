function toggleDropDown (e) {
    e.nextElementSibling.classList.toggle('dropdown-visible');
    e.children[0].classList.toggle('rotate-icon');
    e.classList.toggle('bolder_font');
    
}

function openNav () {
    moveNavAndMainContentToRight(200);
    document.getElementById("sidebar").style.width = "200px";
    document.getElementById("sidebar__content").style.visibility = "visible";
    document.getElementById("openNav").style.display = 'none';
}

function closeNav () {
    moveNavAndMainContentToRight(30);
    
    document.getElementById("sidebar").style.width = screen.width >= 700 ? "50px" : "30px";
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

// On smaller screens put sidebar on top of the main content. Bigger screens, move contents margin to left
function moveNavAndMainContentToRight(amount) {
    if ( screen.width >= 850 ) {
        // nav bar and main content. Elements that need to move when sidebar opens/closes
        const elements = document.querySelectorAll(".margin-left");
        elements.forEach(e => {
            e.style.marginLeft = `${amount}px`;
        })
    }
}

function goBackToPreviousPage() {
    window.history.back();
}
