import { FaMessage } from "react-icons/fa6";
import {
  FiGift,
  FiGrid,
  FiHome,
  FiPackage,
  FiShoppingBag,
  FiSliders,
  FiUsers,
} from "react-icons/fi";

const menuItemsSideBar = [
  { name: "Dashboard", icon: FiHome, to: "/" },
  { name: "Products", icon: FiPackage, to: "/products" },
  { name: "Users", icon: FiUsers, to: "/users" },
  { name: "Categories", icon: FiGrid, to: "/categories" },
  { name: "Slideshow", icon: FiSliders, to: "/slideshow" },
  { name: "Vouchers", icon: FiGift, to: "/vouchers" },
  { name: "Orders", icon: FiShoppingBag, to: "/orders" },
  { name: "Messages", icon: FaMessage, to: "/messages" },
];
const menuItemsEnum = {
  DASHBOARD: "Dashboard",
  PRODUCTS: "Products",
  USERS: "Users",
  CATEGORIES: "Categories",
  SLIDESHOW: "Slideshow",
  VOUCHERS: "Vouchers",
  ORDERS: "Orders",
  MESSAGES: "Messages",
};

const baseURL = import.meta.env.VITE_API_URL + "/api";

const API_URL = import.meta.env.VITE_API_URL;

export { menuItemsEnum, menuItemsSideBar, baseURL, API_URL };
