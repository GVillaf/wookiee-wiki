import { NextResponse } from "next/server"

export const GET = async () => {
    try{
        const response = await fetch('https://swapi.dev/api/films/')
        const { results } = await response.json()
        const films = results.map(film => ({
            title: film.title,
            episode_id: film.episode_id,
            id: film.url.match(/\/(\d+)\/$/)[1],
        }))
        return NextResponse.json({ films })
    } catch(error){
        return NextResponse.json({
            error: "Error retrieving movies"
        })
    }
    
}