import React, { useState } from "react";
import CreateContentModal from "../../components/CreateContentModal";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import PlusIcon from "../../Icons/PlusIcon";
import ShareIcon from "../../Icons/ShareIcon";
import Card from "../../components/Card";
import useContent from "../../hooks/useContent";
import axios from "axios";
import BACKEND_URL from "../../../config";
import { toast } from "react-toastify";

const Dasboard = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [text, setText] = useState("");

  const contents = useContent();
  //   console.log(contents);

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="p-5 flex-1">
        <CreateContentModal
          open={modelOpen}
          onClose={() => setModelOpen(!open)}
        />

        <div className="flex gap-3 items-center justify-end">
          <Button
            onClick={() => {
              setModelOpen(true);
            }}
            variant="primary"
            text={"Add Content"}
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/content/brain/share`,
                  {
                    share: true,
                  },
                  { withCredentials: true }
                );
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                await window.navigator.clipboard.writeText(shareUrl);
                toast.success("Copied The Url");
              } catch (error) {
                console.log(error);
                toast.error(error?.message);
              }
            }}
            variant="secondary"
            text={"Share Brain"}
            startIcon={<ShareIcon />}
          />
        </div>
        <div className=" flex gap-3 mt-10">
          {contents &&
            contents.map(({ type, title, link, _id }) => (
              <Card key={_id} type={type} title={title} link={link} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
