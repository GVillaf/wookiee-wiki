import Link from "next/link";


async function getCharacters() {
  const res = await fetch("http://localhost:3000/api/characters");
  return res.json();
}


export async function CharacterList() {
  const characters = await getCharacters();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {characters.characters.map((character) => (
        <div
          key={character.id}
          className="card bg-gray-800 p-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <h3 className="text-2xl font-bold">{character.name}</h3>
          <p>Eye Color: {character.eye_color}</p>
          <p>Gender: {character.gender}</p>
          <img
            src="/generic-character-image.jpg"
            alt="Generic Character"
            className="w-full h-auto my-4"
          />
          <Link href={`/characters/${character.id}`}>Ver Detalles</Link>
        </div>
      ))}
    </div>
  );
}


export async function getCharacterDetails(id) {
  const response = await fetch(`http://localhost:3000/api/characters/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch character details");
  }
  return response.json();
}


export async function getCharacterNames(characterUrls) {
  const characterDetails = await Promise.all(
    characterUrls.map(async (url) => {
      const res = await fetch(url);
      const character = await res.json();
      return {
        name: character.name,
        url: `/characters/${character.url.match(/\/(\d+)\/$/)[1]}`,
      };
    })
  );
  return characterDetails;
}
