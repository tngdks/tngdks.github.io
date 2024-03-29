let cardContainer = document.getElementById('container');
window.addEventListener("load", function () {
     let favourites = localStorage.getItem("favouriteCharacters");
     if (favourites == null) {
          cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>"
          return;
     }
     else {
          favourites = JSON.parse(this.localStorage.getItem("favouriteCharacters"));
     }
     if (favourites.length == 0) {
          cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>";
          return;
     }
     cardContainer.innerHTML = "";
     favourites.forEach(character => {
          cardContainer.innerHTML +=
               `
               <div class="flex-col card">
                    <img src="${character.squareImage}" alt="">
                    <span class="name">${character.name}</span>
                    <span class="id">Id : ${character.id}</span>
                    <span class="comics">Comics : ${character.comics}</span>
                    <span class="series">Series : ${character.series}</span>
                    <span class="stories">Stories : ${character.stories}</span>
                    <a class="character-info" href="./more-info.html">
                         <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button>
                    </a>
                    <div style="display:none;">
                         <span>${character.id}</span>
                         <span>${character.name}</span>
                         <span>${character.comics}</span>
                         <span>${character.series}</span>
                         <span>${character.stories}</span>
                         <span>${character.description}</span>
                         <span>${character.landscapeImage}</span>
                         <span>${character.portraitImage}</span>
                         <span>${character.squareImage}</span>
                    </div>
                    <button class="btn remove-btn"><i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites</button>
               </div>
          `

     })
     addEvent();
})
function addEvent() {
     let removeBtn = document.querySelectorAll(".remove-btn");
     removeBtn.forEach((btn) => btn.addEventListener("click", removeCharacterFromFavourites))

     let characterInfo = document.querySelectorAll(".character-info");
     characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage));
}
function removeCharacterFromFavourites() {
     let idOfCharacterToBeDeleted = this.parentElement.children[2].innerHTML.substring(5);
     let favourites = JSON.parse(localStorage.getItem("favouriteCharacters"));
     let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
     favouritesCharacterIDs.delete(`${idOfCharacterToBeDeleted}`);
     favourites.forEach(function (favourite, index) {
          if (favourite.id == idOfCharacterToBeDeleted) {
               favourites.splice(index, 1);
          }
     });
     if (favourites.length == 0) {
          cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>";
     }
     localStorage.setItem("favouriteCharacters", JSON.stringify(favourites));
     localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
     this.parentElement.remove();
     document.querySelector(".remove-toast").setAttribute("data-visiblity", "show");
     setTimeout(function () {
          document.querySelector(".remove-toast").setAttribute("data-visiblity", "hide");
     }, 1000);
}
function addInfoInLocalStorage() {
     let heroInfo = {
          name: this.parentElement.children[7].children[1].innerHTML,
          description: this.parentElement.children[7].children[5].innerHTML,
          comics: this.parentElement.children[7].children[2].innerHTML,
          series: this.parentElement.children[7].children[3].innerHTML,
          stories: this.parentElement.children[7].children[4].innerHTML,
          portraitImage: this.parentElement.children[7].children[7].innerHTML,
          id: this.parentElement.children[7].children[0].innerHTML,
          landscapeImage: this.parentElement.children[7].children[6].innerHTML
     }

     localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}
let themeButton = document.getElementById("theme-btn");

themeButton.addEventListener("click", themeChanger);
(function () {
     let currentTheme = localStorage.getItem("theme");
     if (currentTheme == null) {
          root.setAttribute("color-scheme", "light");
          themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
          themeButton.style.backgroundColor = "#0D4C92";
          localStorage.setItem("theme", "light");
          return;
     }

     switch (currentTheme) {
          case "light":
               root.setAttribute("color-scheme", "light");
               themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
               themeButton.style.backgroundColor = "#0D4C92";
               break;
          case "dark":
               root.setAttribute("color-scheme", "dark");
               themeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
               themeButton.style.backgroundColor = "#FB2576";
               themeButton.childNodes[0].style.color = "black";
               break;
     }
})();
function themeChanger() {
     let root = document.getElementById("root");
     if (root.getAttribute("color-scheme") == "light") {
          root.setAttribute("color-scheme", "dark");
          themeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
          themeButton.style.backgroundColor = "#FB2576";
          themeButton.childNodes[0].style.color = "black";
          localStorage.setItem("theme", "dark");
     } else if (root.getAttribute("color-scheme") == "dark") {
          root.setAttribute("color-scheme", "light");
          themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
          themeButton.style.backgroundColor = "#0D4C92";
          themeButton.childNodes[0].style.color = "white";
          localStorage.setItem("theme", "light");
     }
}
