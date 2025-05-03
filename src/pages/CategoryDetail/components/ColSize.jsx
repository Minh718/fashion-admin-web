import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { updateSize } from "../../../services/CategoryService";
import { notifyError, notifySuccess } from "../../../components/toastNotify";

export default function ColSize({
  size,
  setIsDelete,
  setSelectedId,
  handleUpdateSetSizes,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [newSize, setNewSize] = useState(size.name);
  const handleUpdateSize = async () => {
    try {
      const res = await updateSize({ idSize: size.id, name: newSize });
      notifySuccess(res.message);
      handleUpdateSetSizes(res.result);
      setIsEdit(false);
    } catch (err) {
      console.log(err);
      notifyError("error occur");
    }
  };
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-2 px-6 text-left">
        <div className="font-medium">{size.id}</div>
      </td>
      <td className="py-2 px-6 text-left flex gap-5">
        <input
          className="font-bold px-2 py-1 "
          value={newSize}
          onChange={(e) => setNewSize(e.target.value)}
          disabled={!isEdit}
        />
        {isEdit && (
          <div className="flex gap-2">
            <button
              className="font-bold border px-2 rounded bg-green-500 hover:bg-green-600 text-white"
              disabled={newSize === size.name}
              onClick={handleUpdateSize}
            >
              update
            </button>
            <button
              onClick={() => {
                setNewSize(size.name);
                setIsEdit(false);
              }}
              className="font-bold border px-2 rounded bg-red-500 hover:bg-red-600 text-white"
            >
              Cancel
            </button>
          </div>
        )}
      </td>
      <td className="py-2 px-6 text-center">
        <div className="flex item-center justify-center">
          <button
            onClick={() => setIsEdit(true)}
            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => {
              setIsDelete(true);

              setSelectedId(size.id);
            }}
            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}
