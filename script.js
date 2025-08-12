"use strict";

const airtableApiKey = "patfEJjmGd4egCkYT.ad361792ce913f19954a8150fbacdf0e717d16b069ff67e53b2a820af838b479";
const airtableBaseId = "app3ztynCnkXsjtRL";
const airtableTableName = "Data";

const container = document.getElementById("Restaurants");
const dropdown = document.getElementById("restaurantDropdown");

// Fetch all records from Airtable
async function fetchAllRecords() {
  const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${airtableApiKey}` },
  };
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data.records;
}

// Fetch one record by ID
async function fetchRecordById(id) {
  const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}/${id}`;
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${airtableApiKey}` },
  };
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data;
}

// Render list of cards + populate dropdown
function renderList(records) {
  container.innerHTML = "";
  dropdown.innerHTML = "";

  records.forEach(record => {
    const f = record.fields;

    // Cards
    const cardHTML = `
      <div class="col-md-4 mb-4">
        <div class="card" style="width: 100%;">
          ${
            f.Images && f.Images.length > 0
              ? `<img src="${f.Images[0].url}" alt="${f.Name}" class="card-img-top rounded" />`
              : ""
          }
          <div class="card-body">
            <h5 class="card-title">${f.Name}</h5>
            <h6>Phone Number: ${f.Phone} 📲</h6>
            <h6>${f.Location}</h6>
            <p>Description: ${f.Description}</p>
            <p>Hours: ${f.Hours} 🕰️</p>
            <p>Star Reviews: ${f.Reviews} ⭐️</p>
            <p>Eats: ${f.Eats} 🍽️</p>
            <p>Favorite Meal: ${f.FavMeal} 😁</p>
            <a href="index.html?id=${record.id}" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", cardHTML);

    // Dropdown
    const li = document.createElement("li");
    li.innerHTML = `<a class="dropdown-item" href="index.html?id=${record.id}">${f.Name}</a>`;
    dropdown.appendChild(li);
  });
}

// Render single record details
function renderDetails(record) {
  container.innerHTML = "";

  const f = record.fields;

  const detailHTML = `
    <div class="detail-card card">
      ${
        f.Images && f.Images.length > 0
          ? `<img src="${f.Images[0].url}" alt="${f.Name}" class="card-img-top rounded" />`
          : ""
      }
      <div class="card-body">
        <h3 class="card-title">${f.Name}</h3>
        <h5>Phone Number: ${f.Phone} 📲</h5>
        <h5>${f.Location}</h5>
        <p><strong>Description:</strong> ${f.Description}</p>
        <p><strong>Hours:</strong> ${f.Hours} 🕰️</p>
        <p><strong>Star Reviews:</strong> ${f.Reviews} ⭐️</p>
        <p><strong>Eats:</strong> ${f.Eats} 🍽️</p>
        <p><strong>Favorite Meal:</strong> ${f.FavMeal} 😁</p>
        <a href="index.html" class="btn btn-secondary mt-3">Back to list</a>
      </div>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", detailHTML);
}

// Main function to control what to show
async function main() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
      // Show single record detail
      const record = await fetchRecordById(id);
      renderDetails(record);
      // Also load all records to populate dropdown
      const allRecords = await fetchAllRecords();
      dropdown.innerHTML = "";
      allRecords.forEach(r => {
        const li = document.createElement("li");
        li.innerHTML = `<a class="dropdown-item" href="index.html?id=${r.id}">${r.fields.Name}</a>`;
        dropdown.appendChild(li);
      });
    } else {
      // Show all records list
      const records = await fetchAllRecords();
      renderList(records);
    }
  } catch (error) {
    container.innerHTML = `<p class="text-danger">Error loading data: ${error.message}</p>`;
    console.error(error);
  }
}

main();