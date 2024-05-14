import React from 'react';
import { MovieList } from '../../services/movieService';

export default function FilmsPage() {
  return (
    <main className="bg-gray-900 text-yellow-400 min-h-screen p-8">
      <div className="text-4xl mb-8">Films Page</div>
      <MovieList />
    </main>
  );
}