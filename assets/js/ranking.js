import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

//firebase config a Hung
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


// lazy loading
window.addEventListener("load", function () {
    document.getElementById("background").style.backgroundImage = "url('/assets/images/BackGroupDesktop.png')";
});
//End lazy loading

// get list performer
// Function to group duplicates and return an object with counts
function groupDuplicates(arr) {
    const countMap = {};

    arr.forEach(name => {
        countMap[name] = (countMap[name] || 0) + 1;
    });

    // Convert countMap to an array of objects for better readability
    const result = Object.entries(countMap).map(([name, count]) => ({ name, count }));

    return result;
}

let userCount = 0;

// Hàm getCount với Promise để lấy userCount từ Firebase
const getCount = () => {
    return new Promise((resolve, reject) => {
        const countRef = ref(db, 'voteCount');

        onValue(countRef, (snapshot) => {
            if (snapshot.exists()) {
                userCount = snapshot.val();
                updateRanking();
            } else {
                reject("Vote count is not available.");
            }
        });
    });
};


const updateRanking = () => {
    onValue(performancesRef, (snapshot) => {
        let ids = [];
        let datas = [];

        console.log(userCount);

        snapshot.forEach((item) => {
            const key = item.key;
            const data = item.val();
            ids.push(key);
            datas.push(data.namePerformance);
        });

        // Group duplicates and sort by count
        const groupedNames = groupDuplicates(datas).sort((a, b) => b.count - a.count);

        // Limit to the top 5 performers
        // groupedNames = groupedNames.slice(0, 5);

        const listPerformer = document.querySelector("[list-performer]");

        // Lưu trữ vị trí hiện tại của từng thẻ <li> trước khi cập nhật
        const currentPositions = {};
        document.querySelectorAll('.performer-item').forEach((item, index) => {
            currentPositions[item.dataset.name] = item.getBoundingClientRect().top;
        });

        // Cập nhật HTML với dữ liệu mới
        const htmls = groupedNames.map(item => {
            const percentage = (((item.count) / userCount) * 100).toFixed(2) >= 100 ? 100 : (((item.count) / userCount) * 100).toFixed(2);
            return `
            <li class="performer-item" data-name="${item.name}" style="--progress-width: ${percentage}%;">
                <form action="#" class="main__box-content--form">
                    <div class="item--award">
                    <img src = "assets/images/award.png"/>
                    </div>
                    <label class="performer--name">${item.name}</label>
                    <label class="quantity-vote">${percentage}%</label>
                </form>
            </li>
        `;
        }).join('');

        listPerformer.innerHTML = htmls;

        console.log(groupedNames);

        // Tính toán vị trí mới của từng thẻ <li> và tạo animation mượt mà
        document.querySelectorAll('.performer-item').forEach((item) => {
            const name = item.dataset.name;
            const newPosition = item.getBoundingClientRect().top;
            const oldPosition = currentPositions[name];

            // Nếu có sự thay đổi vị trí, áp dụng hiệu ứng di chuyển
            if (oldPosition !== undefined) {
                anime({
                    targets: item,
                    translateY: [oldPosition - newPosition, 0], // Di chuyển từ vị trí cũ đến vị trí mới
                    duration: 1000,
                    easing: 'easeOutExpo'
                });
            } else {
                // Đối với các phần tử mới, làm hiệu ứng mờ dần vào
                anime({
                    targets: item,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 1000,
                    easing: 'easeOutExpo'
                });
            }
        });

        console.log(groupedNames);
    });
}

getCount();



