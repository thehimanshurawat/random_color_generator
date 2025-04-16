// let btn = document.querySelector("button");
// btn.addEventListener("click",function (){
//     let h3 = document.querySelector("h3");
//     let randomColor= getRandomColor();
//     h3.innerText = randomColor;

//     let div = document.querySelector("div");
//     div.style.backgroundColor = randomColor;
//     if(randomColor === "rgb(0, 0, 0)"){
//         div.style.color = "rgb(255, 255, 255)";
//     }else{
//         div.style.color = "rgb(0, 0, 0)";
//     }

//     console.log("Color Updated");
    
// });

// function getRandomColor (){
//     let red = Math.floor(Math.random() * 256);
//     let green = Math.floor(Math.random() * 256);
//     let blue = Math.floor(Math.random() * 256);
//     let color = `rgb(${red}, ${green}, ${blue})`;
//     return color;
// }
let generateBtn = document.getElementById("generate-btn");
let colorBox = document.getElementById("color-box");
let audio = document.getElementById("sound");
let historyList = document.getElementById("history-list");
let favList = document.getElementById("fav-list");
let copyInfo = document.getElementById("copy-info");
let toggleModeBtn = document.getElementById("toggle-mode");
let saveFavBtn = document.getElementById("save-fav");

let colorHistory = [];
let favorites = [];

generateBtn.addEventListener("click", function () {
  let randomColor = getRandomColor();
  updateColor(randomColor);
  updateHistory(randomColor);
});

toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleModeBtn.innerText = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

saveFavBtn.addEventListener("click", () => {
  let currentColor = colorBox.innerText.split("\n")[1];
  if (!favorites.includes(currentColor)) {
    favorites.unshift(currentColor);
    updateFavorites();
  }
});

function getRandomColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function updateColor(color) {
  colorBox.style.backgroundColor = color;

  const [r, g, b] = color.match(/\d+/g).map(Number);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  colorBox.style.color = brightness < 128 ? "white" : "black";

  colorBox.innerText = `This is your new color.\n${color}`;
}

function updateHistory(color) {
  colorHistory.unshift(color);
  if (colorHistory.length > 5) colorHistory.pop();

  historyList.innerHTML = "";
  colorHistory.forEach(c => addColorItem(c, historyList));
}

function updateFavorites() {
  favList.innerHTML = "";
  favorites.forEach(c => addColorItem(c, favList));
}

function addColorItem(color, container) {
  let item = document.createElement("div");
  item.className = container === favList ? "fav-item" : "history-item";
  item.innerText = color;
  item.style.backgroundColor = color;

  const [r, g, b] = color.match(/\d+/g).map(Number);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  item.style.color = brightness < 128 ? "white" : "black";

  container.appendChild(item);
}

