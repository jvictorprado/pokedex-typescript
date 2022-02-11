const pokeFetch = () => {
    const getUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
    const promisseArr = [];
    for (let i = 1; i <= 150; i++) {
        promisseArr.push(fetch(getUrl(i)).then(response => response.json())); //pegando cada promisse e adc num array de promisses
    }
    Promise.all(promisseArr).then((pokemons) => {
        const pokeList = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name);
            accumulator += `
            <li class="card ${types[0]}">
            <img class="card-image" alt="${pokemon.name}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${("000" + pokemon.id).slice(-3)}.png" />
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${types.join(' | ')}</p>
            </li>`;
            return accumulator;
        }, '');
        const ul = document.querySelector('[data-js="pokedex"]');
        ul.innerHTML = pokeList;
    });
};
pokeFetch();
