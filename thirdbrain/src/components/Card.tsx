
import ShareIcon from "../Icons/ShareIcon";
import DeleteIcon from "../Icons/DeleteIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

const Card = ({ title, link, type }: CardProps) => {

  const normalizedLink = link.replace("x.com", "twitter.com");
  
  return (
    <div>
      <div className="shadow bg-white rounded-md border-[1.5px] border-gray-300  p-4 max-w-72 min-h-48 min-w-72">
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-5 text-gray-500">
            <ShareIcon />
            <h1 className="text-black font-semibold text-sm">{title}</h1>
          </div>
          <div className="flex gap-2 items-center text-gray-500">
            <a href={link} target="_blank" className="cursor-pointer">
              <ShareIcon />
            </a>
            <DeleteIcon />
          </div>
        </div>
        <div className=" pt-5">
          {type === "youtube" && (
            <iframe
              className=" w-full"
              src={link.replace("watch", "embed")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && link && (
            <blockquote className="twitter-tweet">
              <a href={normalizedLink}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
