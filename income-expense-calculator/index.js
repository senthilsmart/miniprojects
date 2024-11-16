const $description = document.getElementById("description");
const $amount = document.getElementById("amount");
const $type = document.getElementById("type");
const $submit = document.getElementById("add-btn");
const $filter = document.getElementById("filter-type");

const $entries = document.getElementById("list");
const $totalIncome = document.getElementById("tot-income");
const $totalExpense = document.getElementById("tot-expense");
const $balance = document.getElementById("balance");

let list = [];
let filterType = "all";

// Initialize the app by loading entries from localStorage
function initLocalStorage() {
  const storedEntries = localStorage.getItem("entries");
  list = storedEntries ? JSON.parse(storedEntries) : [];
  fetchEntries();
}

// Save entries to localStorage
function saveToLocalStorage() {
  localStorage.setItem("entries", JSON.stringify(list));
}

$submit.addEventListener("click", () => {
  const description = $description.value.trim();
  const amount = parseFloat($amount.value);
  const type = $type.value;

  if (!description || isNaN(amount) || amount <= 0) {
    alert("Please enter valid details for income/expense");
    return;
  }

  const entry = {
    id: Date.now(),
    description,
    amount,
    type,
  };

  list.push(entry);
  saveToLocalStorage();
  fetchEntries();
  clearForm();
});

const fetchEntries = () => {
  $entries.innerHTML = "";
  let totalIncome = 0;
  let totalExpense = 0;

  const filteredEntries =
    filterType === "all"
      ? list
      : list.filter((item) => item.type === filterType);

  filteredEntries.forEach((item) => {
    const $item = document.createElement("li");

    $item.classList.add(item.type);
    $item.innerHTML = `
      <span>${item.description} - ${item.amount.toFixed(2)}</span>
      <div>
        <button onclick="editItem(${item.id})">Edit</button>
        <button onclick="deleteItem(${item.id})">Delete</button>
      </div>
    `;

    $entries.appendChild($item);

    if (item.type === "income") {
      totalIncome += item.amount;
    } else {
      totalExpense += item.amount;
    }

    $totalIncome.textContent = totalIncome.toFixed(2);
    $totalExpense.textContent = totalExpense.toFixed(2);
    $balance.textContent = (totalIncome - totalExpense).toFixed(2);
  });
};

const clearForm = () => {
  $description.value = "";
  $amount.value = "";
  $type.value = "income";
};

const editItem = (id) => {
  const item = list.find((li) => li.id === id);

  if (!item) {
    return;
  }

  $description.value = item.description;
  $amount.value = item.amount;
  $type.value = item.type;

  deleteItem(id);
};

const deleteItem = (id) => {
  list = list.filter((entry) => entry.id !== id);
  saveToLocalStorage();
  fetchEntries();
};

// Handle filter type change
$filter.addEventListener("change", (e) => {
  filterType = e.target.value;
  fetchEntries();
});

initLocalStorage();
