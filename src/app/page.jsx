import Link from 'next/link'

export default function Home() {
  return (
    <main >
      <section className="min-h-screen bg-pattern">

        <h1 className="text-5xl font-bold">WookieeWiki</h1>
        <p className="text-2xl">"Explore the Galaxy of Star Wars"</p>
        <button className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Begin the Adventure
        </button>
      </section>
      <section>
        <div className="z-10 mt-[100vh] flex flex-col items-center justify-center">
          <Link href="/films">
           Películas
          </Link>
          <Link href="/characters">
            Personajes
          </Link>
        </div>
      </section>
    </main>
  );
}
