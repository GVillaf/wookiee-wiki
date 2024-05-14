import { NextResponse } from "next/server";

// Función para obtener todos los personajes de SWAPI
async function fetchAllCharacters() {
  let characters = [];
  let nextUrl = 'https://swapi.dev/api/people/';
  
  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    characters = characters.concat(data.results);
    nextUrl = data.next;
  }

  return characters;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;
  const eyeColor = searchParams.get('eye_color');
  const gender = searchParams.get('gender');
  const offset = (page - 1) * limit;

  try {
    let characters = await fetchAllCharacters();

    characters = characters.map(character => ({
      name: character.name,
      id: character.url.match(/\/(\d+)\/$/)[1],
      eye_color: character.eye_color,
      gender: character.gender,
    }));

    if (eyeColor) {
      characters = characters.filter(character => character.eye_color === eyeColor);
    }

    if (gender) {
      characters = characters.filter(character => character.gender === gender);
    }

    const total = characters.length;
    const paginatedCharacters = characters.slice(offset, offset + limit);

    return NextResponse.json({ characters: paginatedCharacters, total });
  } catch (error) {
    return NextResponse.json({
      error: "Error retrieving characters",
    });
  }
}