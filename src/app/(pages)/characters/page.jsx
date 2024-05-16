import React from 'react';
import { CharacterList } from '../../services/characterService';
import Link from 'next/link';
import Image from 'next/image';
import world from '@/assets/images/world.webp';

export default function CharactersPage() {
  return (
    <main className="bg-center text-yellow-400 min-h-screen md:h-screen relative w-full ">
      <div className="absolute inset-0 z-[-10]">
        <Image src={world} layout="fill" alt='world' objectFit="cover" className="opacity-50" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <nav className="mb-8 flex justify-end items-center">
        <Link href="/" className="text-blue-500 font-bold hover:underline hover:scale-105 mx-7 md:pr-16 text-2xl">Home</Link>
      </nav>
      <div className="md:text-6xl text-5xl mb-8 font-bold text-center shadow-md">Characters Page</div>
      <div className="bg-black bg-opacity-70 px-6 pt-8 pb-5 rounded-2xl max-h-full md:mx-16 flex-grow">
        <CharacterList />
      </div>
    </main>
  );
}