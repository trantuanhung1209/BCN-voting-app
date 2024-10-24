import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCAgJndV6rdgtlIpQ5cjuUrL9KSbCS6fTU",
    authDomain: "votting-app-52c6c.firebaseapp.com",
    projectId: "votting-app-52c6c",
    storageBucket: "votting-app-52c6c.appspot.com",
    messagingSenderId: "868756643395",
    appId: "1:868756643395:web:5abc86da00bdfac3d8fef6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
const performancesRef = ref(db, 'performance');


// show alert
const showAlert = (content = null, time = 3000) => {
    if (content) {
        const newAlert = document.createElement("div");
        newAlert.setAttribute("class", "alert--error__item");
        newAlert.innerHTML = `
            <span class="alert-content">
                ${content}
            </span>
            <span class="alert-close">
                <i class="fa-solid fa-xmark"></i>
            </span>
        `;

        const alertList = document.querySelector(".alert--error")
        alertList.appendChild(newAlert);

        const alertClose = newAlert.querySelector(".alert-close");

        alertClose.addEventListener("click", () => {
            alertList.removeChild(newAlert);
        })
        setTimeout(() => {
            alertList.removeChild(newAlert);
        }, `${time}`);
    }
}
// End show alert

// enable and disable check-box
let checkboxId = null;
const inputCheckBoxes = document.querySelectorAll("[type='checkbox']"); // Chọn tất cả các checkbox đúng cách

if (inputCheckBoxes) {
    inputCheckBoxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                // Lấy ID của checkbox đã chọn
                checkboxId = checkbox.id;
                // console.log("Checked checkbox ID: ", checkboxId);

                // Vô hiệu hóa các checkbox khác
                inputCheckBoxes.forEach(cb => {
                    if (cb !== checkbox) {
                        cb.disabled = true;
                    }
                });
            } else {
                // Kích hoạt lại tất cả các checkbox khác
                inputCheckBoxes.forEach(cb => {
                    if (cb !== checkbox) {
                        cb.disabled = false;
                    }
                });
                checkboxId = null; // Đặt lại giá trị checkboxId khi không có checkbox nào được chọn
            }
        });
    });
}
// End enable and disable check-box

// display and hidden alert

const buttonVote = document.querySelector("[button-vote]");
const buttonOk = document.querySelector("[button-ok]");
const alertConfirm = document.querySelector("[alert-confirm]");
const alertOk = document.querySelector("[alert-ok]");
const overlayOk = document.querySelector("[overlay-ok]");



if (overlayOk) {
    overlayOk.addEventListener("click", () => {
        inputCheckBoxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkbox.checked = false;

                // Vô hiệu hóa các checkbox khác
                inputCheckBoxes.forEach(cb => {
                    if (cb !== checkbox) {
                        cb.disabled = false;
                    }
                });
            }
        })

        window.location.reload();
    })
}

if (buttonVote) {
    buttonVote.addEventListener("click", () => {
        if (checkboxId) {
            const elementLable = document.querySelector(`label[for = "${checkboxId}"]`);
            if (elementLable) {
                const content = elementLable.textContent.trim();
                if (content) {
                    const html = `<div class="alert--confirm">
                <div class="alert--content">
                    Bạn muốn bình chọn tiết mục
                    ${content} ?
                </div>
    
                <div class="alert-action">
                    <button class="alert__button--cancel" button-cancel>
                        Hủy
                    </button>
    
                    <button class="alert__button--confirm" button-comfirm>
                        Xác nhận
                    </button>
                </div>
            </div>
    
            <div class="overlay" overlay-confirm></div>`;

                    alertConfirm.innerHTML = html;
                    alertConfirm.style.display = "block";
                }
            }
        } else {
            showAlert("Bạn cần chọn tiết mục trước khi bình chọn!", 3000);
        }


        const buttonCancel = document.querySelector("[button-cancel]");
        if (buttonCancel) {
            buttonCancel.addEventListener("click", () => {
                alertConfirm.style.display = "none";
            })
        }

        //confirm content and push firebase
        const buttonConfirm = document.querySelector("[button-comfirm]");
        if (buttonConfirm) {
            buttonConfirm.addEventListener("click", () => {
                const elementLable = document.querySelector(`label[for = "${checkboxId}"]`);
                const content = elementLable.textContent.trim();
                console.log(content);

                if (checkboxId) {
                    const elementLable = document.querySelector(`label[for = "${checkboxId}"]`);
                    if (elementLable) {
                        const content = elementLable.textContent.trim();

                        if (content) {

                            const dataPerformance = {
                                namePerformance: `${content}`,
                                quantity: 1
                            };

                            const newPerformanceRef = push(performancesRef);

                            set(newPerformanceRef, dataPerformance);
                        }
                    }
                }

                alertConfirm.style.display = "none";
                alertOk.style.display = "block";
            })
        }

        const overlayConfirm = document.querySelector("[overlay-confirm]");
        if (overlayConfirm) {
            overlayConfirm.addEventListener("click", () => {
                alertConfirm.style.display = "none";
                alertOk.style.display = "none";
            })
        }

    })
}

if (buttonOk) {
    buttonOk.addEventListener("click", () => {
        alertOk.style.display = "none";
        inputCheckBoxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkbox.checked = false;

                // Vô hiệu hóa các checkbox khác
                inputCheckBoxes.forEach(cb => {
                    if (cb !== checkbox) {
                        cb.disabled = false;
                    }
                });
            }
        })

        window.location.href = "ranking.html";
    })
}
// End display and hidden alert




