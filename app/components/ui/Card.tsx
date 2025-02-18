import React from "react";
import { YouTubeEmbed } from "../YoutubeEmbed";
import { TwitterEmbed } from "../TwitterEmbed";

const Card = ({ data }) => {
  return (
    <div>
      {data.type === "youtube" ? (
        <YouTubeEmbed url={data.url} />
      ) : (
        <TwitterEmbed url={data.url} />
      )}
      <div className="flex items-center gap-x-4">
        {data.tags && data.tags.length !== 0
          ? data.tags.map((tag, index) => <div key={index}>{tag.tag}</div>)
          : null}
      </div>
    </div>
  );
};

export default Card;
