'use client'

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getMovieDetails } from '../../../services/movieService';
import { getCharacterNames } from '../../../services/characterService';
import Link from 'next/link';
import Image from 'next/image';
import world from '@/assets/images/world.webp';
import moviesGeneric from '@/assets/images/movies-generic.webp';
import genericimgchar from "@/assets/images/darth.webp";
import Loader from "@/app/client/components/Loader"

export default function FilmDetailPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [movie, setMovie] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const fetchedMovie = await getMovieDetails(id);
        setMovie(fetchedMovie);
        const characterNames = await getCharacterNames(fetchedMovie.characters);
        setCharacters(characterNames);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    }

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!movie) return <p className="text-center text-white">Movie not found.</p>;

  return (
    <div className="bg-center text-yellow-400 min-h-screen p-8 overflow-y-auto relative w-full">
      <div className="absolute inset-0 z-[-10]">
        <Image src={world} alt="Star Wars Background" fill  style={{ objectFit: 'cover' }}  className="opacity-50" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <nav className="mb-8 flex justify-end items-center">
        <Link href="/films" className="text-blue-500 font-bold hover:scale-105 hover:underline mx-7 text-2xl">Back to Films</Link>
      </nav>
      <div className="max-w-6xl mx-auto bg-black bg-opacity-70 p-8 rounded-2xl flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">{movie.title} - Episode {movie.episode_id}</h2>
          <p className="mb-4">Director: {movie.director}</p>
          <h3 className="text-3xl font-semibold mb-4">Characters:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character, index) => (
              <li key={index} className="bg-gray-800 p-2 rounded shadow-lg flex items-center space-x-2">
                <Image src={genericimgchar} alt={character.name} className="w-8 h-8 rounded-full" />
                <Link href={character.url}>
                  <span className="text-sm text-white">{character.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <Image src={moviesGeneric} alt="Film Image" className="w-full h-auto mb-8" />
        </div>
      </div>
    </div>
  );
}
