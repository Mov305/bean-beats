import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/song/:id
export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params
  try {
    const song = await prisma.song.findUnique({
      where: {
        id: id,
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

// PUT /api/song/:id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params
  const body = await request.json()

  const { title, artistId, albumId, duration, price, fileURL } = body

  try {
    const song = await prisma.song.update({
      where: {
        id: id,
      },
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

// DELETE /api/song/:id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params

  try {
    const song = await prisma.song.delete({
      where: {
        id: id,
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
