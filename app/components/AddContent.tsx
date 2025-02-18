"use client";

import type React from "react";
import { useState, useCallback, useRef } from "react";
import { FileUpload } from "./FileUpload";
import axios from "axios";
import toast from "react-hot-toast";

interface AddContentProps {
  onClose: () => void;
  onAddContent: (content: ContentData) => void;
}

interface ContentData {
  type: "youtube" | "twitter" | "doc" | "image";
  url?: string;
  file?: File;
  tags: string[]; // FIXED: Changed from [string] to string[]
  notes: string;
}

const contentTypes = ["youtube", "twitter", "doc", "image"] as const;

export const AddContent: React.FC<AddContentProps> = ({ onClose }) => {
  const [contentType, setContentType] =
    useState<ContentData["type"]>("youtube");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]); // FIXED: Added type explicitly
  const [inputTagValue, setInputTagValue] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContentTypeChange = useCallback((type: ContentData["type"]) => {
    setContentType(type);
    setUrl("");
    setFile(null);
    setPreview(null);
  }, []);

  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(e.target.value);
    },
    []
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }
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
      type: contentType,
      tags: tags,
      notes,
    };

    if (contentType === "youtube" || contentType === "twitter") {
      content.url = url;
    } else {
      content.file = file || undefined;
    }
    const response = await axios.post("/api/v1/create-content", content, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensures cookies are sent
    });

    if (response.data.success) {
      toast.success(response.data.message);
      onClose();
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

          {(contentType === "youtube" || contentType === "twitter") && (
            <div className="mb-4">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {contentType === "youtube" ? "YouTube URL" : "Twitter Post URL"}
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
          )}

          {(contentType === "doc" || contentType === "image") && (
            <FileUpload
              contentType={contentType}
              onFileChange={handleFileChange}
              preview={preview}
              fileInputRef={fileInputRef}
            />
          )}

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
              onChange={handleInputChange} // FIXED: Changed from `handleTagChange`
              onKeyDown={handleKeyDown} // FIXED: Added `onKeyDown` event
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
