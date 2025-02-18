import React from "react";
import Card from "../../components/ui/Card";

const TwitterPage = () => {
  const data = [
    {
      _id:1,
      type: "youtube",
      url: "htppsjsdkjaskdjadkasjdla",
      tags: ["songs", "cicd", "helmet"],
      notes: "cmzn,mciajdkjjskdjsajdjkahsdasncnsnmdbauwhdahakjsdh",
    },
    {
      _id:2,
      type: "twitter",
      url: "htppsjsdkjaskdjadkasjdla",
      tags: ["songs", "cicd", "helmet"],
      notes: "cmzn,mciajdkjjskdjsajdjkahsdasncnsnmdbauwhdahakjsdh",
    },
  ];
  return (
    <div>
      {data && data.length !== 0 ? (
        data.map((data, index) => <Card key={index} data={data} />)
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default TwitterPage;
