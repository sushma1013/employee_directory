let employees = [...mockEmployees];
let currentEditId = null;

// DOM elements
const listContainer = document.getElementById("employee-list");
const formSection = document.getElementById("form-section");
const form = document.getElementById("employee-form");
const addBtn = document.getElementById("add-btn");
const cancelBtn = document.getElementById("cancel-btn");
const saveBtn = document.getElementById("save-btn");

const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const limitSelect = document.getElementById("limit");

// Render employees
function render() {
  listContainer.innerHTML = "";

  let data = [...employees];

  // Search
  const query = searchInput.value.toLowerCase();
  if (query) {
    data = data.filter(emp =>
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query)
    );
  }

  // Sort
  const sortKey = sortSelect.value;
  if (sortKey) {
    data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }

  // Limit
  const limit = parseInt(limitSelect.value);
  data = data.slice(0, limit);

  // Render cards
  data.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <strong>${emp.firstName} ${emp.lastName}</strong><br>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button class="edit-btn" data-id="${emp.id}">Edit</button>
      <button class="delete-btn" data-id="${emp.id}">Delete</button>
    `;
    listContainer.appendChild(card);
  });

  addEventListeners();
}

function addEventListeners() {
  document.querySelectorAll(".delete-btn").forEach(btn =>
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      employees = employees.filter(e => e.id !== id);
      render();
    })
  );

  document.querySelectorAll(".edit-btn").forEach(btn =>
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const emp = employees.find(e => e.id === id);
      if (emp) {
        currentEditId = id;
        document.getElementById("form-title").textContent = "Edit Employee";
        formSection.classList.remove("hidden");
        form["first-name"].value = emp.firstName;
        form["last-name"].value = emp.lastName;
        form["email"].value = emp.email;
        form["department"].value = emp.department;
        form["role"].value = emp.role;
      }
    })
  );
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const firstName = form["first-name"].value.trim();
  const lastName = form["last-name"].value.trim();
  const email = form["email"].value.trim();
  const department = form["department"].value.trim();
  const role = form["role"].value.trim();

  if (!firstName || !lastName || !email || !department || !role) {
    alert("All fields are required!");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Invalid email format!");
    return;
  }

  const empData = { id: currentEditId || Date.now(), firstName, lastName, email, department, role };

  if (currentEditId) {
    employees = employees.map(e => (e.id === currentEditId ? empData : e));
  } else {
    employees.push(empData);
  }

  currentEditId = null;
  form.reset();
  formSection.classList.add("hidden");
  render();
});

addBtn.addEventListener("click", () => {
  currentEditId = null;
  form.reset();
  document.getElementById("form-title").textContent = "Add Employee";
  formSection.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  form.reset();
  formSection.classList.add("hidden");
});

searchInput.addEventListener("input", render);
sortSelect.addEventListener("change", render);
limitSelect.addEventListener("change", render);

window.onload = render;
