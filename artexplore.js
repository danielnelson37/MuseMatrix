
const artTitle = document.querySelector(".artwork-title");
const artArtist = document.querySelector(".artwork-artist");
const artYear = document.querySelector(".artwork-year");
const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/`;
const artImage = document.querySelector(".card-img-top");
console.log(artImage);


////////////////////////////////////// DOM LOADED //////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  // Fetch artworks from the API-only want to get objects with primary images
fetch(`${API_URL}objects?q=hasImages=true`)
.then(response => response.json())
.then(data => {
  console.log(`Artworks:`, data);
  // Choose 5 random artworks from the response
  const randomArtworks = [];
  for (let i = 0; i < 25; i++) {
    const randomIndex = Math.floor(Math.random() * data.objectIDs.length);
    const objectId = data.objectIDs[randomIndex];
    randomArtworks.push(objectId);
  }
  console.log(`Random Artworks:`, randomArtworks);


  // Fetch the details of the random artworks using their object IDs
  Promise.all(randomArtworks.map(objectId =>
    fetch(`${API_URL}objects/${objectId}`)
      .then(response => response.json())))
      .then(artworks => {
        console.log(`Random Artworks Details:`, artworks);
      // Update the UI with the random artworks as per your implementation
      //set UI for the first slide
       artTitle.textContent = artworks[0].title;
       artArtist.textContent = 'Artist:' + artworks[0].artistDisplayName;
       if(!artworks[0].artistDisplayName){
        artArtist.textContent = 'Artist: Not available';
      }
       artYear.textContent = 'Year:' + artworks[0].year;
       if(!artworks[0].year){
         artYear.textContent = 'Year: Not available';
       }
       artImage.setAttribute("src",`${artworks[0].primaryImageSmall}`);
       const carouselInner = document.querySelector('.carousel-inner');
   
// Loop through the saved artworks and create a card element for each one
for (let i = 1; i < artworks.length; i++) {
    // Create the carousel item element - replace class "card" with class "carousel-item"
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    //carouselItem.style.width = '18em';
 
    // Create the card element
    let card = document.createElement("div");
    card.classList.add("card");
    //set style to width: 18em


      // Create the image element
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("src", artworks[i].primaryImageSmall);//generates the images
    img.setAttribute("alt", artworks[i].title);


    // Create the card body element
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");


    // Create the card text element
    let cardText = document.createElement("div");
    cardText.classList.add("card-text");


    //Create the content element
    let content = document.createElement("div");
    content.classList.add("content");
 
    // Create the title element
    let title = document.createElement("h2");
    title.classList.add("artwork-title");
    title.innerText = artworks[i].title;
 
    // Create the artist element
    let artist = document.createElement("h5");
    artist.classList.add("artwork-artist");
    artist.innerText = "Artist: " + artworks[i].artistDisplayName;
    if(!artworks[i].artistDisplayName){
      artist.innerText = "Artist: Not available";
    }
 
    // Create the year element
    let year = document.createElement("h5");
    year.classList.add("artwork-year");
    year.innerText = "Year: " + artworks[i].year;
    if(!artworks[i].year){
        year.innerText = "Year: Not available";
      }


    // Create button element
    let button = document.createElement("button");
    button.classList.add("like-button");
    button.innerText = "Like";
   
    //set attribute to label button "like"
 
    // Append the image, title, artist, medium, and year elements to the card body element
    card.appendChild(img);
    content.appendChild(title);
    content.appendChild(artist);
    content.appendChild(year);
    content.appendChild(button);


    //Apphend content to the card-text element
    cardText.appendChild(content);


    //Apphend card-text to the card-body element
    cardBody.appendChild(cardText);
 
    //Apphend the card body element to the card element
    card.appendChild(cardBody);


    // Append the card body element to the carousel-item element
    carouselItem.appendChild(card);
 
    // Append the card element to the inner carousel element
    carouselInner.appendChild(carouselItem);
  }


//iterate through all carousel-items and attach an event listener to each like button


const cards = document.querySelectorAll('.card');
const savedArt = localStorage.getItem('savedArt');
let artDetailsArray = [];


cards.forEach(card => {
  const likeButton = card.querySelector('.like-button');
  likeButton.addEventListener('click', () => {
       console.log('clicked');
 
    const artDetails = {
      title: card.querySelector('.artwork-title').textContent,
      artist: card.querySelector('.artwork-artist').textContent,
      imageUrl: card.querySelector('.card-img-top').getAttribute('src'),
      year: card.querySelector('.artwork-year').textContent,
      //content: card.querySelector('.content').textContent
    };
    artDetailsArray.push(artDetails);
    localStorage.setItem('savedArt', JSON.stringify(artDetailsArray));
console.log('artDetailsArray', artDetailsArray);


});
});


    })
    .catch(error => console.log(`Error fetching artwork details: ${error}`));
})
.catch(error => console.log(`Error fetching artworks: ${error}`));
})




/////////////////////////////////////////// SEARCH ENGINE ////////////////////////////////////////////
//create an event listener for the search form, so when users type in their search term it'll fetch matching data from the API and update the UI
//Could use a bit more work to get the search term to produce accurate matches 100% of the time
const searchForm = document.querySelector(".searchForm");
const searchInput = document.querySelector("#answer");


 console.log(searchForm);
 searchForm.addEventListener("submit", (event) => {
   event.preventDefault();
  const searchTerm =  searchInput.value;
   console.log(searchTerm); //console.log the search term
   fetch(`${API_URL}search?q=${searchTerm}&hasImages=true`)
   .then(response => response.json())
   .then(data => {
     console.log(`Artworks:`, data);


      // Choose 5 random artworks from the response
  const randomArtworks = [];
  for (let i = 0; i < 25; i++) {
    const randomIndex = Math.floor(Math.random() * data.objectIDs.length);
    const objectId = data.objectIDs[randomIndex];
    randomArtworks.push(objectId);
  }
  console.log(`Random Artworks:`, randomArtworks);


  // Fetch the details of the random artworks using their object IDs
  Promise.all(randomArtworks.map(objectId =>
    fetch(`${API_URL}objects/${objectId}`)
      .then(response => response.json())))
      .then(artworks => {
        console.log(`Random Artworks Details:`, artworks);
        artTitle.textContent = artworks[0].title;
        artArtist.textContent = 'Artist:' + artworks[0].artistDisplayName;
        if(!artworks[0].artistDisplayName){
         artArtist.textContent = 'Artist: Not available';
       }
        artYear.textContent = 'Year:' + artworks[0].year;
        if(!artworks[0].year){
          artYear.textContent = 'Year: Not available';
        }
        artImage.setAttribute("src",`${artworks[0].primaryImageSmall}`);
       const carouselInner = document.querySelector('.carousel-inner');
     
 // Loop through the saved artworks and create a card element for each one
 for (let i = 1; i < artworks.length; i++) {
     // Create the carousel item element - replace class "card" with class "carousel-item"
     let carouselItem = document.createElement("div");
     carouselItem.classList.add("carousel-item");
     //carouselItem.style.width = '18em';
   
     // Create the card element
     let card = document.createElement("div");
     card.classList.add("card");
     //set style to width: 18em
 
       // Create the image element
       let img = document.createElement("img");
       img.classList.add("card-img-top");
       img.setAttribute("src", artworks[i].primaryImageSmall);//generates the images
       img.setAttribute("alt", artworks[i].title);
 
     // Create the card body element
     let cardBody = document.createElement("div");
     cardBody.classList.add("card-body");
 
     // Create the card text element
     let cardText = document.createElement("div");
     cardText.classList.add("card-text");
 
     //Create the content element
     let content = document.createElement("div");
     content.classList.add("content");
   
     // Create the title element
     let title = document.createElement("h2");
     title.classList.add("artwork-title");
     title.innerText = artworks[i].title;
   
     // Create the artist element
     let artist = document.createElement("h5");
     artist.classList.add("artwork-artist");
     artist.innerText = "Artist: " + artworks[i].artistDisplayName;
     if(!artworks[i].artistDisplayName){
       artist.innerText = "Artist: Not available";
     }
   
     // Create the year element
     let year = document.createElement("h5");
     year.classList.add("artwork-year");
     year.innerText = "Year: " + artworks[i].year;
     if(!artworks[i].year){
         year.innerText = "Year: Not available";
       }
 
     // Create button element
     let button = document.createElement("button");
     button.classList.add("like-button");
     button.innerText = "Like";
     
     //set attribute to label button "like"
   
     // Append the image, title, artist, medium, and year elements to the card body element
     card.appendChild(img);
     content.appendChild(title);
     content.appendChild(artist);
     content.appendChild(year);
     content.appendChild(button);
 
     //Apphend content to the card-text element
     cardText.appendChild(content);
 
     //Apphend card-text to the card-body element
     cardBody.appendChild(cardText);
   
     //Apphend the card body element to the card element
     card.appendChild(cardBody);
 
     // Append the card body element to the carousel-item element
     carouselItem.appendChild(card);
   
     // Append the card element to the inner carousel element
     carouselInner.appendChild(carouselItem);
   }
 
 //iterate through all carousel-items and attach an event listener to each like button
 
 ///still an issue with the first card
 const cards = document.querySelectorAll('.card');
 const savedArt = localStorage.getItem('savedArt');
 let artDetailsArray = [];
 
 cards.forEach(card => {
   const likeButton = card.querySelector('.like-button');
   likeButton.addEventListener('click', () => {
        console.log('clicked');
   
     const artDetails = {
       title: card.querySelector('.artwork-title').textContent,
       artist: card.querySelector('.artwork-artist').textContent,
       imageUrl: card.querySelector('.card-img-top').getAttribute('src'),
       year: card.querySelector('.artwork-year').textContent,
       //content: card.querySelector('.content').textContent
     };
     artDetailsArray.push(artDetails);
     localStorage.setItem('savedArt', JSON.stringify(artDetailsArray));
 console.log('artDetailsArray', artDetailsArray);
 
 });
 });


     
    })
   })
   .catch(error => console.log(`Error fetching artworks: ${error}`));
 })


 //next step is to get those artwork details from the API and update the UI


/////////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////// CATEGORY GENERATOR //////////////////////////////////////////////////////////////////////////////////
//create an event listener for the buttons in the categories, so users select a certain category it'll add those catgerories to an array and then fetch matching data from the API from only the selected category and update the UI
const boxes = document.querySelectorAll('.box__item');
const generateButton = document.querySelector('.generate');


let queries = []; // Initialize queries array


// Add event listeners to each box item, every time a box item is clicked, add the clicked item to the array
boxes.forEach(function(box) {
  box.addEventListener('click', function(event) {
    box.classList.toggle('active');
    const query = event.target.innerText;
    console.log(query);
    if (!queries.includes(query)) {
      queries.push(query);
    }
    console.log(queries);
  });
});


// Add event listener to generate button
 generateButton.addEventListener('click', function(event) {
 
   const queryStr = queries.join('&');
   event.preventDefault();
   
   console.log(queryStr);
   const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${queryStr}`;
   fetch(url)
     .then(response => response.json())
     .then(data => {
      console.log(`Artworks:`, data);


      // Choose 5 random artworks from the response
  const randomArtworks = [];
  for (let i = 0; i < 25; i++) {
    const randomIndex = Math.floor(Math.random() * data.objectIDs.length);
    const objectId = data.objectIDs[randomIndex];
    randomArtworks.push(objectId);
  }
  console.log(`Random Artworks:`, randomArtworks);


  // Fetch the details of the random artworks using their object IDs
  Promise.all(randomArtworks.map(objectId =>
    fetch(`${API_URL}objects/${objectId}`)
      .then(response => response.json())))
      .then(artworks => {
        console.log(`Random Artworks Details:`, artworks);
        artTitle.textContent = artworks[0].title;
        artArtist.textContent = 'Artist:' + artworks[0].artistDisplayName;
        if(!artworks[0].artistDisplayName){
         artArtist.textContent = 'Artist: Not available';
       }
        artYear.textContent = 'Year:' + artworks[0].year;
        if(!artworks[0].year){
          artYear.textContent = 'Year: Not available';
        }
        artImage.setAttribute("src",`${artworks[0].primaryImageSmall}`);
       const carouselInner = document.querySelector('.carousel-inner');
     
 // Loop through the saved artworks and create a card element for each one
 for (let i = 1; i < artworks.length; i++) {
     // Create the carousel item element - replace class "card" with class "carousel-item"
     let carouselItem = document.createElement("div");
     carouselItem.classList.add("carousel-item");
   
     // Create the card element
     let card = document.createElement("div");
     card.classList.add("card");
     //set style to width: 18em
 
       // Create the image element
       let img = document.createElement("img");
       img.classList.add("card-img-top");
       img.setAttribute("src", artworks[i].primaryImageSmall);//generates the images
       img.setAttribute("alt", artworks[i].title);
 
     // Create the card body element
     let cardBody = document.createElement("div");
     cardBody.classList.add("card-body");
 
     // Create the card text element
     let cardText = document.createElement("div");
     cardText.classList.add("card-text");
 
     //Create the content element
     let content = document.createElement("div");
     content.classList.add("content");
   
     // Create the title element
     let title = document.createElement("h2");
     title.classList.add("artwork-title");
     title.innerText = artworks[i].title;
   
     // Create the artist element
     let artist = document.createElement("h5");
     artist.classList.add("artwork-artist");
     artist.innerText = "Artist: " + artworks[i].artistDisplayName;
     if(!artworks[i].artistDisplayName){
       artist.innerText = "Artist: Not available";
     }
   
     // Create the year element
     let year = document.createElement("h5");
     year.classList.add("artwork-year");
     year.innerText = "Year: " + artworks[i].year;
     if(!artworks[i].year){
         year.innerText = "Year: Not available";
       }
 
     // Create button element
     let button = document.createElement("button");
     button.classList.add("like-button");
     button.innerText = "Like";
     
     //set attribute to label button "like"
   
     // Append the image, title, artist, medium, and year elements to the card body element
     card.appendChild(img);
     content.appendChild(title);
     content.appendChild(artist);
     content.appendChild(year);
     content.appendChild(button);
 
     //Apphend content to the card-text element
     cardText.appendChild(content);
 
     //Apphend card-text to the card-body element
     cardBody.appendChild(cardText);
   
     //Apphend the card body element to the card element
     card.appendChild(cardBody);
 
     // Append the card body element to the carousel-item element
     carouselItem.appendChild(card);
   
     // Append the card element to the inner carousel element
     carouselInner.appendChild(carouselItem);
   }
 
 //iterate through all carousel-items and attach an event listener to each like button
 
 ///still an issue with the first card
 const cards = document.querySelectorAll('.card');
 const savedArt = localStorage.getItem('savedArt');
 let artDetailsArray = [];
 
 cards.forEach(card => {
   const likeButton = card.querySelector('.like-button');
   likeButton.addEventListener('click', () => {
        console.log('clicked');
   
     const artDetails = {
       title: card.querySelector('.artwork-title').textContent,
       artist: card.querySelector('.artwork-artist').textContent,
       imageUrl: card.querySelector('.card-img-top').getAttribute('src'),
       year: card.querySelector('.artwork-year').textContent,
       //content: card.querySelector('.content').textContent
     };
     artDetailsArray.push(artDetails);
     localStorage.setItem('savedArt', JSON.stringify(artDetailsArray));
 console.log('artDetailsArray', artDetailsArray);
 
 });
 });
     
    })
   })
   .catch(error => console.log(`Error fetching artworks: ${error}`));
 });
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//storing the artworks details into each carousel-item in the DOM
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //create a clear button that will reset the dom to inital components and update the UI
 const clearButton = document.getElementById('clear-button');


 clearButton.addEventListener('click', () => {
   localStorage.clear();
 });


 //might want to add an alert for user to warn them before removing their data
