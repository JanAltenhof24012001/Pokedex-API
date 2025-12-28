const POKEDEX_REF = document.getElementById('pokedex')
const TYPE_CONTAINER_REF = document.getElementById('type-container')

let i = 1
let limit = 1

async function init() {
    await getData();
    renderSmallCards();
}

async function getData() {
    for (i; i < limit + 20; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let responseAsJson = await response.json();
        pokemonDB.push({
            "name": responseAsJson.name,
            "id": responseAsJson.id,
            "types": getTypeData(responseAsJson),
            "type_sprite": await getTypeSpriteData(responseAsJson)
        })
        pokemonImages.push(responseAsJson.sprites.front_default)
    }
}

function getTypeData(responseAsJson) {
    let Types = []
    for (let i = 0; i < responseAsJson.types.length; i++) {
        Types.push(responseAsJson.types[i].type.name)
    }
    return Types
}

async function getTypeSpriteData(responseAsJson) {
    let TypeSprites = []
    for (let i = 0; i < responseAsJson.types.length; i++) {
        let spriteResponse = await fetch(responseAsJson.types[i].type.url);
        let spriteResponseAsJson = await spriteResponse.json();
        TypeSprites.push(spriteResponseAsJson.sprites["generation-viii"]["sword-shield"]["name_icon"])
    }
    console.log(TypeSprites);
    
    return TypeSprites
}

function renderSmallCards() {
    for (let i = 0; i < pokemonDB.length; i++) {
        POKEDEX_REF.innerHTML += pokemonCardsTemplate(i);
    }
}

function renderTypeSprites(i) {
    console.log(pokemonDB[i].type_sprite);
    
    for (let typeIndex = 0; typeIndex < pokemonDB[i].types.length; typeIndex++) {
        if (pokemonDB[i].types.length == 2) {
            return `<img class="type-image" src="${pokemonDB[i].type_sprite[0]}" alt="Bild">
                    <img class="type-image" src="${pokemonDB[i].type_sprite[1]}" alt="Bild">`
        } else if (pokemonDB[i].types.length == 1) {
            return `<img class="type-image" src="${pokemonDB[i].type_sprite}" alt="Bild">`
        }
    }
}

