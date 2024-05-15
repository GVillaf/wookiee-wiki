'use client'

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getCharacterDetails } from '../../../services/characterService';
import Link from 'next/link';
import Image from 'next/image';
import world from '@/app/assets/images/world.webp';

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
    <div className="bg-center text-yellow-400 min-h-screen p-8 md:max-h-screen overflow-y-hidden relative w-full md:h-screen">
      <div className="absolute inset-0 z-[-10]">
        <Image src={world} alt="Star Wars Background" layout="fill" objectFit="cover" className="opacity-50" />
        <div className="absolute inset-0 bg-black opacity-50"></div> 
      </div>
      <nav className="mb-8 flex justify-end items-center">
        <Link href="/characters" className="text-blue-500 font-bold hover:scale-105 hover:underline mx-7 text-2xl">Back to Characters</Link>
      </nav>
      <div className="max-w-4xl mx-auto bg-black bg-opacity-70 p-8 rounded-2xl">
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
