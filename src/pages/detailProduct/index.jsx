import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const ProductDetailPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productData = {
    id: "PROD001",
    name: "Premium Leather Jacket",
    price: 299.99,
    percent: 15,
    subcategory: "Outerwear",
    brand: "LuxeLeather",
    description: "High-quality leather jacket with a modern design.",
    material: "Full-grain leather",
    origin: "Italy",
    warranty: "2 years",
    madeIn: "Italy",
    model: "LL-2023",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614"
    ],
    sizes: [
      { name: "S", quantity: 50, sales: 20 },
      { name: "M", quantity: 75, sales: 35 },
      { name: "L", quantity: 60, sales: 28 },
      { name: "XL", quantity: 40, sales: 15 }
    ]
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === productData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productData.images.length - 1 : prevIndex - 1
    );
  };

  const handleDelete = (size) => {
    console.log(`Delete size: ${size}`);
    // Implement delete logic here
  };

  const handleViewDetails = (size) => {
    console.log(`View details for size: ${size}`);
    // Implement view details logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Product Admin Page</h1>

          {/* Product Information Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><span className="font-semibold">ID:</span> {productData.id}</p>
                <p><span className="font-semibold">Name:</span> {productData.name}</p>
                <p><span className="font-semibold">Price:</span> ${productData.price.toFixed(2)}</p>
              </div>
              <div>
                <p><span className="font-semibold">Percent:</span> {productData.percent}%</p>
                <p><span className="font-semibold">Subcategory:</span> {productData.subcategory}</p>
                <p><span className="font-semibold">Brand:</span> {productData.brand}</p>
              </div>
            </div>
          </div>

          {/* Detail Product Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
            <div className="border rounded-lg overflow-hidden">
              <button
                className="w-full px-4 py-2 bg-gray-200 text-left font-semibold flex justify-between items-center"
                onClick={() => toggleSection("details")}
              >
                Product Details
                {expandedSection === "details" ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>
              {expandedSection === "details" && (
                <div className="p-4">
                  <p><span className="font-semibold">Description:</span> {productData.description}</p>
                  <p><span className="font-semibold">Material:</span> {productData.material}</p>
                  <p><span className="font-semibold">Origin:</span> {productData.origin}</p>
                  <p><span className="font-semibold">Warranty:</span> {productData.warranty}</p>
                  <p><span className="font-semibold">Made In:</span> {productData.madeIn}</p>
                  <p><span className="font-semibold">Model:</span> {productData.model}</p>
                </div>
              )}
            </div>
          </div>

          {/* Image Carousel */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Product Images</h2>
            <div className="relative">
              <img
                src={productData.images[currentImageIndex]}
                alt={`Product ${currentImageIndex + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                onClick={prevImage}
              >
                <BsChevronLeft />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                onClick={nextImage}
              >
                <BsChevronRight />
              </button>
            </div>
          </div>

          {/* Sizes Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Size</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Sales</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.sizes.map((size, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-2 text-center">{size.name}</td>
                      <td className="px-4 py-2 text-center">{size.quantity}</td>
                      <td className="px-4 py-2 text-center">{size.sales}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleViewDetails(size.name)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          <FiEye />
                        </button>
                        <button
                          onClick={() => handleDelete(size.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
              <FiEdit2 className="mr-2" /> Edit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
