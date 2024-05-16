import Link from 'next/link';
import Image from 'next/image';
import image1 from '@/assets/images/character.webp';

export default function Home() {
  return (
    <main className="bg-cover bg-center text-yellow-400 min-h-screen flex flex-col items-center justify-between p-8 md:max-h-screen overflow-y-hidden relative w-full md:h-screen">
      <div className="absolute inset-0 z-[-10]">
        <Image src={image1} alt="Star Wars Background" fill style={{ objectFit: 'cover' }} className="opacity-60" />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      <div className="flex flex-col items-center mt-12">
        <h1 className="md:text-6xl text-5xl font-bold text-center">WookieeWiki</h1>
        <p className="text-2xl text-center mt-4 font-bold">&quot;Explore the Star Wars Galaxy&quot;</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        <Link href="/films">
          <div className="px-11 py-2 bg-gray-800 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center justify-center p-4 border-4 border-red-500 hover:border-red-500">
            <h2 className="text-xl font-bold text-red-500">Films</h2>
          </div>
        </Link>
        <Link href="/characters">
          <div className="py-2 bg-gray-800 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center justify-center p-4 border-4 border-blue-500 hover:border-blue-500">
            <h2 className="text-xl font-bold text-blue-500">Characters</h2>
          </div>
        </Link>
      </div>
    </main>
  );
}
