import React, { useEffect, useState } from "react";
import { FaEdit, FaFilter, FaSort, FaTrash } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { notifyError, notifySuccess } from "../../components/toastNotify";
import { menuItemsEnum } from "../../constants";
import { getUrlImage } from "../../utils/urlImage";

import {
  activeUser,
  getAllUser,
  unactiveUser,
} from "../../services/UserService";
const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Users",
    url: "/users",
  },
];
const Users = () => {
  const { setActiveItem } = useOutletContext();
  const [size, setSize] = useState(10);
  const [users, setUsers] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTerm, setFilterTerm] = useState("");
  const handleStatusUser = async (user) => {
    const action = user.isactive ? unactiveUser : activeUser;
    try {
      const res = await action(user.id);
      notifySuccess(res.message);
    } catch (error) {}

    setUsers((prev) =>
      prev.map((item) =>
        item.id === user.id ? { ...item, isactive: !item.isactive } : item
      )
    );
  };
  useEffect(() => {
    // Simulating API call to fetch users
    setIsLoading(true);
    const fetchUsers = async () => {
      let res;
      try {
        res = await getAllUser({
          page: currentPage,
          size,
        });
        setUsers(res.result);
        setMetadata(res.metadata);
        setIsLoading(false);
      } catch (error) {
        notifyError("Error occur");
      }
    };
    fetchUsers();
  }, [currentPage, size]);

  useEffect(() => {
    setActiveItem(menuItemsEnum.USERS);
  }, []);
  if (isLoading) return <Loading />;

  return (
    <div>
      <Breadcrumbs links={links} />

      <h1 className="text-3xl mb-6 font-bold text-gray-800">Users Admin</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Filter users..."
            className="border rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          <FaFilter className="absolute right-3 top-3 text-gray-400" />
        </div>
        <div className="text-gray-600"></div>
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

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left cursor-pointer">Phone</th>
              <th className="py-3 px-6 text-left cursor-pointer">Email</th>
              <th className="py-3 px-6 text-left cursor-pointer">Address</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Avatar</th>

              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  <div className="font-medium">{user.name}</div>
                </td>
                <td className="py-3 px-6 text-left">{user.phone}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.address}</td>
                <td className="py-3 px-6 text-left">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={user.isactive}
                      onChange={(e) => handleStatusUser(user)}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                  </label>
                </td>
                <td className="py-3 px-6 text-left">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={getUrlImage(user.picture) || "/public/avatar.jpg"}
                    alt={user.picture}
                  />
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

export default Users;
