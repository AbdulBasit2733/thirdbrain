import React from "react";
import { YouTubeEmbed } from "../YoutubeEmbed";
import { TwitterEmbed } from "../TwitterEmbed";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DataProps } from "@/app/types/types";


const Card = ({ data }: { data: DataProps }) => {
  return (
    <div className="shadow p-2 max-w-sm rounded-lg">
      {data.type === "YOUTUBE" ? (
        <YouTubeEmbed url={data.url} />
      ) : data.type === "TWITTER" ? (
        <TwitterEmbed url={data.url} />
      ) : null}
      <h1 className="my-2 text-lg font-semibold">{data.title}</h1>
      <div className="flex flex-wrap items-center gap-2">
        {data.tags.map((tag, index) => (
          <div className="text-[10px] bg-indigo-500 text-white px-3 py-1 rounded-full uppercase font-medium" key={index}>{tag}</div>
        ))}
      </div>
      <Link
        href={"/readmore/"}
        className="text-indigo-600 inline-flex items-center gap-x-1 hover:gap-x-2 transition-all ease-in-out duration-300 justify-end w-full px-4 py-1 font-bold text-xs mt-4"
      >
        Read More
        <ArrowRight />
      </Link>
    </div>
  );
};

export default Card;
