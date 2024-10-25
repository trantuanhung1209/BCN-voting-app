// blocked vote when time out
// Lấy giờ và phút hiện tại
const currentDate = new Date();
const currentHour = currentDate.getHours();
const currentMinute = currentDate.getMinutes();
localStorage.setItem("isBlocked", "false");
console.log(currentDate);
if (currentDate.getDate() == 28 && currentHour >= 20 && currentMinute >= 45) {
    localStorage.setItem("isBlocked", "true");
    window.location.href = "block.html";
} else { 
    localStorage.setItem("isBlocked", "false");
}


// blocked vote when time out