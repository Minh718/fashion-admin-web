import React from "react";

export default function RowTablePsc({ psc, price, handleUpdateQuantity }) {
  const [curQuantity, setCurQuantity] = React.useState(psc.totalQuantity);
  console.log(curQuantity === psc.totalQuantity);
  return (
    <tr>
      <td className="px-2 py-1 text-center">{psc.name}</td>
      <td className="px-2 py-1 text-center">
        <div
          className="w-5 h-5 mx-auto rounded"
          style={{ backgroundColor: psc.color }}
        ></div>
      </td>
      <td className="px-2 py-1 text-center">
        <input
          type="number"
          className="p-2 border-2 rounded w-20 text-center"
          value={curQuantity}
          onChange={(e) => setCurQuantity(+e.target.value)}
        />
      </td>
      <td className="px-2 py-1 text-center">{psc.totalSales}</td>
      <td className="px-2 py-1 text-center">${psc.totalSales * price}</td>
      <td className="px-2 py-1 text-center">
        {curQuantity !== psc.totalQuantity ? (
          <button
            onClick={() => handleUpdateQuantity(psc.id, curQuantity)}
            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
          >
            Update
          </button>
        ) : (
          <button className="bg-slate-500 cursor-not-allowed text-white px-2 py-1 rounded-md">
            Update
          </button>
        )}
        <button className="text-red-500 font-bold px-2 py-1 rounded-md hover:text-white ml-2 hover:bg-red-500 transition">
          Delete
        </button>
      </td>
    </tr>
  );
}
