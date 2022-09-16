const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");
let likeButtonState = false

function addPokemon(pokemon) {
  const liEl = document.createElement("li");
  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");
  const deleteButton = document.createElement("button")
  const likeButton = document.createElement("img")

  liEl.classList.add("pokemon");
  imgEl.src = pokemon.image;
  // cambiare link
  likeButton.src = "https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
  likeButton.classList.add("pokemon-like")

  h2El.innerText = pokemon.name;

  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", () => {
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
      method: "DELETE",
    });
  });

  likeButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Like Pokemon");
    likeButton.src = getLikeButtonSrc(!likeButtonState);
  });

  liEl.append(imgEl, h2El, deleteButton, likeButton);
  pokeList.append(liEl);
}

function getLikeButtonSrc(likeButton) {
  likeButtonState = likeButton
  if (likeButton) {
    return "https://cdn-icons-png.flaticon.com/512/833/833472.png";
  }   
  return "https://cdn-icons-png.flaticon.com/512/1077/1077035.png"; 
}

function addPokemons(pokemons) {
  pokeList.innerText = ""
  pokemons.forEach(pokemon => addPokemon(pokemon))
}

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value
    };
    
    // CREATE
    fetch("http://localhost:3000/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pokemon)
    })
      .then(res => res.json())
      .then(pokemon => addPokemon(pokemon));
  })

  pokeForm.reset()
}

function init() {
  pokeList.innerHTML = ""
  listenToAddPokemonForm();
  fetchAndRender();

}


function fetchAndRender() {
  fetch("http://localhost:3000/pokemons")
    .then(res => res.json())
    .then(pokemons => addPokemons(pokemons))
}

init()