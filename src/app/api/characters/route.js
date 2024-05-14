import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;
  const offset = (page - 1) * limit;

  try {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    const data = await response.json();
    const characters = data.results.map(character => ({
      name: character.name,
      id: character.url.match(/\/(\d+)\/$/)[1],
      eye_color: character.eye_color,
      gender: character.gender,
    }));

    return NextResponse.json({ characters, total: data.count });
  } catch (error) {
    return NextResponse.json({
      error: "Error retrieving characters",
    });
  }
}