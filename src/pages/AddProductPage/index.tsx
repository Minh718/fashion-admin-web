import React, { useEffect, useState } from "react";
import { FiUpload, FiPlus, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { menuItemsEnum } from "../../constants";
import { useOutletContext } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Products",
    url: "/products",
  },
  {
    name: "Add product",
    url: "/#",
  },
];
const AddProductPage = () => {
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    percentage: "",
    subcategoryId: "",
    brandId: "",
    status: false,
    description: "",
    model: "",
    material: "",
    origin: "",
    warranty: "",
    madeIn: "",
  });
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setActiveItem }: any = useOutletContext();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    validateField(name, type === "checkbox" ? checked : value);
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    setMainImage(file);
  };

  const handleAdditionalImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImages((prevImages) => [...prevImages, ...files]);
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "productName":
        error = value.trim() === "" ? "Product name is required" : "";
        break;
      case "price":
        error = isNaN(value) || value <= 0 ? "Invalid price" : "";
        break;
      case "percentage":
        error =
          isNaN(value) || value < 0 || value > 100
            ? "Invalid percentage (0-100)"
            : "";
        break;
      case "subcategoryId":
      case "brandId":
        error = isNaN(value) || value <= 0 ? "Invalid ID" : "";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
  const subcategories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Home & Garden" },
  ];

  const brands = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Samsung" },
    { id: 3, name: "Nike" },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (!hasErrors) {
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form submitted:", formData);
        console.log("Main Image:", mainImage);
        console.log("Additional Images:", additionalImages);
        // Reset form or show success message
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }

    setIsSubmitting(false);
  };
  useEffect(() => {
    setActiveItem(menuItemsEnum.PRODUCTS);
  }, []);
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="px-4 py-8 bg-white rounded-lg shadow-md overflow-hidden w-full max-w-7xl">
        <Breadcrumbs links={links} />
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          <div className="w-full flex flex-wrap mb-6">
            <h2 className="text-3xl font-bold text-gray-900 w-full mb-4">
              Add Product
            </h2>
            <div className="w-1/3 pr-4">
              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.productName ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.productName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.productName}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="percentage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Percentage
                </label>
                <input
                  type="number"
                  name="percentage"
                  id="percentage"
                  value={formData.percentage}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.percentage ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.percentage && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.percentage}
                  </p>
                )}
              </div>
            </div>
            <div className="w-1/3 px-2">
              <div className="mb-4">
                <label
                  htmlFor="subcategoryId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subcategory
                </label>
                <select
                  name="subcategoryId"
                  id="subcategoryId"
                  value={formData.subcategoryId}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.subcategoryId ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                >
                  <option value="">Select a subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
                {errors.subcategoryId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subcategoryId}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="brandId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Brand
                </label>
                <select
                  name="brandId"
                  id="brandId"
                  value={formData.brandId}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.brandId ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                >
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                {errors.brandId && (
                  <p className="mt-1 text-sm text-red-600">{errors.brandId}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <input
                    type="checkbox"
                    name="status"
                    id="status"
                    checked={formData.status}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2">Active Status</span>
                </label>
              </div>
            </div>
            <div className="w-1/3 pl-4">
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-wrap mb-6">
            <div className="w-1/5 pr-2">
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Model
              </label>
              <input
                type="text"
                name="model"
                id="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="w-1/5 px-2">
              <label
                htmlFor="material"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Material
              </label>
              <input
                type="text"
                name="material"
                id="material"
                value={formData.material}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="w-1/5 px-2">
              <label
                htmlFor="origin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Origin
              </label>
              <input
                type="text"
                name="origin"
                id="origin"
                value={formData.origin}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="w-1/5 px-2">
              <label
                htmlFor="warranty"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Warranty
              </label>
              <input
                type="text"
                name="warranty"
                id="warranty"
                value={formData.warranty}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="w-1/5 pl-2">
              <label
                htmlFor="madeIn"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Made In
              </label>
              <input
                type="text"
                name="madeIn"
                id="madeIn"
                value={formData.madeIn}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="w-full flex mb-6">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Product Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {mainImage ? (
                    <img
                      src={URL.createObjectURL(mainImage)}
                      alt="Main product"
                      className="mx-auto h-32 w-32 object-cover rounded-md"
                    />
                  ) : (
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="main-image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="main-image-upload"
                        name="main-image-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleMainImageUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Product Images
              </label>
              <div className="mt-1 grid grid-cols-3 gap-4">
                {additionalImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative border border-gray-300 rounded-md p-2"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Additional ${index + 1}`}
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="border-2 border-gray-300 border-dashed rounded-md p-2 flex items-center justify-center hover:border-indigo-500 transition-colors duration-300">
                  <label
                    htmlFor="additional-images-upload"
                    className="cursor-pointer"
                  >
                    <FiPlus className="h-8 w-8 text-gray-400" />
                    <input
                      id="additional-images-upload"
                      name="additional-images-upload"
                      type="file"
                      multiple
                      className="sr-only"
                      onChange={handleAdditionalImagesUpload}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Submitting..." : "Add Product"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
