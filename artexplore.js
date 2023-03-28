
//if a category button is selected only art from that category pops up(filtering system)

// Define the API endpoint
const endpoint = "https://collectionapi.metmuseum.org/public/collection/v1/search";

// Get the category preferences from the user
const categoryA = document.querySelectorAll(".categories__h6")[0].textContent;
const categoryB = document.querySelectorAll(".categories__h6")[1].textContent;

// Construct the API query string based on the category preferences
const queryString = `q=${categoryA}+${categoryB}`;

// Send the API request using fetch
fetch(`${endpoint}?${queryString}`)
  .then(response => response.json())
  .then(data => {
    // Choose a random artwork from the API response
    const artworkId = data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];
    
    // Fetch the details of the chosen artwork using its ID
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkId}`);
  })
  .then(response => response.json())
  .then(data => {
    // Update the UI with the details of the recommended artwork
    document.querySelector(".art img").src = data.primaryImage;
    document.querySelector(".title__name").textContent = data.title;
    document.querySelector(".artist__name").textContent = data.artistDisplayName;
    document.querySelector(".year").textContent = data.objectDate;
  })
  .catch(error => {
    console.error(error);
  });

  //create a function called isGenerated where API generates certain images given specific categories passed 

