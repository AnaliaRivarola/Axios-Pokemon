import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [pokemonNames, setPokemonNames] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchPokemon = () => {
        setLoading(true);
        axios.get("https://pokeapi.co/api/v2/pokemon")
            .then(response => {
                const names = response.data.results.map(pokemon => pokemon.name);
                setPokemonNames(names);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>Pokemon Names</h1>
            <button onClick={fetchPokemon}>Fetch Pokemon</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <ul>
                {pokemonNames.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
