import React, { useState } from "react";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import { notifyError, notifySuccess } from "../../../components/toastNotify";
import { deleteSize } from "../../../services/CategoryService";
import ColSize from "./ColSize";

export default function TableSize({ sizes, handleDeleteSize, setSizes }) {
  const sortSizesById = (sizes) => {
    return sizes.sort((a, b) => a.id - b.id);
  };
  const [isDelete, setIsDelete] = React.useState(false);
  const handleUpdateSetSizes = (sizeRes) => {
    setSizes(sizes.map((size) => (size.id === sizeRes.id ? sizeRes : size)));
  };
  const [selectedSId, setSelectedId] = useState(null);
  const handleDeleteSize2 = async (id) => {
    try {
      await deleteSize(id);
      notifySuccess("Delete color successfully");
      handleDeleteSize(id);
      //   setColors(colors.filter((color) => color.id !== id));
    } catch (err) {
      notifyError("error occur");
    }
  };
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-2 px-6 text-left">ID</th>
            <th className="py-2 px-6 text-left w-[70%]">Name</th>

            <th className="py-2 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {sortSizesById(sizes).map((size) => (
            <ColSize
              key={size.id}
              size={size}
              handleUpdateSetSizes={handleUpdateSetSizes}
              setIsDelete={setIsDelete}
              setSelectedId={setSelectedId}
            />
          ))}
        </tbody>
      </table>
      <ConfirmDeleteModal
        isOpen={isDelete}
        onClose={() => setIsDelete(false)}
        onConfirm={() => {
          handleDeleteSize2(selectedSId);
          setIsDelete(false);
        }}
        itemName="size"
      />
    </div>
  );
}
