// Controller for ScrollMagic library
var controller = new ScrollMagic.Controller();

// Hiding header (and navbar in tablet view) on scrolling
let prevScrollPos = window.pageYOffset;
window.onscroll = function() {
    let curScrollPos = window.pageYOffset;  // current position
    if (prevScrollPos > curScrollPos) {
        document.getElementById("header").style.top = 0;
    } else {
        document.getElementById("header").style.top = "-50px";
    }

    if (window.innerWidth <= 1024) {
        if (prevScrollPos > curScrollPos) {
            document.getElementById("nav").style.top = "60px";
        } else {
            document.getElementById("nav").style.top = "-110px";
        }   
    }

    prevScrollPos = curScrollPos;   // update previous position
}


// Animation on scrolling over 'title' elements
let revealTitle = document.getElementsByClassName("title");
for (let i=0; i<revealTitle.length; i++) { // create a scene for each element
    new ScrollMagic.Scene({
                        triggerElement: revealTitle[i], // y value not modified, so we can use element as trigger as well
                        offset: 50,												 // start a little later
                        triggerHook: 0.9,
                    })
                    .setClassToggle(revealTitle[i], "title_animated") // add class toggle
                    .addTo(controller);
}


// Animation on scrolling over 'content' elements
let revealContent = document.getElementsByClassName("content");
for (let i=0; i<revealContent.length; i++) { // create a scene for each element
    new ScrollMagic.Scene({
                        triggerElement: revealContent[i], // y value not modified, so we can use element as trigger as well
                        offset: 50,												 // start a little later
                        triggerHook: 0.9,
                    })
                    .setClassToggle(revealContent[i], "content_animated") // add class toggle
                    .addTo(controller);
}


// Toggling dark mode
function toggleDarkMode() {

    /* Change the sites' theme;
       Change the theme-changing button text depending on the theme
       Save new theme in local storage so it won't get changed after reload 
       Implemented using localStorage */

    let btn = document.getElementById("theme-switch");

    if(document.body.classList.contains("light-mode")) {        
        btn.innerHTML = "LIGHT-THEME";                          
        localStorage.setItem("theme", "dark-mode");
    } else {
        btn.innerHTML = "DARK-THEME";
        localStorage.setItem("theme", "light-mode");
    }

    // Toggling CSS classes for various DOM elements 
    document.body.classList.toggle("light-mode");
    btn.classList.toggle("light-mode");
    document.getElementById("arrow").classList.toggle("arrow-light-mode");
    document.getElementById("header").classList.toggle("light-mode");
    let icons = document.getElementsByClassName("icon-dark-mode");
    for(let i = 0; i < icons.length; i++) {
        icons[i].classList.toggle("icon-light-mode");
    }
    let iconTitles = document.getElementsByClassName("icon-title");
    for(let i = 0; i < iconTitles.length; i++) {
        iconTitles[i].classList.toggle("icon-light-mode");
    }
}

// Changes theme on load from default if needed 
function changeThemeOnLoad() { 
    if (localStorage.getItem("theme") == "light-mode") {
        toggleDarkMode();
    }
}


// Copying text from DOM to clipboard on click
function copy(text) {
    const input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand('copy');
    document.body.removeChild(input);

    return result;
}

// Copy text to clipboard and temporarily substitute it with an alert
function alertAndCopy(id) {
    let text = document.getElementById(id);

    copy(text.textContent);

    text.innerHTML = "Copied to clipboard!";
}

// Reset text to default value
function setText(val, id) {
    let text = document.getElementById(id);

    text.innerHTML = val;
}