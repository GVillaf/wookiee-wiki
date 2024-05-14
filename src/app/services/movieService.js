import Link from 'next/link';

async function getMovies() {
  const res = await fetch('http://localhost:3000/api/films');
  return res.json();
}

export async function MovieList() {
  const movies = await getMovies();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {movies.films.map(movie => (
        <div key={movie.id} className="card bg-gray-800 p-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-bold">{movie.title}</h3>
          <p>Episode {movie.episode_id}</p>
          {/* <img src="/generic-film-image.jpg" alt="Generic Film" className="w-full h-auto my-4" /> */}
          <Link href={`/films/${movie.id}`}>
        Ver Detalles
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getMovieDetails(id) {
  
    const response = await fetch(`http://localhost:3000/api/films/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    
    return  response.json();
}