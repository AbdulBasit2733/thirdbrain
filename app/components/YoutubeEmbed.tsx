import type React from "react"

interface YouTubeEmbedProps {
  url: string
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
  const videoId = url.split("v=")[1]
  if (!videoId) return null

  return (
    <div className="aspect-w-16 aspect-h-9 mb-4">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-md"
      />
    </div>
  )
}

