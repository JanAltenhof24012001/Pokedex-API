function loadingGifTemplate() {
    return `<div class="userfeedback-container">
                <img src="./img/pokemon-8939_256.gif" alt="please be patient">
                <p>... loading</p>
            </div>`
}

function pokemonCardsTemplate(renderIndex) {
    let PokemonName = currentPokemonDB[renderIndex].name
    return `<div class="pokemon-container" id="scrolltarget${currentPokemonDB[renderIndex].id}" onclick="openPokemonDialog(${currentPokemonDB[renderIndex].id - 1})">
                <div>
                    <h2>#${currentPokemonDB[renderIndex].id} ${PokemonName.charAt(0).toUpperCase()}${PokemonName.slice(1)}</h2>
                </div>
                <div class="pokemon-image-container ${setBackgroundColor(renderIndex)}">
                    <img class="pokemon-image" src="${currentPokemonDB[renderIndex].pokemon_image}" alt="Bild">
                </div>
                <div class="type-container">
                    ${renderTypeSprites(renderIndex)}
                </div>
            </div>`
}

function morePokemonButtonTemplate() {
    return `<button class="load-more-button" onclick="loadMorePokemon(20)">Load 20 more</button>
            <button class="load-more-button" onclick="loadMorePokemon(100)">Load 100 more</button>`
}

function dialogTemplate(pokemonID) {
    let PokemonName = currentPokemonDB[pokemonID].name
    return `<div class="pokemon-container-dialog">
                <div class="close-button-container">
                    <button class="close-button" onclick="closeDialog()">X</button>
                </div>
                <div class="display-flex">
                    <h2>#${currentPokemonDB[pokemonID].id} ${PokemonName.charAt(0).toUpperCase()}${PokemonName.slice(1)}</h2>
                </div>
                <div class="pokemon-image-container ${setBackgroundColor(pokemonID)}">
                    <img class="pokemon-image" src="${currentPokemonDB[pokemonID].pokemon_image}" alt="Bild">
                </div>
                <div class="type-container">
                    ${renderTypeSprites(pokemonID)}
                </div>
                <div class="half-split">
                    <table id="stats-table" class="stats-table"></table>
                    
                    <div class="pokemon-cry-container">
                        <h3>Pokemon Cry</h3>
                        <button class="cry-button" onclick="playPokemonCry(${pokemonID})"><img src="./img/pokemon-cry.svg" alt="audio"></button>
                    </div>
                </div>
                <div class="space-between">
                    <button class="switch-pokemon-button" onclick="openPokemonDialog(${pokemonID - 1})"><<</button>
                    <p>${currentPokemonDB[pokemonID].id}/${currentPokemonDB.length}</p>
                    <button class="switch-pokemon-button" onclick="openPokemonDialog(${pokemonID + 1})">>></button>
                </div>    
            </div>`
}

function statsTemplate(pokemonID, i) {
    let statName = currentPokemonDB[pokemonID].stats[0]
    let statAmount = currentPokemonDB[pokemonID].stats[0];
    return `<tr>
                <th class="stat-name">${Object.keys(statName[i])}</th>
                <th class="stat-amount">${statAmount[i][Object.keys(statName[i])]}</th>
            </tr>`
}

function noPokemonFoundTemplate() {
    return `<h2>No Pokemon has been found. Try again</h2>`
}


