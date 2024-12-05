import ShareIcon from "../Icons/ShareIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import { useDispatch } from "react-redux";
import { deleteContent, UserContents } from "../store/content-slice";
import { toast } from "react-toastify";

interface CardProps {
  contentId: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  username: string;
}

const Card = ({ title, link, type, username, contentId }: CardProps) => {
  const normalizedLink = link.replace("x.com", "twitter.com");
  const dispatch = useDispatch();

  return (
    <div>
      <div className="shadow bg-white rounded-md border-[1.5px] border-gray-300 max-w-80 min-h-48 min-w-72">
        <div className="p-1 rounded-md">
          {type === "youtube" && (
            <iframe
              className="w-full overflow-hidden rounded-md"
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
        <div className="flex items-center justify-between px-2 py-3">
          <div className=" text-gray-500">
            {/* <ShareIcon /> */}
            <h1 className="text-black font-semibold text-sm text-wrap mb-0.5">
              {title}
            </h1>
            <p className="font-normal text-sm">{username}</p>
          </div>
          <div className="flex gap-5 items-center text-gray-500">
            <a href={link} target="_blank" className="cursor-pointer">
              <ShareIcon />
            </a>
            <button
              onClick={() =>
                dispatch(deleteContent(contentId)).then((data) => {
                  if (data.payload.success) {
                    toast.success(data.payload.message);
                    dispatch(UserContents())
                  } else {
                    toast.error(data.payload.message);
                  }
                })
              }
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
