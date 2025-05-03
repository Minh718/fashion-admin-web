import React, { useState } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiPackage,
  FiUsers,
  FiGrid,
  FiSliders,
  FiGift,
  FiShoppingBag,
  FiLogOut,
} from "react-icons/fi";
import { menuItemsSideBar } from "../constants";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpenSideBar, activeItem, setActiveItem }) => {
  return (
    <div
      className={`fixed h-[100vh] inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isOpenSideBar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-center p-4 border-b border-gray-700">
        <Link to={"/"}>
          <img
            src="/public/logo.jpg"
            alt="Admin Logo"
            className="h-20 w-auto"
          />
        </Link>
        {/* <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          {isOpenSideBar ? <FiX size={24} /> : <FiMenu size={24} />}
        </button> */}
      </div>
      <nav className="mt-5">
        {menuItemsSideBar.map((item) => (
          <Link to={item.to}>
            <button
              key={item.name}
              className={`flex items-center w-full p-4 transition-colors duration-200 ${
                activeItem === item.name ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              <item.icon className="mr-4" size={20} />
              <span>{item.name}</span>
            </button>
          </Link>
        ))}
      </nav>
      <button
        className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-center hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors duration-200"
        aria-label="Logout"
      >
        <FiLogOut className="mr-2" size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
