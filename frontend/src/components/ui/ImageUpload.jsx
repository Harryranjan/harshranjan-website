import React, { useState, useEffect } from "react";
import api from "../../utils/api";

// Helper function to get full image URL
const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `http://localhost:5000${url}`;
};

export default function ImageUpload({
  value,
  onChange,
  name = "image",
  label = "Image",
  required = false,
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || "");

  // Sync preview with value prop when it changes (e.g., when loading a post for editing)
  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Store only the relative path, not the full URL
      const imageUrl = response.data.url; // e.g., /uploads/images/filename.jpg
      setPreview(imageUrl);
      onChange(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    onChange(url);
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && "*"}
        </label>
      )}

      {/* Image Preview */}
      {preview && (
        <div className="relative mb-4 border-2 border-gray-200 rounded-lg overflow-hidden">
          <img
            src={getImageUrl(preview)}
            alt="Preview"
            className="w-full h-64 object-contain bg-gray-50"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div className="hidden items-center justify-center h-64 bg-gray-100">
            <p className="text-gray-500">Failed to load image</p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition shadow-lg"
            title="Remove image"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex gap-2">
        <label className="flex-1 cursor-pointer">
          <div className="border-2 border-dashed border-gray-300 rounded-lg px-4 py-8 text-center hover:border-blue-500 transition">
            {uploading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Uploading...</span>
              </div>
            ) : (
              <>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF, WebP up to 5MB
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Or URL Input */}
      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-2">Or paste image URL:</p>
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleUrlChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
      </div>
    </div>
  );
}
