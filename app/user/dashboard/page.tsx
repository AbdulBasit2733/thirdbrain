"use client";
import { AddContent } from "@/app/components/AddContent";
import AddIcon from "@/app/components/Icons/AddIcon";
import TwitterIcon from "@/app/components/Icons/TwitterIcon";
import YoutubeIcon from "@/app/components/Icons/YoutubeIcon";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { ApiResponse, Content } from "@/app/types/types";
import { fetchData } from "@/app/utils/config";
import axios from "axios";
import { File, Image, PlusCircle, Youtube } from "lucide-react";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [type, setType] = useState("ALL");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchData();
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };
    loadData();
  }, []);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.success) {
    return <p>Failed to load contents.</p>;
  }

  const filteredData =
    type === "ALL" ? data.data : data.data.filter((cont: Content) => cont.type === type);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  return (
    <main className="flex-1 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Your Brain</h2>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 py-3 px-5 bg-slate-900 text-slate-100 font-semibold text-sm rounded-md hover:bg-slate-800 transition-colors"
        >
          <AddIcon />
          Add Content
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search your brain..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Types</option>
          <option value="TWITTER">Twitter</option>
          <option value="YOUTUBE">YouTube</option>
          <option value="DOC">Documents</option>
          <option value="IMAGES">Images</option>
        </select>
      </div>

      {/* Recent Items */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Items
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-2 gap-x-2">
                <TwitterIcon />
                <span className="text-sm text-gray-600">Twitter</span>
              </div>
              <h4 className="font-semibold mb-2">
                Interesting thread on AI advancements
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                A fascinating discussion on the latest developments in
                artificial intelligence and its potential impact on various
                industries...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">2 hours ago</span>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Items */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">All Items</h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item: Content) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-x-2">
                      {item.type === "YOUTUBE" && <YoutubeIcon />}
                      {item.type === "TWITTER" && <TwitterIcon />}
                      {item.type === "DOC" && <File />}
                      {item.type === "IMAGE" && <Image />}
                      <span className="text-sm text-gray-900">
                        {item.type.charAt(0).toUpperCase() +
                          item.type.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 text-wrap">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">2023-05-15</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {}}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      View
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <AddContent onClose={() => setShowModal(false)} />}
    </main>
  );
};

export default Dashboard;
