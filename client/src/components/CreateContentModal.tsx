import { useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import CrossIcon from "./Icons/CrossIcon";
import { useAppDispatch } from "../hooks/hooks";
import { createContent, myContents } from "../store/content-slice";
import { toast } from "react-toastify";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}
const CreateContentModal = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const tagRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube);

  const handleCreateContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const tagTitle = tagRef.current?.value;
    if (title && link && tagTitle && type) {
      dispatch(createContent({ title, link, tagTitle, type })).then((data) => {
        if (data.payload.success) {
          toast.success(data.payload.message);
          dispatch(myContents());
          onClose();
        }
      });
    } else {
      toast.error("All Fields Are Required");
    }
  };
  return (
    <>
      {open && (
        <div className="backdrop-brightness-50 h-screen w-screen fixed top-0 left-0 flex justify-center items-center">
          <div
            className={`${
              open
                ? "w-96 transition-all ease-out duration-1000 bg-white flex flex-col justify-center rounded-md shadow-2xl"
                : "w-0 transition-all duration-1000"
            }`}
          >
            <span className="p-4 rounded-md w-full">
              <div className="flex mb-5 items-center justify-between">
                <h1 className="text-xl font-semibold">Create Content</h1>
                <button
                  onClick={onClose}
                  className="cursor-pointer hover:bg-indigo-100 transition-all p-2 rounded-lg"
                >
                  <CrossIcon />
                </button>
              </div>
              <div className="mt-3 space-y-2 mb-3">
                <Input refs={titleRef} placeholder={"Title"} />
                <Input refs={linkRef} placeholder={"Link"} />
                <Input refs={tagRef} placeholder={"Tags"} />
              </div>
              <h1 className="text-lg font-semibold mb-4">Type</h1>
              <div className="flex gap-2 items-center mb-5">
                <Button
                  onClick={() => setType(ContentType.Youtube)}
                  text={"Youtube"}
                  variant={
                    type === ContentType.Youtube ? "primary" : "secondary"
                  }
                />
                <Button
                  onClick={() => setType(ContentType.Twitter)}
                  text={"Twitter"}
                  variant={
                    type === ContentType.Twitter ? "primary" : "secondary"
                  }
                />
              </div>
              <div className="flex">
                <Button
                  onClick={handleCreateContent}
                  variant="primary"
                  text={"Submit"}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateContentModal;
