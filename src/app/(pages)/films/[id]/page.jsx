'use client'

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getMovieDetails } from '../../../services/movieService';
import { getCharacterNames } from '../../../services/characterService';

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

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!movie) return <p className="text-center text-white">Movie not found.</p>;

  return (
    <div className="bg-gray-900 text-yellow-400 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">{movie.title} - Episode {movie.episode_id}</h2>
        <p className="mb-4">Director: {movie.director}</p>
        <img src="/generic-film-image.jpg" alt="Film Image" className="w-full h-auto mb-8" />
        <div>
          <h3 className="text-3xl font-semibold mb-4">Characters:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {characters.map((character, index) => (
              <li key={index} className="bg-gray-800 p-4 rounded shadow-lg">
                <a href={character.url} className="flex items-center space-x-4">
                  <img src="/generic-character-image.jpg" alt={character.name} className="w-12 h-12 rounded-full" />
                  <span>{character.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}