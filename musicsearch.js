// window.addEventListener("load", (event) => {

// });

const answer = document.getElementById("answer");
const searchform = document.getElementById("searchForm");
const songlist = document.getElementById("songlist");
const searchbutton = document.getElementById("searchbutton");
const imgsection = document.getElementById("recomendationdiv");
const artname = document.getElementById("name");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0d609c289bmshcb34f3875230314p16af7bjsn0b34283e7eb7",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

//input should come from the user input string
//${input}
let songId = "";
let artist = "";
let artistid = "";
searchform.addEventListener("submit", (e) => {
  e.preventDefault();
  artist = answer.value;
  console.log(artist);
  fetchArtistNum(artist);
});

function fetchArtistNum() {
  fetch(
    `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${artist}&per_page=1&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      recommendations(data.hits[0].result.id);
    })
    .catch((err) => console.error(err));
}

function getALink(songId) {
  fetch(
    `https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=${songId}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const ytlink = response.song.youtube_url;
    })
    .catch((err) => console.error(err));
}

function recommendations(artistId) {
  fetch(
    `https://genius-song-lyrics1.p.rapidapi.com/song/recommendations/?id=${artistId}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let container = document.createElement("div");
      container.style.display = "flex";
      container.style.flexDirection = "row";
      response.song_recommendations.recommendations.forEach((e) => {
        let songTitle = e.recommended_song.full_title; //song title
        let coverArt = e.recommended_song.song_art_image_url; //pic
        let songId = e.recommended_song.id; //number
        getALink(songId);
        let newDiv = document.createElement("div");
        newDiv.style.marginRight = "7%";
        let textBx = document.createElement("div");
        textBx.innerText = songTitle;
        textBx.style.textAlign = "center";
        let img = document.createElement("img");
        img.src = coverArt;
        img.height = 200;
        img.width = 200;
        newDiv.append(textBx, img);
        container.append(newDiv);
      });
      imgsection.append(container);
    })

    .catch((err) => console.error(err));
}
