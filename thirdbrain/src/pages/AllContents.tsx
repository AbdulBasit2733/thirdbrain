import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import useContent from "../hooks/useContent";
import PlusIcon from "../Icons/PlusIcon";
import CreateContentModal from "../components/CreateContentModal";
import Card from "../components/Card";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { allContents } from "../store/content-slice";

const AllContents = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, isLoading } = useSelector((state) => state.content);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(allContents(signal));

    return () => {
      controller.abort(); // Cleanup: abort the request
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
      <div className="flex-1">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="flex gap-3 flex-wrap mt-10">
            {!contents || contents.length === 0 ? (
              <h1 className="text-2xl font-semibold">
                No Content is Available. Please Create Content First.
              </h1>
            ) : (
              contents.map(({ type, title, link, _id }) => (
                <Card key={_id} type={type} title={title} link={link} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContents;
