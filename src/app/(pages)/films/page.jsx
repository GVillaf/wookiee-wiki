import React from 'react';
import { MovieList } from '../../services/movieService';
import Link from 'next/link';

export default function FilmsPage() {
  return (
    <main className="bg-gray-900 text-yellow-400 min-h-screen p-8">
       <nav className="mb-8">
        <Link href="/" className="text-blue-500 hover:underline">Home</Link>
      </nav>
      <div className="text-4xl mb-8">Films Page</div>
      <MovieList />
    </main>
  );
}