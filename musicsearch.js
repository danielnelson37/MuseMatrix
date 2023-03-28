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

function recommendations(artistId) {
  fetch(
    `https://genius-song-lyrics1.p.rapidapi.com/song/recommendations/?id=${artistId}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      response.song_recommendations.recommendations.forEach((e) => {
        console.log(e.recommended_song.full_title);
        console.log(e.recommended_song.song_art_image_url);
        let newDiv = document.createElement("div");
        imgsection.append(newDiv);
        let songText = document.createTextNode(e.recommended_song.full_title);
        newDiv.append(songText);
        let img = document.createElement("img");
        img.src = e.recommended_song.song_art_image_url;
        img.height = 150;
        img.width = 150;
        newDiv.append(img);
      });
    })

    .catch((err) => console.error(err));
}
//artist id should be the id number serch returns
//${artistid}
