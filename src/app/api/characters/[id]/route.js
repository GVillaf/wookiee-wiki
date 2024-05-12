import { NextResponse } from "next/server";

export async function GET(req) {
  const { id } = req.query;

  try {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    const character = await response.json();
    const filteredCharacter = {
      name: character.name,
      eye_color:
        character.eye_color !== "n/a" && character.eye_color !== "unknown"
          ? character.eye_color
          : undefined,
      hair_color:
        character.hair_color !== "n/a" && character.hair_color !== "unknown"
          ? character.hair_color
          : undefined,
      skin_color:
        character.skin_color !== "n/a" && character.skin_color !== "unknown"
          ? character.skin_color
          : undefined,
      height: character.height,
      mass: character.mass,
      gender:
        character.gender !== "n/a" && character.gender !== "unknown"
          ? character.gender
          : undefined,
    };
    return NextResponse.json(filteredCharacter);
  } catch (error) {
    return NextResponse.json({
      error: "Character not found",
    });
  }
}
