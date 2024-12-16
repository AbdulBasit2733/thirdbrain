import React, { useEffect, useState } from "react";
import CreateContentModal from "../components/CreateContentModal";
import Button from "../components/Button";
import PlusIcon from "../components/Icons/PlusIcon";
import Card from "../components/Card";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { myContents } from "../store/content-slice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { ContentProps } from "../store/content-slice/contentTypes";

const Dashboard: React.FC = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, isLoading } = useAppSelector((state) => state.contents);
  console.log(contents);
  

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(myContents()).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message);
      } else {
        toast.error(data.payload.message);
      }
    });
  }, [dispatch]);

  return (
    <div className="flex-1">
      <div className="flex justify-end mb-5">
        <Button
          onClick={() => setModelOpen(true)}
          variant="primary"
          text="Add Content"
          startIcon={<PlusIcon />}
        />
      </div>
      {isLoading ? (
       <Loading />
      ) : (
        <div className="flex-1">
          <CreateContentModal open={modelOpen} onClose={() => setModelOpen(false)} />
          <div>
            <h1 className="text-2xl font-bold my-5">Feed</h1>
            <div className="flex gap-3 flex-wrap">
              {(!contents || contents.length === 0) ? (
                <h1 className="text-2xl font-semibold">
                  No Content is Available. Please Create Content First.
                </h1>
              ) : (
                contents.map(({ _id, contentLink, contentType, title, tags, userId }:ContentProps) => (
                  <Card
                    key={_id}
                    contentId={_id}
                    username={userId?.username || null}
                    type={contentType || null}
                    title={title}
                    link={contentLink}
                    tags={tags ? tags : []}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
