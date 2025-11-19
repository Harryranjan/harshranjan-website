import React, { useState } from "react";
import { FiUpload, FiFile, FiX, FiCheckCircle } from "react-icons/fi";
import api from "../../utils/api";

export default function FileUpload({
  value,
  onChange,
  onFileInfoChange,
  label = "File",
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar",
  required = false,
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(
    value
      ? {
          url: value,
          filename: value.split("/").pop(),
        }
      : null
  );

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert("File size should be less than 50MB");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/upload/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const fileData = {
        url: response.data.url,
        filename: response.data.filename,
        size: response.data.size,
        type: response.data.type,
      };

      setUploadedFile(fileData);
      onChange(response.data.url);

      // Pass file info to parent component if callback provided
      if (onFileInfoChange) {
        onFileInfoChange({
          file_type: response.data.type,
          file_size: response.data.size,
        });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert(
        error.response?.data?.message ||
          "Failed to upload file. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    onChange(url);
    setUploadedFile(url ? { url, filename: url.split("/").pop() } : null);
  };

  const handleRemove = () => {
    setUploadedFile(null);
    onChange("");
    if (onFileInfoChange) {
      onFileInfoChange({ file_type: "", file_size: "" });
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* File Preview */}
      {uploadedFile && (
        <div className="mb-4 border-2 border-green-200 bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {uploadedFile.filename}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {uploadedFile.size && `${uploadedFile.size} • `}
                  {uploadedFile.type && uploadedFile.type}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
              title="Remove file"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Upload Area */}
      {!uploadedFile && (
        <div className="mb-3">
          <label className="cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-lg px-4 py-8 text-center hover:border-blue-500 hover:bg-blue-50 transition">
              {uploading ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
                  <span className="text-gray-600 font-medium">
                    Uploading...
                  </span>
                  <span className="text-sm text-gray-500 mt-1">
                    Please wait
                  </span>
                </div>
              ) : (
                <>
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-3 text-sm font-medium text-gray-700">
                    Click to upload file
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, ZIP, RAR
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Up to 50MB</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept={accept}
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* URL Input Alternative */}
      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-2">Or paste file URL:</p>
        <input
          type="text"
          value={value || ""}
          onChange={handleUrlChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="https://example.com/files/my-file.pdf"
        />
      </div>
    </div>
  );
}
