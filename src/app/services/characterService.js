'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import characterGeneric from '@/assets/images/darth.webp';

export async function getCharacters(page = 1, eyeColor = '', gender = '') {
  const res = await fetch(`/api/characters?page=${page}&limit=10&eye_color=${eyeColor}&gender=${gender}`);
  return res.json();
}

export function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [eyeColor, setEyeColor] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const data = await getCharacters(page, eyeColor, gender);
        setCharacters(data.characters);
        setTotal(data.total);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch characters');
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [page, eyeColor, gender]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const totalPages = Math.ceil(total / 10);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label className="mr-2">Eye Color:</label>
          <select
            value={eyeColor}
            onChange={(e) => setEyeColor(e.target.value)}
            className="bg-gray-800 text-yellow-400 p-2 rounded "
          >
            <option value="">All</option>
            <option value="blue">Blue</option>
            <option value="brown">Brown</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="red">Red</option>
            <option value="black">Black</option>
            <option value="orange">Orange</option>
            <option value="hazel">Hazel</option>
            <option value="pink">Pink</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-gray-800 text-yellow-400 p-2 rounded"
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="n/a">N/A</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map(character => (
          <div key={character.id} className="card bg-gray-800 p-3 m-3 rounded shadow-lg  flex flex-col items-center">
            <h3 className="text-2xl font-bold">{character.name}</h3>
            <p>Eye Color: {character.eye_color}</p>
            <p>Gender: {character.gender}</p>
            <Image
                src={characterGeneric}
                alt="character Generic"  
                width={200}
                height={200}
                objectFit="contain"
                priority
              />
            <Link className='mt-3' href={`/characters/${character.id}`}>
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

export async function getCharacterDetails(id) {
  const response = await fetch(`http://localhost:3000/api/characters/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch character details');
  }
  return response.json();
}

export async function getCharacterNames(characterUrls) {
  const characterDetails = await Promise.all(
    characterUrls.map(async (url) => {
      const res = await fetch(url);
      const character = await res.json();
      return {
        name: character.name,
        url: `/characters/${character.url.match(/\/(\d+)\/$/)[1]}`
      };
    })
  );
  return characterDetails;
}