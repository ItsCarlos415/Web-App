"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("Restaurants");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patfEJjmGd4egCkYT.ad361792ce913f19954a8150fbacdf0e717d16b069ff67e53b2a820af838b479`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/app3ztynCnkXsjtRL/Data`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let logo = data.records[i].fields["Logo"]; // here we are getting column values
        let name = data.records[i].fields["Name"]; //here we are using the Field ID to fecth the name property
        let neighborhood = data.records[i].fields["Neighborhood"];
        let phone = data.records[i].fields["Phone"];
        let location = data.records[i].fields["Location"];
        let description = data.records[i].fields["Description"]
        let hours = data.records[i].fields["Hours"];
        let reviews = data.records[i].fields["Reviews"];
        let eats = data.records[i].fields["Eats"]; 
        let favmeal = data.records[i].fields["FavMeal"];
        

        newHtml += `
        
        <div class="card" style="width: 18rem;">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6>${phone}</h6>
            <h6>${location}</h6>
            <h7> Description: ${description}</h7><br></br>
            <p>${hours} 🕰️</p>
            <p>Star Reviews: ${reviews} ⭐️</p>
            <h7> ${eats}</h7>
            <p> Favorite Meal: ${favmeal} 😁</p>
            
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
    
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

 getAllRecords(); // no id given, fetch summaries