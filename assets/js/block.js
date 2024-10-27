// // Set initial block status
// localStorage.setItem("isBlocked", "false");
// // Reload the page every 5 minutes

//comment demo
setInterval(() => {
    window.location.reload();
    localStorage.setItem("isBlocked", "true");
}, 5 * 60 * 1000);
//End comment demo


// Function to check if voting is blocked
function checkBlockStatus() {
    if (localStorage.getItem("isBlocked") === "true") {
        window.location.href = "block.html";
    }
}

// Run checkBlockStatus function on load
checkBlockStatus();

// Countdown time
function countdown(minutes) {
    const countdown = document.querySelector('.countdown');

    // Set the end time based on the current time plus the countdown duration in minutes
    const endTime = new Date().getTime() + minutes * 60 * 1000;

    // Update the countdown every 1 second
    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = endTime - now;

        const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

        countdown.innerHTML = `Thời gian còn lại: ${minutesLeft}m ${secondsLeft}s`;

        if (distance < 0) {
            clearInterval(x);
            countdown.innerHTML = "Hết thời gian bình chọn";
            localStorage.setItem("isBlocked", "true");
            window.location.href = "block.html";
        }
    }, 1000);
}

// Start the countdown with 5 minutes
countdown(5);

// Monitor `isBlocked` status periodically to redirect if blocked
setInterval(checkBlockStatus, 1000);


