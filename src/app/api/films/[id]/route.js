import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const response = await fetch(`https://swapi.dev/api/films/${id}/`);
    if (!response.ok) {
      return NextResponse.json({
        error: "Movie not found",
      });
    }
    const film = await response.json();
    return NextResponse.json({
      title: film.title,
      episode_id: film.episode_id,
      director: film.director,
      characters: film.characters,
    });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while fetching the movie data",
    });
  }
}