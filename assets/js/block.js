// Block vote when time out
const html = document.querySelector("html");
const currentDate = new Date();
const currentHour = currentDate.getHours();
const currentMinute = currentDate.getMinutes();

// Set initial block status
localStorage.setItem("isBlocked", "false");

if (currentDate.getDate() === 28 && currentHour >= 20 && currentMinute >= 45) {
    localStorage.setItem("isBlocked", "true");
} else {
    localStorage.setItem("isBlocked", "false");
}

// Function to check if voting is blocked
function checkBlockStatus() {
    if (localStorage.getItem("isBlocked") === "true") {
        window.location.href = "block.html";
    }
}

// Run checkBlockStatus function on load
checkBlockStatus();

// Monitor clicks to redirect if blocked
html.addEventListener("click", checkBlockStatus);

// Countdown time
function countdown(endDate) {
    const countdown = document.querySelector('.countdown');

    // Update the countdown every 1 second
    const x = setInterval(function () {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the countdown date
        const distance = endDate - now;

        // Time calculations for days, hours, minutes, and seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result
        countdown.innerHTML = `Thời gian còn lại: ${hours}h ${minutes}m ${seconds}s`;

        // Redirect when countdown is finished
        if (distance < 0) {
            clearInterval(x);
            countdown.innerHTML = "Hết thời gian bình chọn";
            localStorage.setItem("isBlocked", "true");
            window.location.href = "block.html";
        }
    }, 1000);
}

// Set the date we're counting down to
const countDownDate = new Date("Oct 28, 2024 20:45:00").getTime();
countdown(countDownDate);

// Monitor `isBlocked` status periodically to redirect if blocked
setInterval(checkBlockStatus, 1000);


// Reload the page when the countdown is finished
// Set the target date and time
const targetDate = new Date("Oct 28, 2024 20:45:00");

// Get the current date and time
const currentDate1 = new Date();

// Calculate the difference in milliseconds
const differenceInMilliseconds = targetDate - currentDate1;

// Convert the difference to seconds
const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

setTimeout(() => {
    window.location.reload();
},1000 * differenceInSeconds);

//End Reload the page when the countdown is finished


