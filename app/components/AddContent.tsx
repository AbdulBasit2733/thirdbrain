"use client";

import type React from "react";
import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface AddContentProps {
  onClose: () => void;
}

interface ContentData {
  type: "YOUTUBE" | "TWITTER";
  url?: string;
  title: string;
  tags: string[];
  notes: string;
}

const contentTypes = ["YOUTUBE", "TWITTER"] as const;

export const AddContent: React.FC<AddContentProps> = ({ onClose }) => {
  const [contentType, setContentType] =
    useState<ContentData["type"]>("YOUTUBE");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTagValue, setInputTagValue] = useState("");

  const handleContentTypeChange = useCallback((type: ContentData["type"]) => {
    setContentType(type);
    setUrl("");
    setTitle("");
  }, []);

  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(e.target.value);
    },
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTagValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputTagValue.trim()) {
      setTags((prevTags) => [...prevTags, inputTagValue.trim()]);
      setInputTagValue("");
      e.preventDefault(); // Prevent form submission
    }
  };

  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNotes(e.target.value);
    },
    []
  );

  const removeTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const content: ContentData = {
      title: title,
      type: contentType,
      tags: tags,
      notes,
      url: url
    };

    const response = await axios.post("/api/v1/create-content", content, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensures cookies are sent
    });

    if (response.data.success) {
      toast.success(response.data.message);
      onClose();
      window.location.reload(); // Reload the page after successful submission
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add Content</h2>
          <div className="flex space-x-2 mb-4">
            {contentTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleContentTypeChange(type)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  contentType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {contentType === "YOUTUBE"
                ? "YouTube Video Title"
                : "Twitter Post Title"}
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${contentType} Title...`}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {contentType === "YOUTUBE"
                ? "YouTube URL"
                : "Twitter Post URL"}
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={handleUrlChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${contentType} URL...`}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tag"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags
            </label>
            <input
              type="text"
              id="tag"
              value={inputTagValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Tags and press Enter"
            />
            <div>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 px-2 py-1 rounded-lg mr-2 mt-2"
                >
                  {tag}{" "}
                  <button
                    onClick={() => removeTag(index)}
                    className="text-red-600 ml-1"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={handleNotesChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add any notes about this content..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 border rounded-md">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
