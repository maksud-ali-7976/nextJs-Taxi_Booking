import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'
const BASE_URL = 'https://api.mapbox.com/search/searchbox/v1/suggest'
const access_token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
export async function GET(req: any) {
    const { searchParams } = new URL(req.url);
    const searchText = searchParams.get('q');
    const sessionToken = uuidv4();
    const res = await fetch(`${BASE_URL}?q=${searchText}&language=en&limit=3&session_token=${sessionToken}&country=IN&access_token=${access_token}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const searchResult = await res.json();
    return NextResponse.json(searchResult)
}