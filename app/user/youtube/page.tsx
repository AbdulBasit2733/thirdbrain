"use client";
import { AddContent } from "@/app/components/AddContent";
import AddIcon from "@/app/components/Icons/AddIcon";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <div className="shadow p-2 max-w-xs rounded-lg">
            <iframe
              width={"100%"}
              src="https://www.youtube.com/embed/N3QzaUwml5w?si=ljqgqu85C9Bm9Cpp"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <div className="flex items-center my-2 py-2 gap-x-2">
              <div className="bg-slate-900 text-white px-3 py-1 text-xs rounded-full font-medium">
                Songs
              </div>
              <div className="bg-slate-900 text-white px-3 py-1 text-xs rounded-full font-medium">
                Songs
              </div>
            </div>
            <Link
              href={"/readmore/"}
              className="text-indigo-600 inline-flex items-center gap-x-1 hover:gap-x-2 transition-all ease-in-out duration-300 justify-end w-full px-4 py-1 font-bold text-xs"
            >
              Read More
              <ArrowRight />
            </Link>
          </div>
        </div>
      </main>
      {showModal && <AddContent onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default YoutubePage;
