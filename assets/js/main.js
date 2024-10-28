import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

//firebase config a Hung comment demo
const firebaseConfig = {
    apiKey: "AIzaSyDFIW4HVIG0usA868ltUJ_eTukLixdoT2A",
    authDomain: "hcyu-fit.firebaseapp.com",
    databaseURL: "https://hcyu-fit-default-rtdb.firebaseio.com",
    projectId: "hcyu-fit",
    storageBucket: "hcyu-fit.appspot.com",
    messagingSenderId: "1059484411477",
    appId: "1:1059484411477:web:83aca0a7b469d1fc5fd6dc"
};

//My firebase config 
// const firebaseConfig = {
//     apiKey: "AIzaSyCAgJndV6rdgtlIpQ5cjuUrL9KSbCS6fTU",
//     authDomain: "votting-app-52c6c.firebaseapp.com",
//     databaseURL: "https://votting-app-52c6c-default-rtdb.firebaseio.com",
//     projectId: "votting-app-52c6c",
//     storageBucket: "votting-app-52c6c.appspot.com",
//     messagingSenderId: "868756643395",
//     appId: "1:868756643395:web:5abc86da00bdfac3d8fef6"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const performancesRef = ref(db, 'performance');
const countRef = ref(db, 'voteCount');

// lazy loading
window.addEventListener("load", function () {
    document.getElementById("background").style.backgroundImage = "url('/assets/images/BackGroupDesktop.png')";
});
//End lazy loading

// Hàm để tăng biến count
const incrementCount = () => {
    // Lấy giá trị hiện tại của count từ Firebase
    onValue(countRef, (snapshot) => {
        let currentCount = snapshot.exists() ? snapshot.val() : 0;
        // Tăng count lên 1
        set(countRef, currentCount + 1);
    }, { onlyOnce: true });
};
// End Hàm để tăng biến count

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
const inputCheckBoxes = document.querySelectorAll("[type='checkbox']"); // Chọn tất cả các checkbox đúng cách

//comment demo
if (localStorage.getItem('voted') === 'true') {
    window.location.href = 'block.html';
} else {
    setInterval(() => {
        localStorage.setItem("voted", "true");
        window.location.reload();
    }, 5 * 60 * 1000);
}
// End comment demo

const checkboxIds = [];
if (inputCheckBoxes) {
    inputCheckBoxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                // Lấy ID của checkbox đã chọn
                checkboxIds.push(checkbox.id);
                // console.log(checkboxIds);
                // console.log("Checked checkbox ID: ", checkboxId);

                console.log(checkboxIds);
            } else {
                // Remove the ID from the array if it is unchecked
                const index = checkboxIds.indexOf(checkbox.id);
                if (index > -1) {
                    checkboxIds.splice(index, 1);
                }
                localStorage.setItem('voted', 'false');
                console.log(checkboxIds);
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
            }
        })

        window.location.reload();
    })
}

if (buttonVote) {
    const listLable = [];
    buttonVote.addEventListener("click", () => {

        if (checkboxIds.length === 0) {
            showAlert("Bạn cần chọn tiết mục trước khi bình chọn!", 3000);
            return;
        } else {
            checkboxIds.forEach(checkboxId => {
                const elementLable = document.querySelector(`label[for = "${checkboxId}"]`);
                if (elementLable) {
                    const content = elementLable.textContent.trim();
                    listLable.push(content);
                }
            })
        }

        if (listLable.length) {
            listLable.forEach(content => {
                if (content) {
                    const html = `<div class="alert--confirm">
                <div class="alert--content">
                    Bạn có chắc chắn với lựa chọn của mình ?
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
            })
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

                // Tăng biến count mỗi khi có một vote
                incrementCount();

                //comment demo
                localStorage.setItem('voted', 'true');
                //end comment demo

                listLable.forEach(content => {
                    if (content) {
                        const dataPerformance = {
                            namePerformance: `${content}`,
                        };

                        const newPerformanceRef = push(performancesRef);

                        set(newPerformanceRef, dataPerformance);
                    } else {
                        showAlert("Có lỗi xảy ra, vui lòng thử lại sau!", 3000);
                    }
                })

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
            }
        })

        window.location.href = "ranking.html";
    })
}
// End display and hidden alert







