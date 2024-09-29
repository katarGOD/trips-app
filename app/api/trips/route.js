import { NextResponse } from "next/server";
const jsonServerURL = 'http://localhost:9000'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const keyword = searchParams.get('keyword') || ''
  
  try {
    const response = await fetch(`${jsonServerURL}/trips`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const trips = await response.json();

    const filteredTrips = trips.filter(trip =>
      trip.title.toLowerCase().includes(keyword.toLowerCase()) ||
      trip.description.toLowerCase().includes(keyword.toLowerCase()) ||
      trip.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
    );

    return NextResponse.json(filteredTrips);

  } catch (error) {
    console.error("Error fetching trips:", error);
    
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 }
    );
  }
}
