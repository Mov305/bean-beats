import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/song
export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json()

  console.log(body)

  const { title, artistId, albumId, duration, price, fileURL } = body

  try {
    const song = await prisma.song.create({
      data: {
        title,
        artistId,
        albumId,
        duration,
        price,
        fileURL,
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

// GET /api/song by artistId or albumId or limit and skip
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParameters = request.nextUrl.searchParams
    let limit = searchParameters.get('limit') as string
    let skip = searchParameters.get('skip') as string
    let artistId = searchParameters.get('artistId') as string
    let albumId = searchParameters.get('albumId') as string
    const songs = await prisma.song.findMany({
      take: parseInt(limit) || 20,
      skip: parseInt(skip) || 0,
      where: {
        artistId: artistId || undefined,
        albumId: albumId || undefined,
      },
    })
    return NextResponse.json(songs)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    )
  }
}
