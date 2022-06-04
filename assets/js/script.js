let seconds = 60;
let timer;
function countdown() {
    if(seconds < 60) {
        document.getElementById("timer").innerHTML = seconds;
    }
    if(seconds > 0) {
        seconds--;
    } else {
        clearInterval(timer);
        alert("The time is up!");
    }
}

document.getElementById("start").onclick = function() {
    if(!timer) {
        timer = window.setInterval(function() {
            countdown();
        }, 1000);
    }
}

document.getElementById("timer").innerHTML="1:00";