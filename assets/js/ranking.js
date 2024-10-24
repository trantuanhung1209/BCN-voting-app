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

let ids = [];
let datas = [];
onValue(performancesRef, (snapshot) => {
    snapshot.forEach((item) => {
        const key = item.key;
        const data = item.val();
        ids.push(key);
        datas.push(data.namePerformance);
    });

    // Call groupDuplicates here after datas has been populated
    const groupedNames = groupDuplicates(datas).sort((a, b) => b.count - a.count);

    const listPerformer = document.querySelector("[list-performer]");

    const htmls = [];

    // Build the HTML content for each performer
    groupedNames.forEach(item => {
        console.log(item.name);
        console.log(item.count);

        // Append each performer name and count to the htmls array
        const elementLi = `<li>
        <form action="#" class="main__box-content--form">
            <label for="sigle1">
                ${item.name}
            </label>
            <label class = "quantity-vote" for="#">${item.count}</label>
        </form>
    </li>`;

        htmls.push(elementLi);
    });

    // Join the htmls array and insert into the list-performer element
    listPerformer.innerHTML = htmls.join('');
});
