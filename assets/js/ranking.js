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

onValue(performancesRef, (snapshot) => {
    let ids = [];
    let datas = [];

    snapshot.forEach((item) => {
        const key = item.key;
        const data = item.val();
        ids.push(key);
        datas.push(data.namePerformance);
    });

    // Group duplicates and sort by count
    const groupedNames = groupDuplicates(datas).sort((a, b) => b.count - a.count);

    const listPerformer = document.querySelector("[list-performer]");

    // Lưu trữ vị trí hiện tại của từng thẻ <li> trước khi cập nhật
    const currentPositions = {};
    document.querySelectorAll('.performer-item').forEach((item, index) => {
        currentPositions[item.dataset.name] = item.getBoundingClientRect().top;
    });

    // Cập nhật HTML với dữ liệu mới
    const htmls = groupedNames.map(item => `
        <li class="performer-item" data-name="${item.name}">
            <form action="#" class="main__box-content--form">
                <label>${item.name}</label>
                <label class="quantity-vote">${(((item.count) / ids.length) * 100 ).toFixed(2) >= 100 ? 100 : (((item.count) / ids.length) * 100 ).toFixed(2) }% </label>
            </form>
        </li>
    `).join('');

    listPerformer.innerHTML = htmls;

    console.log(ids.length);

    

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



