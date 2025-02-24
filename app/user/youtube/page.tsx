"use client";
import { AddContent } from "@/app/components/AddContent";
import AddIcon from "@/app/components/Icons/AddIcon";
import AllContents from "@/app/ServerComponents/AllContents";
import { useState } from "react";

const YoutubePage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-full min-h-screen p-4 relative">
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 py-3 px-5 bg-slate-900 text-slate-100 font-semibold text-sm rounded-md hover:bg-slate-800 transition-colors"
        >
          <AddIcon />
          Add Content
        </button>
      </div>
      <main className="">
        <h1 className="text-2xl font-bold mb-4">YouTube Content</h1>
        {/* Add your main content here */}
        <p className="text-gray-600">
          Your saved YouTube content will appear here.
        </p>

        <AllContents type="YOUTUBE" />
      </main>
      {showModal && <AddContent onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default YoutubePage;
