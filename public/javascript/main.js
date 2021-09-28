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

function makeItemDetailGetRequest (id) {
    const endpoint = `/details/${ id }`;
    
    fetch(endpoint, {method: 'GET'})
        .then((response) => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(e => console.log(e));
}