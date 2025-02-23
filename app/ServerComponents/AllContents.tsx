"use client"; // Ensure this runs in a client component

import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import { fetchData } from "@/app/utils/config";
import { ApiResponse, DataProps } from "../types/types";

const AllContents = ({ type }: { type: "YOUTUBE" | "TWITTER" | "DOC" | "IMAGE" | "ALL" }) => {
  const [data, setData] = useState<ApiResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.success || !data.data) {
    return <p>Failed to load contents.</p>;
  }

  const filteredData =
    type === "ALL" ? data.data : data.data.filter((content: DataProps) => content.type === type);
  console.log(filteredData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {filteredData.length === 0 ? (
        <div>No Content is Available</div>
      ) : (
        filteredData.map((item: DataProps) => <Card key={item.id} data={item} />)
      )}
    </div>
  );
};

export default AllContents;
