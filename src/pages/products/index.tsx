import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaFilter, FaSort } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pagination from "../../components/Pagination";
import { Link, useOutletContext } from "react-router-dom";
import { menuItemsEnum } from "../../constants";
import { getUrlImage } from "../../utils/urlImage";
import {
  deleteProduct,
  draftProduct,
  getProductsForAdminTable,
  publishProduct,
} from "../../services/ProductService";
import { notifyError, notifySuccess } from "../../components/toastNotify";
import Loading from "../../components/Loading";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Products",
    url: "/products",
  },
];
const ProductsAdmin = () => {
  const { setActiveItem } = useOutletContext() as any;
  const [products, setProducts] = useState([
    {
      id: 140,
      name: "Vintage Checkered Flannel Shirt",
      price: 38,
      image: "https://picsum.photos/200/302",
      percent: 0,
      status: true,
      totalSales: 94,
      totalRevenue: 1595,
      stockLeft: 232,
    },
    {
      id: 141,
      name: "Brushed Flannel Shirt",
      price: 34,
      image: "https://picsum.photos/200/303",
      percent: 0,
      status: true,
      totalSales: 90,
      totalRevenue: 1428,
      stockLeft: 414,
    },
    {
      id: 139,
      name: "Soft-Touch Lightweight Flannel Shirt",
      price: 88,
      image: "https://picsum.photos/200/301",
      percent: 0,
      status: true,
      totalSales: 57,
      totalRevenue: 600,
      stockLeft: 393,
    },
    {
      id: 138,
      name: "Heavyweight Workwear Flannel Shirt",
      price: 48,
      image: "https://picsum.photos/221/253",
      percent: 0,
      status: true,
      totalSales: 58,
      totalRevenue: 1184,
      stockLeft: 0,
    },
    {
      id: 137,
      name: "Classic Buffalo Plaid Flannel Shirt",
      price: 48,
      image: "https://picsum.photos/222/252",
      percent: 0,
      status: false,
      totalSales: 114,
      totalRevenue: 1924,
      stockLeft: 0,
    },
    {
      id: 135,
      name: "Eco-Friendly Bamboo Button-Down Shirt",
      price: 83,
      image: "https://picsum.photos/217/250",
      percent: 0,
      status: true,
      totalSales: 34,
      totalRevenue: 0,
      stockLeft: 0,
    },
  ]);
  const [sortBy, setSortBy] = useState("createdDate");
  const [size, setSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortConfig, setSortConfig] = useState<any>({
    key: null,
    direction: "ascending",
  });
  const [metadata, setMetadata] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDelete, setIsDelete] = React.useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [filterTerm, setFilterTerm] = useState("");

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = React.useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      notifySuccess("Delete product successfully");
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      notifyError("error occur");
    }
  };
  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      product.status.toLowerCase().includes(filterTerm.toLowerCase())
  );
  const handleStatusProduct = async (product) => {
    const action = product.status ? draftProduct : publishProduct;
    try {
      const res = await action(product.id);
      notifySuccess(res.message);
    } catch (error) {}

    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id ? { ...item, status: !item.status } : item
      )
    );
  };
  useEffect(() => {
    // Simulating API call to fetch products
    setIsLoading(true);
    const fetchProducts = async () => {
      let res;
      try {
        res = await getProductsForAdminTable({
          sortBy: sortBy,
          order: sortOrder,
          page: currentPage,
          size,
        });
        setProducts(res.result);
        setMetadata(res.metadata);
        setIsLoading(false);
      } catch (error) {
        notifyError("Error occur");
      }
    };
    fetchProducts();
  }, [sortBy, sortOrder, currentPage, size]);

  useEffect(() => {
    setActiveItem(menuItemsEnum.PRODUCTS);
  }, []);
  if (isLoading) return <Loading />;

  return (
    <div>
      <Breadcrumbs links={links} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products Admin</h1>
        <Link to={"/product/add"}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
            <FaPlus className="mr-2" /> Add Product
          </button>
        </Link>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Filter products..."
            className="border rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          <FaFilter className="absolute right-3 top-3 text-gray-400" />
        </div>
        <div className="text-gray-600">
          <FaSort className="inline mr-2" />
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 leading-tight focus:outline-none focus:ring focus:border-blue-300"
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split("-");
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
              setCurrentPage(0);
            }}
          >
            <option value="createdDate-desc">Date created (to past)</option>
            <option value="createdDate-asc">Date created (to future)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name
              </th>
              <th className="py-3 px-6 text-left">ID</th>
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort("totalSales")}
              >
                Total Sales
              </th>
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price
              </th>
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort("percent")}
              >
                Discount
              </th>
              <th className="py-3 px-6 text-left">Image</th>
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort("totalRevenue")}
              >
                Total Revenue
              </th>
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status
              </th>
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort("stockLeft")}
              >
                Stock Left
              </th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  <div className="font-medium">{product.name}</div>
                </td>
                <td className="py-3 px-6 text-left">{product.id}</td>
                <td className="py-3 px-6 text-left">{product.totalSales}</td>
                <td className="py-3 px-6 text-left">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-3 px-6 text-left">{product.percent}%</td>
                <td className="py-3 px-6 text-left">
                  <img
                    src={getUrlImage(product.image)}
                    alt={product.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-3 px-6 text-left">
                  ${product.totalRevenue.toLocaleString()}
                </td>
                <td className="py-3 px-6 text-left">
                  {/* <span
                    className={`${
                      product.status === "Active"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-600"
                    } py-1 px-3 rounded-full text-xs`}
                  >
                    {product.status}
                  </span> */}
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={product.status}
                      onChange={(e) => handleStatusProduct(product)}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                  </label>
                </td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`${
                      product.stockLeft > 100
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-600"
                    } py-1 px-3 rounded-full text-xs font-bold`}
                  >
                    {product.stockLeft}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Link
                      to={`/product/detail/${product.id}`}
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                      onClick={() => {
                        setIsDelete(true);
                        setSelectedProductId(product.id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDeleteModal
        isOpen={isDelete}
        onClose={() => setIsDelete(false)}
        onConfirm={() => {
          handleDeleteProduct(selectedProductId);
          setIsDelete(false);
        }}
        itemName="product"
      />
      <div className="flex justify-between">
        <div className="text-gray-600 mt-4">
          <span>Rows per page:</span>
          <select
            onChange={(e) => {
              setSize(+e.target.value);
              setCurrentPage(0);
            }}
            className="border p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={size}
          >
            <option value="7">7</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </div>
        <Pagination
          pageCount={metadata?.totalPages ?? 6}
          handlePageClick={({ selected }) => setCurrentPage(selected)}
          page={currentPage}
        />
      </div>
    </div>
  );
};

export default ProductsAdmin;
