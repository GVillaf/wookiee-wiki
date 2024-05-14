'use client'

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getCharacterDetails } from '../../../services/characterService';

export default function CharacterDetailPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharacterDetails() {
      try {
        const fetchedCharacter = await getCharacterDetails(id);
        setCharacter(fetchedCharacter);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch character details');
        setLoading(false);
      }
    }

    if (id) {
      fetchCharacterDetails();
    }
  }, [id]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!character) return <p className="text-center text-white">Character not found.</p>;

  return (
    <div className="bg-gray-900 text-yellow-400 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">{character.name}</h2>
        <p className="mb-4">Eye Color: {character.eye_color}</p>
        <p className="mb-4">Gender: {character.gender}</p>
        <p className="mb-4">Birth Year: {character.birth_year}</p>
        <p className="mb-4">Hair Color: {character.hair_color}</p>
        <p className="mb-4">Height: {character.height}</p>
        <p className="mb-4">Skin Color: {character.skin_color}</p>
        <p className="mb-4">Mass: {character.mass}</p>
        {/* <img src="/generic-character-image.jpg" alt="Character Image" className="w-full h-auto" /> */}
      </div>
    </div>
  );
}