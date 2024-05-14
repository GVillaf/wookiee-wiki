'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';

async function getCharacters(page = 1) {
  const res = await fetch(`/api/characters?page=${page}&limit=10`);
  return res.json();
}

export function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const data = await getCharacters(page);
        setCharacters(data.characters);
        setTotal(data.total);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch characters');
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const totalPages = Math.ceil(total / 10);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {characters.map(character => (
          <div key={character.id} className="card bg-gray-800 p-4 rounded shadow-lg">
            <h3 className="text-2xl font-bold">{character.name}</h3>
            <p>Eye Color: {character.eye_color}</p>
            <p>Gender: {character.gender}</p>
            <img src="/generic-character-image.jpg" alt="Generic Character" className="w-full h-auto my-4" />
            <Link href={`/characters/${character.id}`}>
              Ver Detalles
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 mx-1 ${index + 1 === page ? 'bg-yellow-400' : 'bg-gray-800'} text-white rounded`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}