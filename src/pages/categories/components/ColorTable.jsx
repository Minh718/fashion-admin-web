import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  deleteColor,
  getAllColorForAdmin,
} from "../../../services/ColorService";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { notifyError, notifySuccess } from "../../../components/toastNotify";
import FormAddColor from "./FormAddColor";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";

export default function ColorTable() {
  const [size, setSize] = useState(10);
  const [colors, setColors] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [selectedSId, setSelectedId] = useState(null);
  const handleCloseForm = () => {
    setShowForm(false);
  };
  const handleAddColor = (color) => {
    setColors([color, ...colors]);
  };
  const handleDeleteColor = async (id) => {
    try {
      await deleteColor(id);
      notifySuccess("Delete color successfully");
      setColors(colors.filter((color) => color.id !== id));
    } catch (err) {
      notifyError(err.response.data.message);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    const fetchColors = async () => {
      let res;
      try {
        res = await getAllColorForAdmin({
          page: currentPage,
          size,
        });
        setColors(res.result);
        setMetadata(res.metadata);
        setIsLoading(false);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        notifyError("Error occur");
      }
    };
    fetchColors();
  }, [currentPage, size]);
  if (isLoading) return <Loading />;
  return (
    <div className="min-w-[550px] flex-grow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Colors</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add Color
        </button>
      </div>
      {showForm && (
        <FormAddColor
          handleCloseForm={handleCloseForm}
          handleAddColor={handleAddColor}
        />
      )}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Color</th>

              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {colors.map((color) => (
              <tr
                key={color.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  <div className="font-medium">{color.id}</div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="font-medium">{color.name}</div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div
                    className="font-medium w-5 h-5 rounded"
                    style={{ backgroundColor: color.code }}
                    title={color.code}
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Link
                      to={`/color/detail/${color.id}`}
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => {
                        setIsDelete(true);
                        setSelectedId(color.id);
                      }}
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
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
          handleDeleteColor(selectedSId);
          setIsDelete(false);
        }}
        itemName="color"
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
}
