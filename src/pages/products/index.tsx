import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaFilter, FaSort } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pagination from "../../components/Pagination";
import { useOutletContext } from "react-router-dom";
import { menuItemsEnum } from "../../constants";
const links = [{
    name: 'Home',
    url: '/'
},
{
    name: 'Products',
    url: '/products'
}]
const ProductsAdmin = () => {
    const { setActiveItem } = useOutletContext();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Smartphone X",
      totalSales: 1500,
      price: 999.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      totalRevenue: 1499985,
      status: "Active"
    },
    {
      id: 2,
      name: "Laptop Pro",
      totalSales: 800,
      price: 1499.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      totalRevenue: 1199992,
      status: "Active"
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      totalSales: 3000,
      price: 129.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      totalRevenue: 389970,
      status: "Low Stock"
    }
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterTerm, setFilterTerm] = useState('');

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = React.useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
    product.status.toLowerCase().includes(filterTerm.toLowerCase())
  );
useEffect(() => {
    setActiveItem(menuItemsEnum.PRODUCTS)
}
, [])
  return (
    <div className="container mx-auto px-4 py-8">
        <Breadcrumbs links={links} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products Admin</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Product
        </button>
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
          <span>Sort by: {sortConfig.key || 'None'}</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('name')}>Name</th>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('totalSales')}>Total Sales</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('price')}>Price</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('totalRevenue')}>Total Revenue</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('status')}>Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="font-medium">{product.name}</div>
                </td>
                <td className="py-3 px-6 text-left">{product.id}</td>
                <td className="py-3 px-6 text-left">{product.totalSales}</td>
                <td className="py-3 px-6 text-left">${product.price.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="py-3 px-6 text-left">${product.totalRevenue.toLocaleString()}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`${product.status === 'Active' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'} py-1 px-3 rounded-full text-xs`}>
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <FaEdit />
                    </button>
                    <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
      <div className="text-gray-600 mt-4">
        <span>Rows per page:</span>
         <select className="border p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
        </select>
        </div>
        <Pagination pageCount={10}/>
      </div>
    </div>
  );
};

export default ProductsAdmin;