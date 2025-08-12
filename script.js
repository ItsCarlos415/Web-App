"use strict";

async function getAllRecords() {
  let getResultElement = document.getElementById("Restaurants");
  let dropdown = document.getElementById("restaurantDropdown");

  const options = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer patfEJjmGd4egCkYT.ad361792ce913f19954a8150fbacdf0e717d16b069ff67e53b2a820af838b479",
    },
  };

  await fetch("https://api.airtable.com/v0/app3ztynCnkXsjtRL/Data", options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      getResultElement.innerHTML = "";
      dropdown.innerHTML = "";

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let record = data.records[i];
        let fields = record.fields;

        let logo = fields["Images"];
        let name = fields["Name"];
        let phone = fields["Phone"];
        let location = fields["Location"];
        let description = fields["Description"];
        let hours = fields["Hours"];
        let reviews = fields["Reviews"];
        let eats = fields["Eats"];
        let favmeal = fields["FavMeal"];
        let website = fields["Website"] || "";

        let anchorId = name.replace(/\s+/g, "-").toLowerCase();

        // Add to dropdown
        dropdown.innerHTML += `<li><a class="dropdown-item" href="#${anchorId}">${name}</a></li>`;

        newHtml += `
          <div class="col-sm-12 col-md-6 col-lg-4 mb-4" id="${anchorId}">
            <div class="card h-100">
              ${
                logo
                  ? `<img class="card-img-top img-fluid rounded" alt="${name}" src="${logo[0].url}">`
                  : ``
              }
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">
                  <a href="${website}" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-primary">
                    ${name}
                  </a>
                </h5>
                <h6>📲 Phone: ${phone || "N/A"}</h6>
                <h6>${location || ""}</h6>
                <p><strong>Description:</strong> ${description || ""}</p>
                <p>🕰️ Hours: ${hours || ""}</p>
                <p>⭐ Reviews: ${reviews || ""}</p>
                <p> 😋 Eats: ${eats || ""}</p>
                <p>😁 Favorite Meal: ${favmeal || ""}</p>
                <div class="mt-auto d-flex justify-content-between">
                  <a href="index.html?id=${record.id}" class="btn btn-primary">View Details</a>
                  ${
                    website
                      ? `<a href="${website}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary">Visit Website</a>`
                      : ""
                  }
                </div>
              </div>
            </div>
          </div>
        `;
      }

      getResultElement.innerHTML = newHtml;
    })
    .catch((error) => {
      console.error("Error fetching records:", error);
      getResultElement.innerHTML = "<p>Failed to load data. Please try again later.</p>";
    });
}

async function getOneRecord(id) {
  const getResultElement = document.getElementById("Restaurants");

  const options = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer patfEJjmGd4egCkYT.ad361792ce913f19954a8150fbacdf0e717d16b069ff67e53b2a820af838b479",
    },
  };

  const response = await fetch(
    `https://api.airtable.com/v0/app3ztynCnkXsjtRL/Data/${id}`,
    options
  );
  const data = await response.json();
  const fields = data.fields;

  getResultElement.innerHTML = `
    <div class="card detail-card">
      <div class="card-body">
        <h5 class="card-title">${fields["Name"]}</h5>
        ${
          fields["Images"]
            ? `<img class="card-img-top rounded" src="${fields["Images"][0].url}">`
            : ""
        }
        <p>${fields["Description"]}</p>
        <p> 📍 Location: ${fields["Location"]}</p>
        <p> 📲 phone: ${fields["Phone"]}</p>
        <p> 🕰️ Hours: ${fields["Hours"]}</p>
        <p> ⭐️ Reviews: ${fields["Reviews"]}</p>
        <p> 🍽️ Eats: ${fields["Eats"]}</p>
        <p> 😋 Favorite Meal: ${fields["FavMeal"]}</p>
        ${
          fields["Website"]
            ? `<a href="${fields["Website"]}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary mt-3 me-2">Visit Website</a>`
            : ""
        }
        <a href="index.html" class="btn btn-secondary mt-3">Back to List</a>
      </div>
    </div>
  `;
}

let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]);
} else {
  getAllRecords();
}