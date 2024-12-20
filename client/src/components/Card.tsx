import { toast } from "react-toastify";
import ShareIcon from "./Icons/ShareIcon";
import DeleteIcon from "./Icons/DeleteIcon";
import { useAppDispatch } from "../hooks/hooks";
import { deleteContent, myContents } from "../store/content-slice";
import { useEffect } from "react";
import { TagProps } from "../store/content-slice/contentTypes";

interface CardProps {
  contentId?: string | null;
  title: string | null;
  link: string | null;
  type: "twitter" | "youtube" | null | string;
  username?: string | null;
  tags: Array<TagProps> | [];
}

const Card = ({ title, link, type, username, contentId, tags }: CardProps) => {
  const dispatch = useAppDispatch();

  const normalizedLink =
    typeof link === "string" ? link.replace("x.com", "twitter.com") : "";
  const youtubeEmbedLink =
    typeof link === "string" && link.includes("watch")
      ? link.replace("watch?v=", "embed/")
      : link;

  const handleDelete = async () => {
    try {
      console.log(contentId);
      dispatch(deleteContent(contentId)).then((data) => {
        if (data.payload.success) {
          toast.success(data.payload.message);
          dispatch(myContents());
        } else {
          toast.error(data.payload.message);
        }
      });
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };
  useEffect(() => {
    if (type === "twitter" && normalizedLink) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);

      // Cleanup to prevent duplication
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type, normalizedLink]);

  return (
    <div>
      <div className="shadow bg-white rounded-md border-[1.5px] border-gray-300 max-w-80 min-h-48 min-w-72 sm:min-w-full">
        <div className="p-1 rounded-md">
          {type === "youtube" && youtubeEmbedLink && (
            <iframe
              className="w-full max-h-48 sm:min-h-64 rounded-md"
              src={youtubeEmbedLink}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && normalizedLink && (
            // <blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">The name&#39;s devs, 100x Devs. <a href="https://t.co/rtkvr60R8i">pic.twitter.com/rtkvr60R8i</a></p>&mdash; 100xDevs (@100xDevs) <a href="https://twitter.com/100xDevs/status/1864654110290743473?ref_src=twsrc%5Etfw">December 5, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            <blockquote className="twitter-tweet">
              <a href={normalizedLink}></a>
            </blockquote>
          )}
        </div>
        <div className="flex items-center justify-between px-2 py-3">
          <div className="text-gray-500">
            <h1 className="text-black font-semibold text-ellipsis overflow-hidden text-sm mb-0.5">
              {title}
            </h1>
            <p className="font-normal text-sm">{username}</p>
            {tags && tags.length > 0 ? (
              <div className="text-xs bg-orange-200 text-orange-500 font-semibold w-fit px-2 py-1 rounded-md mt-2">
                {tags.map((t) => (
                  <p key={t._id}>{t.title}</p>
                ))}
              </div>
            ) : null}
          </div>
          <div className="flex gap-5 items-center text-gray-500">
            <a
              href={link ? link : ""}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <ShareIcon />
            </a>
            <button onClick={handleDelete}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
