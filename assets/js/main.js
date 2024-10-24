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