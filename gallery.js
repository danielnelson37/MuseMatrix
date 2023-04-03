//retrieve all saved artworks from local storage
const savedArtDetails = JSON.parse(localStorage.getItem('savedArt'));
//const savedArt = localStorage.getItem('savedArt');


console.log(savedArtDetails);


if (typeof localStorage !== 'undefined') {
   // Local Storage is supported
   // Perform operations related to Local Storage here
   console.log('Local Storage is supported');
 } else {
   // Local Storage is not supported
   // Handle the case where Local Storage is not supported
   console.log('Local Storage is not supported');
 }


/////////////////////////////// DISPLAYS 1 SAVED ARTWORK ////////////////////////////////////////////////////////////////////////////////
// const gallerySection = document.querySelector('.personal-gallery');
// const galleryItem = document.createElement('div');
// galleryItem.classList.add('gallery-item');// makes a div with a class of gallery-item
// galleryItem.innerHTML = `
//   <img src="${savedArtDetails[0].imageUrl}" alt="${savedArtDetails[0].imageUrl}" class="gallery-item-image">
//   <h2 class="gallery-item-title">${savedArtDetails[0].title}</h2>
//   <p class="gallery-item-artist">${savedArtDetails[0].artist}</p>
//  <p class="gallery-item-year">${savedArtDetails[0].description}</p>
// `;
// gallerySection.appendChild(galleryItem);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const gallerySection = document.querySelector('.personal-gallery');
// Loop through the saved artworks and create a card element for each one
for (let i = 0; i < savedArtDetails.length; i++) {
   // Create the card element
   let card = document.createElement("div");
   card.classList.add("card");

   // Create the image element
   let img = document.createElement("img");
   img.classList.add("card-img-top");
   img.setAttribute("src", savedArtDetails[i].imageUrl);
   img.setAttribute("alt", savedArtDetails[i].title);

   // Create the card body element
   let cardBody = document.createElement("div");
   cardBody.classList.add("card-body");

   // Create the title element
   let title = document.createElement("h3");
   title.innerText = savedArtDetails[i].title;

   // Create the artist element
   let artist = document.createElement("p");
   artist.innerText = savedArtDetails[i].artist;
   if(!savedArtDetails[i].artist){
     artist.innerText = "Artist: Not available";
   }

   // Create the year element
   let year = document.createElement("p");
   year.innerText = savedArtDetails[i].year;
   if(!savedArtDetails[i].year){
       year.innerText = "Year: Not available";
     }

   // Append the image, title, artist, medium, and year elements to the card body element
   cardBody.appendChild(img);
   cardBody.appendChild(title);
   cardBody.appendChild(artist);
   cardBody.appendChild(year);

   // Append the card body element to the card element
   card.appendChild(cardBody);

   // Append the card element to the personal gallery container
   gallerySection.appendChild(card);
 }


 const clearButton = document.getElementById('clear-button');


 clearButton.addEventListener('click', () => {

   console.log('clear button clicked');
   localStorage.clear();
 });
