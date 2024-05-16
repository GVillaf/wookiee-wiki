import React from 'react';
import { MovieList } from '../../services/movieService';
import Link from 'next/link';
import Image from 'next/image';
import world from '@/assets/images/world.webp';

export default function FilmsPage() {
  return (
    <main className="bg-center text-yellow-400 min-h-screen md:h-screen relative w-full">

      <div className="absolute inset-0 z-[-10]">
        <Image src={world} alt="Star Wars Background" fill style={{ objectFit: 'cover' }}
          className="opacity-50" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <nav className="mb-8 flex justify-end items-center p-4">
        <Link href="/" className="text-blue-500 font-bold hover:scale-105 hover:underline md:mx-16 text-2xl">Home</Link>
      </nav>

      <div className="text-6xl mb-4 font-bold text-center flex-grow">Films Page</div>

      <div className="bg-black bg-opacity-70 pt-8 pb-5 rounded-2xl max-h-full md:mx-16 flex-grow">
        <MovieList />
      </div>
    </main>
  );
}