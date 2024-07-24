import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/artist
export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json()

  console.log(body)

  const {name, image} = body

  try {
    const song = await prisma.artist.create({
      data: {
        name,
        image,
      },
    })
    return NextResponse.json(song)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    )
  }
}

// GET /api/artist
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParameters = request.nextUrl.searchParams
    let limit = searchParameters.get('limit') as string
    let skip = searchParameters.get('skip') as string

    const artists = await prisma.artist.findMany({
      take: parseInt(limit) || 20,
      skip: parseInt(skip) || 0,
    })
    return NextResponse.json(artists)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    )
  }
}
