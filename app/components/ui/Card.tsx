import React from "react";
import { YouTubeEmbed } from "../YoutubeEmbed";
import { TwitterEmbed } from "../TwitterEmbed";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DataProps {
  id: string;
  type: "YOUTUBE" | "TWITTER" | "DOC" | "IMAGE";
  url: string;
  tags: string[];
  notes: string;
}

const Card = ({ data }: { data: DataProps }) => {
  return (
    <div className="shadow p-2 max-w-xs rounded-lg">
      {data.type === "YOUTUBE" ? (
        <YouTubeEmbed url={data.url} />
      ) : data.type === "TWITTER" ? (
        <TwitterEmbed url={data.url} />
      ) : null}
      <div className="flex items-center gap-x-4">
        {data.tags.map((tag, index) => (
          <div className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-full uppercase font-medium" key={index}>{tag}</div>
        ))}
      </div>
      <Link
        href={"/readmore/"}
        className="text-indigo-600 inline-flex items-center gap-x-1 hover:gap-x-2 transition-all ease-in-out duration-300 justify-end w-full px-4 py-1 font-bold text-xs"
      >
        Read More
        <ArrowRight />
      </Link>
    </div>
  );
};

export default Card;
