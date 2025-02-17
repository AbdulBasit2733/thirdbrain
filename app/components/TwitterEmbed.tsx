"use client"

import type React from "react"
import { useEffect } from "react"

interface TwitterEmbedProps {
  url: string
}

export const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ url }) => {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="mb-4">
      <blockquote className="twitter-tweet" data-dnt="true">
        <a href={url}>Loading Tweet...</a>
      </blockquote>
    </div>
  )
}

