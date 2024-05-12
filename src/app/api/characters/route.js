import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const response = await fetch("https://swapi.dev/api/people/");
    const data = await response.json();
    const characters = data.results.map((character) => ({
      name: character.name,
      eye_color:
        character.eye_color !== "n/a" ? character.eye_color : undefined,
      gender: character.gender !== "n/a" ? character.gender : undefined,
      id: character.url.match(/\/(\d+)\/$/)[1],
    }));
    return NextResponse.json({ characters });
  } catch (error) {
    return NextResponse({
      error: "Error retrieving characters",
    });
  }
};
