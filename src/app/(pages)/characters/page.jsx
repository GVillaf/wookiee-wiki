import React from 'react';
import { CharacterList } from '../../services/characterService';

export default function CharactersPage() {
  return (
    <main className="bg-gray-900 text-yellow-400 min-h-screen p-8">
      <div className="text-4xl mb-8">Characters Page</div>
      <CharacterList />
    </main>
  );
}