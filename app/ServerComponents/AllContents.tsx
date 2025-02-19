"use client"; // Ensure this runs in a client component

import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/ui/Card";

interface DataProps {
  id: string;
  type: "YOUTUBE" | "TWITTER" | "DOC" | "IMAGE";
  url: string;
  tags: string[];
  notes: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: DataProps[];
}

interface ContentType {
  type: "YOUTUBE" | "TWITTER" | "DOC" | "IMAGE" | "ALL";
}

const AllContents = ({ type }: { type: ContentType }) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>("/api/v1/contents", {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.success) {
    return <p>Failed to load contents.</p>;
  }

  const filteredData =
    type === "ALL" ? data.data : data.data.filter((cont) => cont.type === type);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {filteredData.length === 0 ? (
        <div>No Content is Available</div>
      ) : (
        filteredData.map((item) => <Card key={item.id} data={item} />)
      )}
    </div>
  );
};

export default AllContents;
