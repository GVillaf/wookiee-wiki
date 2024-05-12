import { NextResponse } from "next/server";

export async function GET(req) {
  const { id } = req.query;

  try {
    const response = await fetch(`https://swapi.dev/api/films/${id}`);
    const film = await response.json();
    return NextResponse.json({
      title: film.title,
      episode_id: film.episode_id,
      director: film.director,
      characters: film.characters,
    });
  } catch (error) {
    return NextResponse({
      error: "Movie not found",
    });
  }
}
