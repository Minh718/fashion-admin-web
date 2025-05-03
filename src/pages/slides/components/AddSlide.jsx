import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { notifySuccess } from "../../../components/toastNotify";
import { addSlide } from "../../../services/SlideService";

export default function AddSlide({ handleAddSlide, handleCloseForm }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("WTF");
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("status", status);
    if (image) form.append("file", image);

    try {
      const res = await addSlide(form); // Assuming this returns a response with a message
      notifySuccess(res.message || "Slide added successfully");
      handleAddSlide(res.result);
      handleCloseForm();
    } catch (err) {
      console.error("Failed to add slide:", err);
    }
  };

  return (
    <div className="fixed z-20 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Create New Slide
          </h3>
          <form onSubmit={handleSubmit} className="mt-2 text-left">
            {/* Title Field */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`mt-1 p-1 block w-full rounded-md border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Slide preview"
                    className="mx-auto h-32 w-32 object-cover rounded-md"
                  />
                ) : (
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="image-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                {errors.image && (
                  <p className="text-sm text-red-500">{errors.image}</p>
                )}
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            {/* Status Checkbox */}
            <div className="mb-4 mt-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                <input
                  type="checkbox"
                  id="status"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2">Active Status</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCloseForm}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
