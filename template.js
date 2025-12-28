function pokemonCardsTemplate(i) {
    return `<div class="pokemon-container">
            <div>
                <h2>#${pokemonDB[i].id} ${pokemonDB[i].name}</h2>
            </div>
            <div class="pokemon-image-container">
                <img class="pokemon-image" src="${pokemonImages[i]}" alt="Bild">
            </div>
            <div class="type-container">
                ${renderTypeSprites(i)}
            </div>
        </div>`
}

