import Link from 'next/link';
import Image from 'next/image';
import characterGeneric from '@/assets/images/darth.webp';

async function getMovies() {
  const res = await fetch('http://localhost:3000/api/films');
  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }
  return res.json();
}

export async function MovieList() {
  const movies = await getMovies();
  return (
    <div className="mx-12 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.films.map((movie) => (
        <Link key={movie.id} href={`/films/${movie.id}`} className="transform hover:scale-105 transition-transform m-3 duration-300">
          <div className="bg-gray-800 rounded shadow-lg flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>
            <p className="">Episode {movie.episode_id}</p>
            <div className=" mb-4">
              <Image
                src={characterGeneric}
                alt="character Generic"
     
                width={200}
                height={200}
                objectFit="contain"
                priority
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export async function getMovieDetails(id) {
  const response = await fetch(`http://localhost:3000/api/films/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
}
