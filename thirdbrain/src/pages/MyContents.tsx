import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import PlusIcon from "../Icons/PlusIcon";
import CreateContentModal from "../components/CreateContentModal";
import { useSelector, useDispatch } from "react-redux";
import { UserContents } from "../store/content-slice";
import Card from "../components/Card";

const MyContents = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, isLoading } = useSelector((state) => state.content);
  console.log(contents);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(UserContents(signal));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <div className="flex-1">
      <div className="flex justify-end mb-5">
        <Button
          onClick={() => setModelOpen(true)}
          variant="primary"
          text={"Add Content"}
          startIcon={<PlusIcon />}
        />
      </div>

      <CreateContentModal
        open={modelOpen}
        onClose={() => setModelOpen(false)}
      />

      <div className="flex-1">
        {isLoading ? (
          <h1 className="text-center text-4xl">Loading...</h1>
        ) : (
          <div className="flex gap-3 flex-wrap mt-10">
            {!contents || contents.length === 0 ? (
              <h1 className="text-2xl font-semibold">
                No Content is Available. Please Create Content First.
              </h1>
            ) : (
              contents.map(({ type, title, link, _id, userId }) => (
                <Card contentId={_id} username={userId.username} key={_id} type={type} title={title} link={link} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContents;
