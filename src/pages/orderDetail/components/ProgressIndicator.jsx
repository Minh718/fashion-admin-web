import React from "react";
import { FaBox, FaCheckCircle, FaTruck } from "react-icons/fa";
import { statusOrder } from "../../../enum/statusOrder";
import { MdOutlineCancel } from "react-icons/md";

export default function ProgressIndicator({ status }) {
  const stages = [
    { icon: <FaBox />, label: "Pending" },
    { icon: <FaBox />, label: "Confirmed" },
    { icon: <FaTruck />, label: "Shipped" },
    { icon: <FaCheckCircle />, label: "Delivered" },
  ];
  const convertState = () => {
    switch (status) {
      case statusOrder.pending:
        return 0;
      case statusOrder.confirmed:
        return 1;
      case statusOrder.shipped:
        return 2;
      case statusOrder.delivered:
        return 3;
      default:
        return -1;
    }
  };
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {status === statusOrder.canceled ? (
          <div className="w-full flex justify-center items-center gap-2 font-bold text-red-700">
            <MdOutlineCancel size={40} /> <span>Order Canceled</span>
          </div>
        ) : (
          stages.map((stage, index) => (
            <div key={index} className="flex flex-col items-center w-1/4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= convertState()
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {stage.icon}
              </div>
              <span className="mt-2 text-sm text-center">{stage.label}</span>
            </div>
          ))
        )}
      </div>

      {/* Progress bar */}
      {status !== statusOrder.canceled && (
        <div className="mt-4 h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${(convertState() / (stages.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
