import { useState, useEffect } from "react";
import {
  FiUpload,
  FiTrash2,
  FiCopy,
  FiImage,
  FiFile,
  FiX,
  FiCheck,
  FiDownload,
} from "react-icons/fi";
import api from "../../utils/api";

export default function MediaLibrary() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filter, setFilter] = useState("all"); // all, images, documents
  const [toast, setToast] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const response = await api.get("/upload/list");
      setFiles(response.data.files || []);
    } catch (error) {
      console.error("Error loading files:", error);
      showToast("Failed to load media files", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (fileList) => {
    if (!fileList || fileList.length === 0) return;

    try {
      setUploading(true);
      const formData = new FormData();

      // Check if files are images or documents
      const images = [];
      const documents = [];

      Array.from(fileList).forEach((file) => {
        if (file.type.startsWith("image/")) {
          images.push(file);
        } else {
          documents.push(file);
        }
      });

      // Upload images
      if (images.length > 0) {
        const imageFormData = new FormData();
        images.forEach((file) => {
          imageFormData.append("images", file);
        });
        await api.post("/upload/images", imageFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // Upload documents
      for (const file of documents) {
        const docFormData = new FormData();
        docFormData.append("file", file);
        await api.post("/upload/file", docFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      showToast(`Successfully uploaded ${fileList.length} file(s)`, "success");
      loadFiles();
    } catch (error) {
      console.error("Upload error:", error);
      showToast("Failed to upload files", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      await api.delete(`/upload/image/${filename}`);
      showToast("File deleted successfully", "success");
      loadFiles();
    } catch (error) {
      console.error("Delete error:", error);
      showToast("Failed to delete file", "error");
    }
  };

  const copyToClipboard = (url) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    showToast("URL copied to clipboard!", "success");
  };

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const filteredFiles = files.filter((file) => {
    if (filter === "all") return true;
    if (filter === "images")
      return file.url?.includes("/images/") || file.type?.startsWith("image/");
    if (filter === "documents")
      return file.url?.includes("/files/") || !file.type?.startsWith("image/");
    return true;
  });

  const getFileIcon = (file) => {
    if (file.type?.startsWith("image/") || file.url?.includes("/images/")) {
      return <FiImage className="w-6 h-6" />;
    }
    return <FiFile className="w-6 h-6" />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "N/A";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-1">
            Upload and manage your images and files
          </p>
        </div>
        <div className="flex gap-3">
          <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer inline-flex items-center gap-2">
            <FiUpload />
            Upload Files
            <input
              type="file"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
          </label>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 font-medium transition ${
            filter === "all"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          All Files ({files.length})
        </button>
        <button
          onClick={() => setFilter("images")}
          className={`px-4 py-2 font-medium transition ${
            filter === "images"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Images (
          {
            files.filter(
              (f) => f.url?.includes("/images/") || f.type?.startsWith("image/")
            ).length
          }
          )
        </button>
        <button
          onClick={() => setFilter("documents")}
          className={`px-4 py-2 font-medium transition ${
            filter === "documents"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Documents (
          {
            files.filter(
              (f) => f.url?.includes("/files/") || !f.type?.startsWith("image/")
            ).length
          }
          )
        </button>
      </div>

      {/* Upload Drop Zone */}
      <div
        className={`mb-6 border-2 border-dashed rounded-lg p-8 text-center transition ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <FiUpload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600 mb-2">
          Drag and drop files here, or click the button above to upload
        </p>
        <p className="text-sm text-gray-500">
          Supports: Images (JPG, PNG, GIF, WebP), Documents (PDF, DOC, TXT)
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-3">Loading files...</p>
        </div>
      )}

      {/* Uploading State */}
      {uploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-900">Uploading files...</span>
          </div>
        </div>
      )}

      {/* Files Grid */}
      {!loading && filteredFiles.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FiFile className="w-16 h-16 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600">No files uploaded yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Upload your first file to get started
          </p>
        </div>
      )}

      {!loading && filteredFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredFiles.map((file, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {/* File Preview */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {file.type?.startsWith("image/") ||
                file.url?.includes("/images/") ? (
                  <img
                    src={file.url}
                    alt={file.name || "Image"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">
                    {getFileIcon(file)}
                    <p className="text-xs mt-2 text-center px-2">
                      {file.name?.split(".").pop()?.toUpperCase() || "FILE"}
                    </p>
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name || "Unnamed"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(file.size)}
                </p>
              </div>

              {/* Action Buttons - Show on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => copyToClipboard(file.url)}
                  className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
                  title="Copy URL"
                >
                  <FiCopy />
                </button>
                <a
                  href={file.url}
                  download
                  className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
                  title="Download"
                >
                  <FiDownload />
                </a>
                <button
                  onClick={() =>
                    handleDelete(file.name || file.url.split("/").pop())
                  }
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {toast.type === "success" && <FiCheck className="w-5 h-5" />}
            {toast.type === "error" && <FiX className="w-5 h-5" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
