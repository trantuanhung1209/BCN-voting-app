const buttonVote = document.querySelector("[button-vote]");
const buttonCancel = document.querySelector("[button-cancel]");
const buttonComfirm = document.querySelector("[button-comfirm]");
const overlayConfirm = document.querySelector("[overlay-confirm]");
const overlaySuccess = document.querySelector("[overlay-success]");
const buttonOk = document.querySelector("[button-ok]");

if(overlayConfirm) {
    overlayConfirm.addEventListener("click", () => {
        overlayConfirm.style.display = "none";
    })
}

if(overlaySuccess) {
    overlaySuccess.addEventListener("click", () => {
        overlaySuccess.style.display = "none";
    })
}

if(buttonVote) {
    buttonVote.addEventListener("click", () => {
        overlayConfirm.style.display = "block";
    })
}

if(buttonCancel) {
    buttonCancel.addEventListener("click", () => {
        overlayConfirm.style.display = "none";
    })
}

if(buttonComfirm) {
    buttonComfirm.addEventListener("click", () => {
        overlaySuccess.style.display = "block";
        overlayConfirm.style.display = "none";
    })
}

if(buttonOk) {
    buttonOk.addEventListener("click", () => {
        overlaySuccess.style.display = "none";
        overlayConfirm.style.display = "none";
    })
}