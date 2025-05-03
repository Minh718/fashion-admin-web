import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useParams } from "react-router-dom";
import { notifyError } from "../../components/toastNotify";
import { getProductDetailAdmin } from "../../services/ProductService";
import BackdropProductSizeColor from "./component/BackdropProductSizeColor";
import Breadcrumbs from "../../components/Breadcrumbs";
import Loading from "../../components/Loading";
import { getUrlImage } from "../../utils/urlImage";

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
const ProductDetailPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [size, setSize] = React.useState(null);
  const { id } = useParams();

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await getProductDetailAdmin(id);
        setProduct(data);
      } catch (err) {
        notifyError("Error occurred");
      } finally {
        setIsLoading(false);
      }
    };
  
    setIsLoading(true);
    fetchProductDetail();
  }, [id]);
  
  if (isLoading) return <Loading />;
  
  return (
    // <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        
        <div className="p-6">
                <Breadcrumbs links={links} />
          <h1 className="text-3xl font-bold mb-6">Product Admin Page</h1>

          {/* Product Information Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><span className="font-semibold">ID:</span> {product.id}</p>
                <p><span className="font-semibold">Name:</span> {product.name}</p>
                <p><span className="font-semibold">Price:</span> ${product.price}</p>
              </div>
              <div>
                <p><span className="font-semibold">Percent:</span> {product.percent}%</p>
                <p><span className="font-semibold">Subcategory:</span> {product.subcategory}</p>
                <p><span className="font-semibold">Brand:</span> {product.brand}</p>
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
                  <p><span className="font-semibold">Description:</span> {product.detailProduct.description}</p>
                  <p><span className="font-semibold">Material:</span> {product.detailProduct.material}</p>
                  <p><span className="font-semibold">Origin:</span> {product.detailProduct.origin}</p>
                  <p><span className="font-semibold">Warranty:</span> {product.detailProduct.warranty}</p>
                  <p><span className="font-semibold">Made In:</span> {product.detailProduct.madeIn}</p>
                  <p><span className="font-semibold">Model:</span> {product.detailProduct.model}</p>
                </div>
              )}
            </div>
          </div>

          {/* Image Carousel */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Product Images</h2>
            <div className="relative">
              <img
                src={getUrlImage(product.detailProduct.images[currentImageIndex])}
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
            {/* <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
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
                  {product.sizes.map((size, index) => (
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
            </div> */}
            <div>
  <div className="overflow-x-auto mb-2 rounded shadow border border-gray-200">
    <table className="min-w-full text-sm text-center">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="px-2 py-2">Name</th>
          <th className="px-2 py-2">Stock Left</th>
          <th className="px-2 py-2">Total sales</th>
          <th className="px-2 py-2">Total revenue</th>
          <th className="px-2 py-2">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {
          product.sizes.map((productSize, index) => (
            <tr key={index}>
              <td className="px-2 py-2">{productSize.name}</td>
              <td className="px-2 py-2">                  <span
                    className={`${
                      productSize.totalQuantity > 50
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-600"
                    } py-1 px-3 rounded-full text-xs font-bold`}
                  >
                    {productSize.totalQuantity}
                  </span></td>
              <td className="px-2 py-2">{productSize.totalSales}</td>
              <td className="px-2 py-2">${productSize.totalSales * product.price*product.percent/100}</td>
              <td className="px-2 py-2">
                <button
                  onClick={() => {
                    setSize(productSize);
                    setOpen(true);
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
                >
                  Detail
                </button>
                <button
                  className="text-red-500 font-bold px-2 py-1 rounded-md hover:text-white ml-2 hover:bg-red-500 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
    <BackdropProductSizeColor open={open} setOpen={setOpen} size={size} price={product.price*product.percent/100} />

  </div>
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
    // </div>
  );
};

export default ProductDetailPage;
