import type React from "react"

interface FileUploadProps {
  contentType: "DOC" | "IMAGE"
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  preview: string | null
  fileInputRef: React.RefObject<HTMLInputElement>
}

export const FileUpload: React.FC<FileUploadProps> = ({ contentType, onFileChange, preview, fileInputRef }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {contentType === "DOC" ? "Upload Document" : "Upload Image"}
      </label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept={contentType === "DOC" ? ".pdf,.doc,.docx" : "image/*"}
          className="hidden"
        />
        {preview ? (
          contentType === "IMAGE" ? (
            <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-40 mx-auto" />
          ) : (
            <p className="text-blue-600">File selected</p>
          )
        ) : (
          <p className="text-gray-500">Click to {contentType === "DOC" ? "upload document" : "upload image"}</p>
        )}
      </div>
    </div>
  )
}

