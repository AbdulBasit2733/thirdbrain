import React, { useRef, useState } from "react";
import CrossIcon from "../Icons/CrossIcon";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import BACKEND_URL from "../../config";
import { toast } from "react-toastify";


enum ContentType {
  Youtube = 'youtube',
  Twitter = 'twitter'
}
const CreateContentModal = ({ open, onClose }) => {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
 const [type, setType] = useState(ContentType.Youtube);

  const handleCreateContent = async () => {

      const title =  titleRef.current?.value
      const link = linkRef.current?.value
    
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/content/create-content`,
      {
        title,
        link,
        type
      },
      { withCredentials: true }
    );
    if(response.data.success){
      toast.success(response.data.message);
    }else{
      toast.error(response.data.message);
    }
  };
  return (
    <>
      {open && (
        <div className="bg-gray-50 h-screen w-screen fixed top-0 left-0 flex justify-center items-center">
          <div className="bg-white flex flex-col justify-center rounded-md shadow-2xl">
            <span className="p-4 rounded-md">
              <div className="flex justify-end">
                <button onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </button>
              </div>
              <div className="mt-3 space-y-2 mb-3">
                <Input refs={titleRef} placeholder={"Title"} />
                <Input refs={linkRef} placeholder={"Link"} />
              </div>
              <h1 className="text-lg font-semibold mb-4">Type</h1>
              <div className="flex gap-2 items-center mb-5">
                <Button onClick={() => setType(ContentType.Youtube)} text={"Youtube"} variant={type === ContentType.Youtube ? 'primary' : 'secondary'} />
                <Button onClick={() => setType(ContentType.Twitter)} text={"Twitter"} variant={type === ContentType.Twitter ? 'primary' : 'secondary'} />
              </div>
              <div className="flex">
                <Button onClick={handleCreateContent} variant="primary" text={"Submit"} />
              </div>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateContentModal;
