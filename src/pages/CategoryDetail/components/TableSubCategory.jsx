import React, { useState } from "react";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import { notifyError, notifySuccess } from "../../../components/toastNotify";
import ColSubCategory from "./ColSubCategory";
import { deleteSubCategory } from "../../../services/CategoryService";

export default function TableSubCategory({
  subCategories,
  handleDeleteSubCategory,
  setSubCategories,
}) {
  const [isDelete, setIsDelete] = React.useState(false);
  const handleUpdateSetSubCategories = (subCategoryRes) => {
    setSubCategories(
      subCategories.map((subCategory) =>
        subCategory.id === subCategoryRes.id ? subCategoryRes : subCategory
      )
    );
  };
  const [selectedSId, setSelectedId] = useState(null);
  const handleDeleteSubCategories = async (id) => {
    try {
      await deleteSubCategory(id);
      notifySuccess("Delete subcategory successfully");
      handleDeleteSubCategory(id);
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
          {subCategories.map((subCategory) => (
            <ColSubCategory
              key={subCategory.id}
              subCategory={subCategory}
              handleUpdateSetSubCategories={handleUpdateSetSubCategories}
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
          handleDeleteSubCategories(selectedSId);
          setIsDelete(false);
        }}
        itemName="subCategory"
      />
    </div>
  );
}
