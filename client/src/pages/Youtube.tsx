import { useState } from "react";
import Button from "../components/Button";
import PlusIcon from "../components/Icons/PlusIcon";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import { useAppSelector } from "../hooks/hooks";
import Loading from "../components/Loading";
import { ContentProps } from "../store/content-slice/contentTypes";

const Youtube = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, isLoading } = useAppSelector((state) => state.contents);
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
        <Loading />
      ) : (
        <div className="flex-1">
          <CreateContentModal
            open={modelOpen}
            onClose={() => setModelOpen(!open)}
          />
          <div>
            <h1 className="text-2xl font-bold my-5">YoutTube Contents</h1>
            <div className=" flex gap-3 flex-wrap">
              {!contents || contents.length === 0 ? (
                <h1 className="text-2xl font-semibold">
                  No Youtube Content is Available Please Create Content First
                </h1>
              ) : (
                contents.filter((con) => con.contentType !== "twitter" && con.contentType !== "document").map(
                  ({
                    _id,
                    contentLink,
                    contentType,
                    title,
                    tags,
                    userId,
                  }: ContentProps) => (
                    <Card
                      key={_id}
                      contentId={_id}
                      username={userId?.username || null}
                      type={contentType || null}
                      title={title}
                      link={contentLink}
                      tags={tags ? tags : []}
                    />
                  )
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Youtube;
