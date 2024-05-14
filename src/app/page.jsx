import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-gray-900 text-yellow-400 min-h-screen flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-6xl font-bold">WookieeWiki</h1>
      <p className="text-2xl mb-8">"Explore the Galaxy of Star Wars"</p>
      <div className="flex flex-wrap justify-center gap-8">
        <Link href="/films">
          <div className="w-80 h-60 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col items-center justify-center p-4">
            <img src="/path-to-film-icon.svg" alt="Films" className="w-24 h-24 mb-4" />
            <h2 className="text-3xl font-bold">Películas</h2>
          </div>
        </Link>
        <Link href="/characters">
          <div className="w-80 h-60 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col items-center justify-center p-4">
            <img src="/path-to-character-icon.svg" alt="Characters" className="w-24 h-24 mb-4" />
            <h2 className="text-3xl font-bold">Personajes</h2>
          </div>
        </Link>
      </div>
    </main>
  );
}
