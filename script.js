"use strict";

// Fetch all records
async function getAllRecords() {
  const getResultElement = document.getElementById("Restaurants");
  const dropdown = document.getElementById("restaurantDropdown");
  const options = {
    method: "GET",
    headers: { Authorization: "Bearer patfEJjmGd4egCkYT.ad361792ce913f19954a8150fbacdf0e717d16b069ff67e53b2a820af838b479" },
  };

  try {
    const response = await fetch("https://api.airtable.com/v0/app3ztynCnkXsjtRL/Data", options);
    const data = await response.json();

    getResultElement.innerHTML = "";
    dropdown.innerHTML = "";

    data.records.forEach((record) => {
      const fields = record.fields;
      const anchorId = fields.Name.replace(/\s+/g, "-").toLowerCase();
      dropdown.innerHTML += `<li><a class="dropdown-item" href="#${anchorId}">${fields.Name}</a></li>`;
      getResultElement.innerHTML += `
        <div class="col-sm-12 col-md-6 col-lg-4" id="${anchorId}">
          <div class="card h-100">
            ${fields.Images ? `<div class="card-img-container"><img src="${fields.Images[0].url}" alt="${fields.Name}"><h5>${fields.Name}</h5></div>` : `<h5 class="p-3">${fields.Name}</h5>`}
            <div class="card-body d-flex flex-column">
              <h6>📲 ${fields.Phone || "N/A"}</h6>
              <h6>📍 ${fields.Location || ""}</h6>
              <p><strong>Description:</strong> ${fields.Description || ""}</p>
              <p>🕰️ ${fields.Hours || ""}</p>
              <p>⭐ ${fields.Reviews || ""}</p>
              <p>😋 ${fields.Eats || ""}</p>
              <p>🍽️ ${fields.FavMeal || ""}</p>
              <div class="mt-auto d-flex justify-content-between">
                <a href="index.html?id=${record.id}" class="btn btn-primary">View Details</a>
                ${fields.Website ? `<a href="${fields.Website}" target="_blank" class="btn btn-outline-secondary">Website</a>` : ""}
              </div>
            </div>
          </div>
        </div>`;
    });
  } catch (err) {
    console.error("Error fetching records:", err);
    getResultElement.innerHTML = "<p class='text-danger'>Failed to load data. Please try again later.</p>";
  }
}

// Fetch one record
async function getOneRecord(id) {
  const getResultElement = document.getElementById("Restaurants");
  const options = { method: "GET", headers: { Authorization: "Bearer patfEJjmGd4egCkYT.ad361792ce913f19954a8150fbacdf0e717d16b069ff67e53b2a820af838b479" } };
  const response = await fetch(`https://api.airtable.com/v0/app3ztynCnkXsjtRL/Data/${id}`, options);
  const f = (await response.json()).fields;

  getResultElement.innerHTML = `
    <div class="card detail-card">
      ${f.Images ? `<img src="${f.Images[0].url}" alt="${f.Name}">` : ""}
      <div class="card-body">
        <h3>${f.Name}</h3>
        <p>${f.Description}</p>
        <p>📍 ${f.Location}</p>
        <p>📲 ${f.Phone}</p>
        <p>🕰️ ${f.Hours}</p>
        <p>⭐ ${f.Reviews}</p>
        <p>😋 ${f.Eats}</p>
        <p>🍽️ ${f.FavMeal}</p>
        ${f.Website ? `<a href="${f.Website}" target="_blank" class="btn btn-outline-primary me-2 mt-2">Visit Website</a>` : ""}
        <a href="index.html" class="btn btn-secondary mt-2">Back</a>
      </div>
    </div>
  `;
}

// Load records
const idParams = window.location.search.split("?id=");
if (idParams.length >= 2) getOneRecord(idParams[1]);
else getAllRecords();

// Theme toggle (navbar)
const themeToggleBtn = document.getElementById("themeToggle");
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    themeToggleBtn.textContent = "☀️ Light Mode";
    themeToggleBtn.classList.replace("btn-outline-light","btn-outline-warning");
  } else {
    themeToggleBtn.textContent = "🌙 Dark Mode";
    themeToggleBtn.classList.replace("btn-outline-warning","btn-outline-light");
  }
});

// Splash theme toggle
const splashThemeBtn = document.getElementById("splashThemeToggle");
splashThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    splashThemeBtn.textContent = "☀️ Light Mode";
    splashThemeBtn.classList.replace("btn-outline-light","btn-outline-warning");
  } else {
    splashThemeBtn.textContent = "🌙 Dark Mode";
    splashThemeBtn.classList.replace("btn-outline-warning","btn-outline-light");
  }
});

// Enter splash
document.getElementById("enterBtn").addEventListener("click", () => {
  const splash = document.getElementById("splash");
  splash.style.transition = "opacity 0.8s";
  splash.style.opacity = 0;
  setTimeout(() => {
    splash.style.display = "none";
    document.querySelector("nav.navbar").style.display = "flex";
    document.getElementById("mainContent").style.display = "block";
  }, 800);
});