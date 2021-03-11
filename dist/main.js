// Controller for ScrollMagic library
var controller = new ScrollMagic.Controller();

// Hiding header on scrolling
let prevScrollPos = window.pageYOffset;
window.onscroll = function() {
    let curScrollPos = window.pageYOffset;  // current position
    if (prevScrollPos > curScrollPos) {
        document.getElementById("header").style.top = 0;
    } else {
        document.getElementById("header").style.top = "-50px";
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
        document.documentElement.style.setProperty("--bg-color", "#272727");
        document.documentElement.style.setProperty("--text-color", "white");
    } else {
        btn.innerHTML = "DARK-THEME";
        localStorage.setItem("theme", "light-mode");
        document.documentElement.style.setProperty("--bg-color", "white");
        document.documentElement.style.setProperty("--text-color", "#272727");
    }

    document.body.classList.toggle("light-mode");
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

function handleMenu() {
    document.getElementById('box').classList.toggle('active');
    document.getElementById('hamburger').classList.toggle('active');
};