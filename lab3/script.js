const weights = [3, 10, 1, 4, 9, 7];
const values = [7, 15, 15, 11, 12, 12];
const n = weights.length;
const W = 18;

let dp = [];
for (let i = 0; i <= n; i++) {
    dp[i] = [];

    for (let w = 0; w <= W; w++) {
        dp[i][w] = 0;
    }
}
let currentI = 1, currentW = 0;

const table = document.getElementById("table");
const displayMaxValue = document.getElementById("maxValue");

function createTable() {
    table.innerHTML = '';
    const headerRow = document.createElement("tr");
    const cellWithNamesOfValues = document.createElement("th");
    cellWithNamesOfValues.textContent = "i\\w";
    headerRow.appendChild(cellWithNamesOfValues);

    for (let w = 0; w <= W; w++) {
        const th = document.createElement("th");
        th.textContent = w;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (let i = 0; i <= n; i++) {
        const row = document.createElement("tr");
        const numberingObjectsRow = document.createElement("th");
        numberingObjectsRow.textContent = i;
        row.appendChild(numberingObjectsRow);

        for (let w = 0; w <= W; w++) {
            const cell = document.createElement("td");
            cell.textContent = dp[i][w];
            if (i === currentI && w === currentW) {
                cell.classList.add("mark")
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    if (currentI > n) {
        displayMaxValue.textContent = `Максимальна цінність: ${dp[n][W]}`;
    }
}

function fillTableStep() {
    if (currentI > n) {
        return;
    }

    const i = currentI, w = currentW;
    if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
    } else {
        dp[i][w] = dp[i - 1][w];
    }

    currentW++;
    if (currentW > W) {
        currentW = 0;
        currentI++;
    }
    createTable();

    const selected = getSelectedItems();
    let selectedItemsText = '';
    for (let i = 0; i < selected.length; i++) {
        selectedItemsText += (selected[i]) + (i < selected.length - 1 ? ', ' : '');
    }
    document.getElementById("selectedItems").textContent = `Обрані предмети: ${selectedItemsText}`;
}

createTable();

function fillTableAll() {
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    currentI = n + 1;
    currentW = 0;
    createTable();

    const selected = getSelectedItems();
    let selectedItemsText = '';
    for (let i = 0; i < selected.length; i++) {
        selectedItemsText += (selected[i]) + (i < selected.length - 1 ? ', ' : '');
    }
    document.getElementById("selectedItems").textContent = `Обрані предмети: ${selectedItemsText}`;
}

function clearTable() {
    for (let i = 0; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            dp[i][w] = 0;
        }
    }
    currentI = 1;
    currentW = 0;
    displayMaxValue.textContent = "";
    document.getElementById("selectedItems").textContent = "";
    createTable();
}

function getSelectedItems() {
    let selected = [];
    let w = W;
    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selected.push(i);
            w -= weights[i - 1];
        }
    }
    return selected.reverse();
}
