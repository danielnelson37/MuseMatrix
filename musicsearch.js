const searchform = document.getElementById("searchForm");
const imgsection = document.getElementById("recomendationdiv");
const refreshbutton = document.getElementById("refresh");


let artist = "";
let playlist =[]

refreshbutton.addEventListener("click", () => {
    searchform.reset();
    while(document.getElementById("container")){
      document.getElementById("container").remove();
    }
    
})

searchform.addEventListener("submit", (e) => {
  e.preventDefault();
  artist = answer.value;
  console.log(artist);
  artistIdNum(artist);
});

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0d609c289bmshcb34f3875230314p16af7bjsn0b34283e7eb7",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

function artistIdNum() {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`, options)
    .then((response) => response.json())
    .then((response) => {
      const result = [];
      let array = response.data;
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomItem = array.splice(randomIndex, 1)[0];
        result.push(randomItem);
      }
      console.log(result);
      console.log(response.data);
      makeDiv(result);
    })
    .catch((err) => console.error(err));
}

function makeDiv(result) {
  let container = document.createElement("div");

  result.forEach((element) => {
    let songTitle = element.title;
    console.log(songTitle);
    let coverArt = element.album.cover;
    console.log(coverArt);

    container.id = "container";
    let newDiv = document.createElement("div");
    let textBx = document.createElement("p");
    let newbutton = document.createElement("button");
    newDiv.id = "seletedmusic";
    textBx.innerText = songTitle;
    let img = document.createElement("img");
    img.src = coverArt;
    img.height = 180;
    img.width = 180;
    newbutton.innerText = "add to playlist";
    newbutton.id = "playlist";
    newDiv.append(textBx, img, newbutton);
    container.append(newDiv);
    imgsection.append(container);
    
    if(newbutton.addEventListener("click",(e)=>{
      newbutton.innerText="added"
    }
    ));
  });  
}



