const MAIN_REF = document.getElementById('main')
const POKEDEX_REF = document.getElementById('pokedex-card-container')
const TYPE_CONTAINER_REF = document.getElementById('type-container')
const DIALOG_REF = document.getElementById('pokemon-dialog')
const SEARCHBAR = document.getElementById('searchbar');
const MORE_POKEMON_CONTAINER_REF = document.getElementById('more-pokemon-container');
const BODY_REF = document.getElementById('body');

let currentPokemonIndex = 1
let limit = 1 // Max amount of pokemon per loading

async function init() {
    loadingGif();
    await getData();
    currentPokemonDB = pokemonDB;
    renderSmallCards();
}

// Loading gif while data is getting fetched
function loadingGif() {
    POKEDEX_REF.innerHTML = loadingGifTemplate();
}

// Fetching Data from API to create local Databank
async function getData() {
    for (currentPokemonIndex; currentPokemonIndex < limit + 20; currentPokemonIndex++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemonIndex}/`);
        let responseAsJson = await response.json();
        pokemonDB.push({
            "name": responseAsJson.name,
            "id": responseAsJson.id,
            "pokemon_image": responseAsJson.sprites.front_default,
            "types": getTypeData(responseAsJson),
            "type_sprite": await getTypeSpriteData(responseAsJson),
            "stats": [],
            "pokemon_cry": []
        })
    }
}

// pushing Type Data into pokemonDB
function getTypeData(responseAsJson) {
    let Types = []
    for (let i = 0; i < responseAsJson.types.length; i++) {
        Types.push(responseAsJson.types[i].type.name)
    }
    return Types
}

// pushing correct Type sprite into pokemonDB
async function getTypeSpriteData(responseAsJson) {
    let TypeSprites = []
    for (let i = 0; i < responseAsJson.types.length; i++) {
        let spriteResponse = await fetch(responseAsJson.types[i].type.url);
        let spriteResponseAsJson = await spriteResponse.json();
        TypeSprites.push(spriteResponseAsJson.sprites["generation-viii"]["sword-shield"]["name_icon"])
    }
    return TypeSprites
}

// renders the small pokemon cards and buttons to load more pokemon
function renderSmallCards() {
    POKEDEX_REF.innerHTML = ""
    for (renderIndex = 0; renderIndex < currentPokemonDB.length; renderIndex++) {
        POKEDEX_REF.innerHTML += pokemonCardsTemplate(renderIndex);
    }
    MORE_POKEMON_CONTAINER_REF.innerHTML = morePokemonButtonTemplate();
}

// renders the correct type sprites into the small pokemon cards
function renderTypeSprites(i) {
    for (let typeSpriteIndex = 0; typeSpriteIndex < currentPokemonDB[i].types.length; typeSpriteIndex++) {
        if (currentPokemonDB[i].types.length == 2) {
            return `<img class="type-image" src="${currentPokemonDB[i].type_sprite[0]}" alt="Type Sprite">
                    <img class="type-image" src="${currentPokemonDB[i].type_sprite[1]}" alt="Type Sprite">`
        } else if (currentPokemonDB[i].types.length == 1) {
            return `<img class="type-image" src="${currentPokemonDB[i].type_sprite}" alt="Type Sprite">`
        }
    }
}

// loads either 20 or 100 more pokemon cards and scrolls to the last pokemon card before the increase
async function loadMorePokemon(amount) {
    MORE_POKEMON_CONTAINER_REF.innerHTML = "";
    limit = limit + amount // increase limit by 20 or 100
    await init()
    scrollToLastSeenPokemon();
}

// scrolls to the last pokemon card before the increase
function scrollToLastSeenPokemon() {
    if (amount == 20) {
        const target = document.getElementById(`scrolltarget${limit - 1}`);
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        })
    } else {
        const target = document.getElementById(`scrolltarget${limit - 81}`);
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        })
    }
}

// opens the dialog of the selected pokemon
async function openPokemonDialog(pokemonID) {
    if (pokemonID == -1) { // prevents you from going into minus when switching between pokemon in dialog
        
    } else if (pokemonID == limit + 19) { // prevents you from going over the limit when switching between pokemon in dialog
        
    } else {
        await getSpecificData(pokemonID);
        DIALOG_REF.showModal();
        BODY_REF.classList.add('no-scroll') // adds class to the body to prevent scrolling while dialog is open
        renderDialog(pokemonID);
        loadStats(pokemonID)
    }
}

// fetches the stats data and the pokemon cry of the selected pokemon 
async function getSpecificData(pokemonID) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${(pokemonID + 1)}/`);
    let responseAsJson = await response.json();
    currentPokemonDB[pokemonID].stats.push(getPokemonStats(responseAsJson))
    currentPokemonDB[pokemonID].pokemon_cry.push(responseAsJson.cries.legacy)
}

// pushes the stats data into the DB
function getPokemonStats(responseAsJson) {
    let APIstatsArray = responseAsJson.stats
    let Stats = []
    for (let i = 0; i < APIstatsArray.length; i++) {
        let statAmount = APIstatsArray[i]["base_stat"]
        let statName = APIstatsArray[i].stat.name
        Stats.push({[statName]: statAmount})
    }
    return Stats
}

// renders the dialog content
async function renderDialog(pokemonID) {
    DIALOG_REF.innerHTML = dialogTemplate(pokemonID);
}

// renders the stats of the pokemon inside the dialog
function loadStats(pokemonID) {
    const STATS_TABLE_REF = document.getElementById('stats-table')
    for (let i = 0; i < currentPokemonDB[pokemonID].stats[0].length; i++) {
        STATS_TABLE_REF.innerHTML += statsTemplate(pokemonID, i)
    }
}

// closes dialog and enables the scrolling of the body again
function closeDialog() {
    DIALOG_REF.close();
    BODY_REF.classList.remove('no-scroll')
}

// closes the dialog when clicking outside of it 
DIALOG_REF.addEventListener('click', (event) => {
    if (event.target == DIALOG_REF) {
        closeDialog()
    }
});

// enables the scrolling of the body again when closing the dialog with escape
DIALOG_REF.addEventListener("cancel", (event) => {
  event.preventDefault(); 
  closeDialog();
});

// plays the pokemon cry when clicking on the audio button
function playPokemonCry(pokemonID) {
    let pokemonCry = new Audio(currentPokemonDB[pokemonID].pokemon_cry[0])
    pokemonCry.volume = (0.05)
    pokemonCry.play();
}

// sets the background color of the pokemon image to the color of the first Type of the pokemon
function setBackgroundColor(pokemonID) {
    let Type = currentPokemonDB[pokemonID].types[0]
    return `${Type}-background`
}

// filters the currently shown pokemon by whats written in the searchbar
function pokemonFilter(event) {
    if (SEARCHBAR.value.length >= 3) {
        currentPokemonDB = pokemonDB.filter((pokemon) => pokemon.name.includes(SEARCHBAR.value.toLowerCase()))
        if (currentPokemonDB.length >= 1) {
            renderFilteredPokemon();
        } else {
            POKEDEX_REF.innerHTML = noPokemonFoundTemplate() // if no pokemon is found --> load this message
        }
        SEARCHBAR.value = ""
        currentPokemonDB = pokemonDB 
        event.preventDefault();
    } 
}

// renders the filtered pokemon
function renderFilteredPokemon() {
    POKEDEX_REF.innerHTML = ""
    renderSmallCards();
}



