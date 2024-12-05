import React, { useEffect, useState } from "react";
import Button from "./Button";
import useContent from "../hooks/useContent";
import PlusIcon from "../Icons/PlusIcon";
import CreateContentModal from "./CreateContentModal";
import Card from "./Card";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { allContents } from "../store/content-slice";

const Main = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, isLoading } = useSelector((state) => state.content);
  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(allContents(signal));
    return () => {
      controller.abort();
    };
  }, [dispatch]);
  return (
    <div className="flex-1">
      <div className="flex justify-end mb-5">
        <Button
          onClick={() => {
            setModelOpen(true);
          }}
          variant="primary"
          text={"Add Content"}
          startIcon={<PlusIcon />}
        />
      </div>
      {isLoading ? (
        <h1 className="text-center text-4xl">Loading</h1>
      ) : (
        <div className="flex-1">
          <CreateContentModal
            open={modelOpen}
            onClose={() => setModelOpen(!open)}
          />
          <div className=" flex gap-3 flex-wrap mt-10">
            {!contents || contents.length === 0 ? (
              <h1 className="text-2xl font-semibold">
                No Content is Available Please Create Content First
              </h1>
            ) : (
              contents.map(({ type, title, link, _id, userId, tags }) => (
                <Card contentId={_id} username={userId.username} key={_id} type={type} title={title} link={link} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
