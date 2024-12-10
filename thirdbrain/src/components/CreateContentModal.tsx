import { useRef, useState } from "react";
import CrossIcon from "../Icons/CrossIcon";
import Button from "./Button";
import Input from "./Input";
import { toast } from "react-toastify";
import { createContent, userContents,  } from "../store/content-slice";
import { useAppDispatch } from "../hooks/useAppDispatch";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

// Props interface for the component
interface CreateContentModalProps {
  open: boolean;
  onClose: (openState: boolean) => void;
}

const CreateContentModal: React.FC<CreateContentModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  const handleCreateContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const tagTitle = tagRef.current?.value;

    if (!title || !link || !tagTitle) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await dispatch(
        createContent({ title, link, type, tagTitle })
      );
      console.log(response);
      
      if (response.payload.success) {
        toast.success(response.payload.message);
        onClose(false);
        dispatch(userContents());
      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      toast.error("An error occurred while creating content.");
    }
  };

  return (
    <>
      {open && (
        <div className="bg-gray-50 h-screen w-screen fixed top-0 left-0 flex justify-center items-center">
          <div className="bg-white flex flex-col justify-center rounded-md shadow-2xl w-96">
            <span className="p-4 rounded-md w-full">
              <div className="flex mb-5 items-center justify-between">
                <h1 className="text-xl font-semibold">Create Content</h1>
                <button
                  onClick={() => onClose(false)}
                  className="cursor-pointer hover:bg-indigo-100 transition-all p-2 rounded-lg"
                >
                  <CrossIcon />
                </button>
              </div>
              <div className="mt-3 space-y-2 mb-3">
                <Input refs={titleRef} placeholder="Title" />
                <Input refs={linkRef} placeholder="Link" />
                <Input refs={tagRef} placeholder="Tags" />
              </div>
              <h1 className="text-lg font-semibold mb-4">Type</h1>
              <div className="flex gap-2 items-center mb-5">
                <Button
                  onClick={() => setType(ContentType.Youtube)}
                  text="Youtube"
                  variant={
                    type === ContentType.Youtube ? "primary" : "secondary"
                  }
                />
                <Button
                  onClick={() => setType(ContentType.Twitter)}
                  text="Twitter"
                  variant={
                    type === ContentType.Twitter ? "primary" : "secondary"
                  }
                />
              </div>
              <div className="flex">
                <Button
                  onClick={handleCreateContent}
                  variant="primary"
                  text="Submit"
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
