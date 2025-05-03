import React, { useState } from "react";
import { notifySuccess } from "../../../components/toastNotify";
import { addCategory } from "../../../services/CategoryService";

export default function FormAddCategory({
  handleAddCategory,
  handleCloseForm,
}) {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await addCategory({ name }); // Assuming this returns a response with a message
      notifySuccess(res.message || "Slide added successfully");
      handleAddCategory(res.result);
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
            Create New Category
          </h3>
          <form onSubmit={handleSubmit} className="mt-2 text-left">
            {/* Title Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name Category
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`mt-1 p-1 block w-full rounded-md border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
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
