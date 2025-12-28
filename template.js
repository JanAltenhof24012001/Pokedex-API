function pokemonCardsTemplate(i) {
    return `<div class="pokemon-container">
            <div>
                <h2>#${pokemonDB[i].id} ${pokemonDB[i].name}</h2>
            </div>
            <div>
                <img src="${pokemonImages[i]}" alt="Bild">
            </div>
            <div>
                ${renderTypeSprites(i)}
            </div>
        </div>`
}

