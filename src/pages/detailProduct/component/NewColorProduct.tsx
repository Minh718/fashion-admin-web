import React, { useEffect, useState } from "react";
import { notifyError } from "../../../components/toastNotify";
import { findAllColorNotInProductSize } from "../../../services/ColorService";
import { Color } from "../../../types/Color";

export default function NewColorProduct({
  size,
  handleAddnewColor,
  setNewColor,
}) {
  const [colors, setColors] = useState<Color[]>([]);
  const [color, setColor] = useState<Color | null>(null);
  const [quantity, setQuantity] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedColor =
      colors.find((color) => color.id === selectedId) || null;

    setColor(selectedColor);
  };
  console.log(color);
  useEffect(() => {
    const fetchColors = async () => {
      if (!size?.id) return;

      setIsLoading(true);
      try {
        const data = await findAllColorNotInProductSize(size.id);
        setColors(data.result);
      } catch (err) {
        console.error(err);
        notifyError("Error occurred while fetching colors.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchColors();
  }, [size?.id]);
  if (isLoading) return <></>;
  return (
    <div className="min-w-[300px] flex flex-col gap-4">
      <h1 className="text-center text-[22px] text-black italic">
        Add new color
      </h1>

      {/* Color Select */}
      <div className="flex flex-col">
        <label htmlFor="colorSelect" className="mb-1 font-medium text-gray-700">
          Color
        </label>
        <select
          id="colorSelect"
          value={color?.id}
          onChange={handleChangeColor}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {colors.map((color1) => (
            <option key={color1.id} value={color1.id}>
              {color1.name}
            </option>
          ))}
        </select>
        {/* Optional: color preview for selected item */}
        {color && (
          <div
            className="w-5 h-5 mt-2 rounded"
            style={{ backgroundColor: color.code }}
          ></div>
        )}
      </div>

      {/* Quantity Input */}
      <div className="flex flex-col">
        <label htmlFor="quantity" className="mb-1 font-medium text-gray-700">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-2">
        <button
          onClick={() => {
            console.log(color);
            handleAddnewColor(color, quantity);
          }}
          className="bg-blue-500 text-white px-5 py-1 rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
        <button
          onClick={() => setNewColor(false)}
          className="bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
