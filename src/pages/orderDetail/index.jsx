import React, { useEffect, useState } from "react";
import { BsBank } from "react-icons/bs";
import {
  FaCalendarAlt,
  FaCreditCard,
  FaShippingFast,
  FaTicketAlt,
} from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import { SiVisa } from "react-icons/si";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import Loading from "../../components/Loading";
import { paymentMethod } from "../../enum/paymentMethod";
import { getDetailOrder } from "../../services/orderService";
import ProgressIndicator from "./components/ProgressIndicator";
import { TypeVoucher } from "../../enum/TypeVoucher";
import Actions from "./components/Actions";
const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Orders",
    url: "/orders",
  },
  {
    name: "Order details",
    url: "/orders",
  },
];
const DetailOrderPage = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [showTooltip, setShowTooltip] = useState(false);

  const handleTrackingClick = () => {
    // Implement tracking logic here
    alert(`Tracking order: ${order.trackingNumber}`);
  };
  const calculateDiscountedTotal = () => {
    const totalAmount = order.totalAmount;
    if (order.voucher) {
      if (order.voucher.type === TypeVoucher.percent) {
        return totalAmount * (1 - order.voucher.discount / 100);
      } else {
        return totalAmount - order.voucher.discount;
      }
    }
    return totalAmount;
  };
  const renderPaymentMethodIcon = (method) => {
    switch (method) {
      case paymentMethod.CASH_ON_DELIVERY:
        return <FaCreditCard className="text-2xl text-purple-600" />;
      case paymentMethod.BANK_TRANSFER:
        return <GiCash className="text-2xl text-green-600" />;
      case paymentMethod.VNPAY:
        return <SiVisa className="text-2xl text-blue-600" />;
      default:
        return <FaCreditCard className="text-2xl text-purple-600" />;
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await getDetailOrder(id);
        setOrder(res);
      } catch (e) {
        navigate("/404");
      }
    })();
  }, []);
  if (order === null) return <Loading />;
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 sm:p-8">
        <Breadcrumbs links={links} />
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Order Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Order Information
            </h2>
            <p className="mb-2">
              <span className="font-medium">Customer:</span> {order.fullName}
            </p>
            <p className="mb-2">
              <span className="font-medium">Address:</span>{" "}
              {order.shippingAddress}
            </p>
            <p className="mb-2">
              <span className="font-medium">Phone:</span> {order.phone}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Shipping Details
            </h2>
            <p className="mb-2">
              <span className="font-medium">Order Status:</span>{" "}
              {order.orderStatus}
            </p>
            <p className="mb-2">
              <span className="font-medium">Shipping Status:</span>{" "}
              {order.shippingStatus}
            </p>
            <p className="mb-2">
              <span className="font-medium">Tracking Number:</span>
              <button
                onClick={handleTrackingClick}
                className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="Track order"
              >
                {order.trackingNumber}
              </button>
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Actions</h2>
          <Actions />

          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Track order
          </h2>

          <ProgressIndicator status={order.orderStatus} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Ordered Products
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 font-semibold text-sm text-gray-600 border-b">
                    Product
                  </th>
                  <th className="py-2 px-4 font-semibold text-sm text-gray-600 border-b">
                    Size
                  </th>
                  <th className="py-2 px-4 font-semibold text-sm text-gray-600 border-b">
                    Color
                  </th>
                  <th className="py-2 px-4 font-semibold text-sm text-gray-600 border-b">
                    Quantity
                  </th>
                  <th className="py-2 px-4 font-semibold text-sm text-gray-600 border-b">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.orderProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.size}</td>
                    <td className="py-2 px-4 border-b">{product.color}</td>
                    <td className="py-2 px-4 border-b">{product.quantity}</td>
                    <td className="py-2 px-4 border-b">
                      ${product.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total Price:</span>
                <span className="text-lg font-bold">${order.totalAmount}</span>
              </div>
              {order.voucher && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <div className="flex items-center">
                    <FaTicketAlt className="text-green-500 mr-2" />
                    <h3 className="text-lg font-semibold text-green-700">
                      Voucher Applied
                    </h3>
                  </div>
                  <div className="lg:flex justify-between items-center">
                    <p className="mt-2 text-green-600">
                      Voucher code{" "}
                      <span className="font-semibold">
                        {order.voucher.code}
                      </span>{" "}
                      applied for a
                      {order.voucher.type === "percentage"
                        ? ` ${order.voucher.discount}% discount`
                        : ` $${order.voucher.discount} discount`}
                    </p>
                    <p className="mt-1 text-green-600">
                      <span className="font-semibold">Total payment:</span>{" "}
                      <span className="text-2xl font-bold">
                        ${calculateDiscountedTotal().toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <FaShippingFast className="text-2xl text-blue-600" />
          <span className="text-sm font-medium text-gray-600">
            Fast Shipping
          </span>
        </div>
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <FaCalendarAlt className="text-2xl text-green-600" />
          <span className="text-sm font-medium text-gray-600">
            Order Placed: {order.createdAt}
          </span>
        </div>
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          {renderPaymentMethodIcon(order.payment?.paymentMethod)}
          <span className="text-sm font-medium text-gray-600">
            {order.payment?.paymentMethod}
          </span>
        </div>
        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
            aria-label="Show shipping information"
          >
            <MdLocalShipping className="text-2xl" />
            <span className="text-sm font-medium">Shipping Info</span>
          </button>
          {showTooltip && (
            <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded shadow-lg p-2 text-sm text-gray-700">
              Estimated delivery: 3-5 business days
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailOrderPage;
