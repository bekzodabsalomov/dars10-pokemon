import { useState, useEffect } from 'react';

function App() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/1');
      const data = await response.json();
      setPokemon(data);
    }
    fetchPokemon();
  }, []);

  function handleClick() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then(response => response.json())
      .then(data => setPokemon(data));
  }

  if (!pokemon) return <p className="text-red-500">Loading...</p>;

  return (
    <div className="bg-gray-800 text-white p-8 rounded-md shadow-lg max-w-md mx-auto mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4">{pokemon.name}</h2>
      <img
        className="rounded-md mx-auto mb-4"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: '200px', height: '200px' }} 
      />
      <p className="text-yellow-500">Attack: {pokemon.stats[4].base_stat}</p>
      <p className="text-purple-500">Speed: {pokemon.stats[0].base_stat}</p>
      <p className="text-red-500">Defense: {pokemon.stats[1].base_stat}</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4"
        onClick={handleClick}
      >
        Get Random Pokemon
      </button>
    </div>
  );
}

export default App;