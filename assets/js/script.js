const urlPokeApi = "https://pokeapi.co/api/v2/pokemon/";

const addCard = (namePokemon, imagePokemon) => {
  // console.log(namePokemon, imagePokemon);
  const div = document.createElement("div");
  div.className = "pokemon";
  const name = document.createTextNode(namePokemon);
  const img = document.createElement("img");
  img.src = imagePokemon; 

  div.appendChild(name);
  div.appendChild(img);
  document.querySelector('main').appendChild(div);
};

const getPokemons = async function(url) {
  const response = await fetch(url);
  const pokemons = await response.json();
  // console.log(pokemons);
  return pokemons;
}

const getImagePokemon = async function(urlPokemon){
  const response = await fetch(urlPokemon);
  const pokemon = await response.json();
  // console.log(pokemon.sprites.front_default);
  return pokemon.sprites.front_default;
}

const cleanPokemons = () => {
  document.querySelector("main").innerHTML = "";
}

let prevPage;
let nextPage;

document.querySelector("#prev-page").addEventListener("click", () => {
  cleanPokemons();
  loadPokemons(prevPage);
});

document.querySelector("#next-page").addEventListener("click", () => {
  cleanPokemons();
  loadPokemons(nextPage);
});

const loadPokemons = async(url) => {
  const pokemons = await getPokemons(url);
  for ( let pokemon of pokemons.results) {
    const image = await getImagePokemon(pokemon.url);
    // console.log(pokemon.name, imagePokemon)
    addCard(pokemon.name, image);
  }
  // To add paginator
  prevPage = pokemons.previous;
  nextPage = pokemons.next;

  const prevPageEnabled = prevPage === null;
  const nextPageEnabled = nextPage === null;
  document.querySelector("#prev-page").disabled = prevPageEnabled;
  document.querySelector("#next-page").disabled = nextPageEnabled;
}

loadPokemons(urlPokeApi);

/*
More information:
https://www.freecodecamp.org/espanol/news/que-es-una-api-en-espanol-por-favor/
https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch"
https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/JSON
https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises
https://developer.mozilla.org/es/docs/Web/CSS/CSS_Images/Using_CSS_gradients
*/