import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    if (!response.ok) {
      return NextResponse.json({
        error: "Character not found",
      });
    }
    const character = await response.json();
    return NextResponse.json({
      name: character.name,
      eye_color: character.eye_color,
      gender: character.gender,
      birth_year: character.birth_year,
      hair_color: character.hair_color,
      height: character.height,
      skin_color: character.skin_color,
      mass: character.mass,
    });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while fetching the character data",
    });
  }
}