// currently local storage refreshes for every search, and generation
  ///////////////////////////////////////////// LIKE BUTTON FUNCTIONALITY ////////////////////////////////////////////////////////////////////////////////


  //const likeButtons = document.querySelectorAll('.like-button');


  // Step 2: Attach an event listener to each like button
  // likeButtons.forEach(likeButton => {
  //   likeButton.addEventListener('click', () => {
  //     console.log('clicked');
  //     // Step 3: Extract the art details from the MET API
  //     const artDetails = {
  //       title: document.querySelector('.artwork-title').textContent,
  //       artist: document.querySelector('.artwork-artist').textContent,
  //       imageUrl: document.querySelector('.artwork-image').getAttribute('src'),
  //       //add year
  //       year: document.querySelector('.artwork-year').textContent,
  //     };
   
  //     // Step 4: Save the art details to local storage
  //     const savedArt = localStorage.getItem('savedArt');
  //     let savedArtArray = [];
   
  //     if (savedArt) {
  //       savedArtArray = JSON.parse(savedArt);
  //     }
   
  //     savedArtArray.push(artDetails);
  //     localStorage.setItem('savedArt', JSON.stringify(savedArtArray));//converts the array into a string a stores it in local storage under a specific key
  //     console.log(savedArtArray);
  //   });
  // })

