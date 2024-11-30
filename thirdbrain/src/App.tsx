import React from "react";
import Button from "./components/Button";
import ShareIcon from "./Icons/ShareIcon";
import PlusIcon from "./Icons/PlusIcon";
import Card from "./components/Card";

const App = () => {
  return (
    <div className="w-full p-5">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl text-indigo-600 font-bold tracking-widest">Third Brain</h1>
        <div className="flex gap-3 items-center">
          <Button
            variant="primary"
            text={"Add Content"}
            startIcon={<PlusIcon />}
          />
          <Button
            variant="secondary"
            text={"Share Brain"}
            startIcon={<ShareIcon />}
          />
        </div>
      </div>
      <div className=" flex gap-3">
        <Card
          type="twitter"
          title={"First Tweet"}
          link={"https://twitter.com/Saran2302/status/1862584192191664419"}
        />
        <Card
          type="youtube"
          title={"First Video"}
          link={"https://www.youtube.com/embed/ofHGE-85EIA?si=H5_0WjO7_Fy9dHOv"}
        />
      </div>
    </div>
  );
};

export default App;
