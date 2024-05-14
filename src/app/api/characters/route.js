import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch('https://swapi.dev/api/people/');
    const { results } = await response.json();
    const characters = results.map(character => ({
      name: character.name,
      id: character.url.match(/\/(\d+)\/$/)[1],
      eye_color: character.eye_color,
      gender: character.gender,
    }));
    return NextResponse.json({ characters });
  } catch (error) {
    return NextResponse.json({
      error: "Error retrieving characters",
    });
  }
}
