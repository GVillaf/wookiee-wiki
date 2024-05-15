import React from 'react';
import { CharacterList } from '../../services/characterService';
import Link from 'next/link';
import Image from 'next/image';
import world from '@/app/assets/images/world.webp';

export default function CharactersPage() {
  return (
    <main className="bg-center text-yellow-400 min-h-screen p-8 md:max-h-screen overflow-y-hidden relative w-full md:h-screen">
      <div className="absolute inset-0 z-[-10]">
        <Image src={world} alt="Star Wars Background" layout="fill" objectFit="cover" className="opacity-50" />
        <div className="absolute inset-0 bg-black opacity-50"></div> 
      </div>
      <nav className="mb-8 flex justify-end items-center">
        <Link href="/" className="text-blue-500 font-bold hover:scale-105 hover:underline mx-7 text-2xl">Home</Link>
      </nav>
      <div className="text-6xl mb-8 font-bold text-center">Characters Page</div>
      <div className="bg-black bg-opacity-70 p-8 rounded-2xl overflow-auto max-h-full">
        <CharacterList />
      </div>
    </main>
  );
}
