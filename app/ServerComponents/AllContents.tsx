"use client";

import Card from "../components/ui/Card";
import { ApiResponse, DataProps } from "../types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const AllContents = ({
  type,
}: {
  type: "YOUTUBE" | "TWITTER" | "DOC" | "IMAGE" | "ALL";
}) => {
  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>("/api/v1/contents", {
          withCredentials: true,
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No Content is Available</div>;
  }

  const filteredData =
    type === "ALL"
      ? data
      : data.filter((content: DataProps) => content.type === type);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {filteredData.length === 0 ? (
        <div>No Content is Available</div>
      ) : (
        filteredData.map((item: DataProps) => (
          <Card key={item.id} data={item} />
        ))
      )}
    </div>
  );
};

export default AllContents;
