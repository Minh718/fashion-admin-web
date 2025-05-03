import React, { useEffect, useState } from "react";
import { FaEdit, FaSort } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { notifyError, notifySuccess } from "../../components/toastNotify";
import { menuItemsEnum } from "../../constants";
import { statusOrder } from "../../enum/statusOrder";
import { getOrders, updateStatusOrder } from "../../services/orderService";
const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Orders",
    url: "/orders",
  },
];
const statusOrderUpdate = {
  pending: "PENDING",
  confirmed: "CONFIRMED",
  shipped: "SHIPPED",
  delivered: "DELIVERED",
};

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
const Orders = () => {
  const { setActiveItem } = useOutletContext();
  const [size, setSize] = useState(10);
  const [orders, setOrders] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleChangeStatusOrder = async (e, id) => {
    try {
      const res = await updateStatusOrder(id, e.target.value);
      notifySuccess(res.message);
      setOrders(
        orders.map((order) => (order.id === res.result.id ? res.result : order))
      );
    } catch (error) {
      notifyError("Error occured");
    }
  };
  useEffect(() => {
    // Simulating API call to fetch orders
    setIsLoading(true);
    const fetchOrders = async () => {
      try {
        const res = await getOrders({ currentPage, size }, filterStatus);
        setOrders(res.result);
        setMetadata(res.metadata);
        setIsLoading(false);
      } catch (err) {
        notifyError(err.response?.data.message);
      }
    };
    fetchOrders();
  }, [currentPage, size, filterStatus]);

  useEffect(() => {
    setActiveItem(menuItemsEnum.ORDERS);
  }, []);
  if (isLoading) return <Loading />;

  return (
    <div>
      <Breadcrumbs links={links} />

      <div className=" items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orders Admin</h1>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div className="mb-4">
          <label htmlFor="statusFilter" className="mr-2 font-semibold">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            className="border rounded p-2"
            value={filterStatus}
            onChange={(e) => {
              setCurrentPage(0);
              setFilterStatus(e.target.value);
            }}
          >
            <option value="all">All</option>
            {Object.entries(statusOrder).map(([key, value]) => (
              <option key={key} value={value}>
                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="text-gray-600">
          <FaSort className="inline mr-2" />
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
              <th className="py-3 px-6 text-left">Payment fee</th>
              <th className="py-3 px-6 text-left cursor-pointer">Discount</th>
              <th className="py-3 px-6 text-left cursor-pointer">
                Shipping address
              </th>
              <th className="py-3 px-6 text-left cursor-pointer">Phone</th>
              <th className="py-3 px-6 text-left cursor-pointer">FullName</th>
              <th className="py-3 px-6 text-left cursor-pointer">
                Order status
              </th>
              <th className="py-3 px-6 text-left cursor-pointer">
                Shipping Status
              </th>
              <th className="py-3 px-6 text-left cursor-pointer">
                Payment Method
              </th>
              <th className="py-3 px-6 text-left cursor-pointer">
                Payment Status
              </th>
              <th className="py-3 px-6 text-left cursor-pointer">Created At</th>
              <th className="py-3 px-6 text-left cursor-pointer">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left font-bold">
                  ${order.totalAmount}
                </td>
                <td className="py-3 px-6 text-left">${order.discount}</td>
                <td className="py-3 px-6 text-left">{order.shippingAddress}</td>
                <td className="py-3 px-6 text-left">{order.phone}</td>
                <td className="py-3 px-6 text-left">{order.fullName}</td>
                <td className="py-3 px-6 text-left font-bold">
                  {order.orderStatus === statusOrder.canceled ? (
                    <div className="text-red-700">{statusOrder.canceled}</div>
                  ) : (
                    <select
                      className="border rounded p-2"
                      value={order.orderStatus}
                      onChange={(e) => {
                        handleChangeStatusOrder(e, order.id);
                      }}
                    >
                      {Object.entries(statusOrderUpdate).map(([key, value]) => (
                        <option key={key} value={value}>
                          {value.charAt(0).toUpperCase() +
                            value.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                <td className="py-3 px-6 text-left">{order.shippingStatus}</td>
                <td className="py-3 px-6 text-left">
                  {order.payment?.paymentMethod}
                </td>
                <td className="py-3 px-6 text-left">
                  {order.payment?.paymentStatus}
                </td>
                <td className="py-3 px-6 text-left">
                  {formatDate(order.createdAt)}
                </td>
                <td className="py-3 px-6 text-left">
                  {" "}
                  <Link to={"/order/detail/" + order.id}>
                    <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <FaEdit />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default Orders;
