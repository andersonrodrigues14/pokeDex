const types = [
  'fire',
  'grass',
  'electric',
  'water',
  'ground',
  'rock',
  'fairy',
  'poison',
  'bug',
  'dragon',
  'psychic',
  'flying',
  'fighting',
  'normal',
];

const POKEMON_COUNT = 50;

const cardHTML = `
<div class="card" id"card-{id}"><!--Estrutura de cada Card-->
<div class="title"> <!--Title card-->
    <h2>{name}</h2>
    <small># {id}</small>
</div>
<div class="img bg-{type}">
    <img src="https://pokeres.bastionbot.org/images/pokemon/{id}.png" alt="{name}" />
</div>
<div class="type {type}">
    <p>{type}</p>
</div>
<button class="favorite" data-id={id}>
    <div class="heart">

    </div>
</button>
</div> <!--Fim Estrutura de cada Card-->
`
const cards = document.querySelector('.cards');
const getType = (data) => { // recebe a lista de tipos de ferchPokemon e pega o primeiro existente nos Types
  const apiTypes = data.map((type) => type.type.name);
  const type = types.find((type) => apiTypes.indexOf(type) > -1);
  return type;
}

const fetchPokemon = async (number) => { //busca informações do pokemon
  if(number === undefined) return;
  const url = `https://pokeapi.co/api/v2/pokemon/${number}`
  const response =  await fetch(url).then((response) => response.json());
  const {id, name, types} = response;
  const type = getType(types); // chamado para retornar somente um tipo do pokemos (types)
  return {id, name, type};

};

const replacer = (text, source, destination) => { //faz o replace regex
  const regex = new RegExp(source, 'gi');
  return text.replace(regex, destination)
}

const creatPokemonCard = (pokemon) => { //subistitui tags no html
  const {id, name, type} = pokemon;
  let newCard = replacer(cardHTML, `\{id\}`,id)
  newCard = replacer(newCard, `\{name\}`,name)
  newCard = replacer(newCard, `\{type\}`,type)

  cards.innerHTML+= newCard;
}

const fetchPokemons = async () => { // busca todos os pokemons
  for (let i = 1 ; i <= POKEMON_COUNT; i++) {
    const pokemon = await fetchPokemon(i);
    creatPokemonCard(pokemon);
  }
}


fetchPokemons();
