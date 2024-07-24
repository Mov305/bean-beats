'use client'

import { type PutBlobResult } from '@vercel/blob'
import { upload } from '@vercel/blob/client'
import { useState, useRef } from 'react'

export default function UploadImage() {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)

  const handleCreateSong = async (bolburl: String) => {
    const song = {
      title: 'title',
      duration: 0,
      price: 0,
      fileURL: bolburl || "No file selected",
    }

    const response = await fetch('/api/song', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(song),
    })

    if (response.ok) {
      console.log('Song created')
    } else {
      console.error('Failed to create song')
    }
  }
  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault()

          if (!inputFileRef.current?.files) {
            throw new Error('No file selected')
          }

          const file = inputFileRef.current.files[0]

          const newBlob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/upload',
          })

          setBlob(newBlob)
          console.log('Blob URL:', newBlob.url)

          handleCreateSong(newBlob.url)
        }}>
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  )
}
