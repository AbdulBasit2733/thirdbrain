import type React from "react"

interface YouTubeEmbedProps {
  url: string
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
  // const videoId = url.split("si=")[1]
  // const videoUrl = url.split("si=")[0]
  // if (!videoId) return null
  // console.log(`${url}?si=${videoId}`);
  // console.log(`${videoUrl}`);
  if(!url) return null
  
  return (
    <div className="aspect-w-16 aspect-h-9 mb-4">
      <iframe
        src={`${url}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-md"
      />
    </div>
  )
}

