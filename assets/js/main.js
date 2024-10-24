// display and hidden alert

const buttonVote = document.querySelector("[button-vote]");
const buttonCancel = document.querySelector("[button-cancel]");
const buttonOk = document.querySelector("[button-ok]");
const buttonConfirm = document.querySelector("[button-comfirm]");
const alertConfirm = document.querySelector("[alert-confirm]");
const alertOk = document.querySelector("[alert-ok]");
const overlayConfirm = document.querySelector("[overlay-confirm]");
const overlayOk = document.querySelector("[overlay-ok]");

if (overlayConfirm) {
    overlayConfirm.addEventListener("click", () => {
        alertConfirm.style.display = "none";
        alertOk.style.display = "none";
    })
}

if (overlayOk) {
    overlayOk.addEventListener("click", () => {
        alertConfirm.style.display = "none";
        alertOk.style.display = "none";
    })
}

if (buttonVote) {
    buttonVote.addEventListener("click", () => {
        alertConfirm.style.display = "block";
    })
}

if (buttonConfirm) {
    buttonConfirm.addEventListener("click", () => {
        alertConfirm.style.display = "none";
        alertOk.style.display = "block";
    })
}

if (buttonCancel) {
    buttonCancel.addEventListener("click", () => {
        alertConfirm.style.display = "none";
    })
}

if (buttonOk) {
    buttonOk.addEventListener("click", () => {
        alertOk.style.display = "none";
    })
}

// End display and hidden alert

// enable and disable check-box
const inputCheckBoxes = document.querySelectorAll("[type='checkbox']"); // Chọn tất cả các checkbox đúng cách
if (inputCheckBoxes) {
    inputCheckBoxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () { // Sử dụng function để đúng ngữ cảnh của `this`
            if (checkbox.checked) { // Sử dụng đúng checkbox.checked thay vì this.checked
                inputCheckBoxes.forEach(cb => {
                    if (cb !== checkbox) { // Kiểm tra nếu không phải checkbox hiện tại
                        cb.disabled = true; // Sửa từ disable thành disabled
                    }
                });
            } else {
                inputCheckBoxes.forEach(cb => {
                    if (cb !== checkbox) {
                        cb.disabled = false; // Sửa từ disable thành disabled
                    }
                });
            }
        });
    });
}
// End enable and disable check-box

