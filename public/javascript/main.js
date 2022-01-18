function toggleDropDown (e) {
    e.nextElementSibling.classList.toggle('dropdown-visible');
    e.children[0].classList.toggle('rotate-icon');
    e.classList.toggle('bolder_font');
    
}

function openSidebar () {
    moveNavAndMainContentToRight(200);
    document.getElementById("sidebar").style.width = "200px";
    document.getElementById("sidebar__content").style.visibility = "visible";
    document.getElementById("open-sidebar__btn").style.display = 'none';
}

function closeSidebar () {
    moveNavAndMainContentToRight(50);
    document.getElementById("sidebar").style.width = screen.width <= 600 ? "40px" : "50px";
    document.getElementById("sidebar__content").style.visibility = "hidden";
    document.getElementById("open-sidebar__btn").style.display = "block";
}

// On smaller screens put sidebar on top of the main content. Bigger screens, move contents margin to left
function moveNavAndMainContentToRight (amount) {
    if ( screen.width >= 850 ) {
        // nav bar and main content. Elements that need to move when sidebar opens/closes
        const elements = document.querySelectorAll(".margin-left");
        elements.forEach(e => {
            e.style.marginLeft = `${ amount }px`;
        })
    }
}

function goBackToPreviousPage () {
    window.history.back();
}

function openPopUp (popUpElementName) {
    document.querySelector(`.${popUpElementName}`).style.display = 'block';
    document.querySelector('nav').classList.add('blur-background');
    document.querySelector('.sidebar').classList.add('blur-background');
    document.querySelector('.container__item-details').classList.add('blur-background');
}

function closePopUp (popUpElementName) {
    document.querySelector(`.${popUpElementName}`).style.display = 'none';
    document.querySelector('nav').classList.remove('blur-background');
    document.querySelector('.sidebar').classList.remove('blur-background');
    document.querySelector('.container__item-details').classList.remove('blur-background');
}
