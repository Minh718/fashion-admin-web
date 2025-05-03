import React, { useEffect, useState } from "react";
import { FaEdit, FaFilter, FaPlus, FaSort, FaTrash } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { notifyError, notifySuccess } from "../../components/toastNotify";
import { menuItemsEnum } from "../../constants";
import {
  activeVoucher,
  deleteVoucher,
  getAllVoucher,
  unactiveVoucher,
} from "../../services/voucherService";
import AddVoucher from "./components/AddVoucher";
import { TypeVoucher } from "../../enum/TypeVoucher";
const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Vouchers",
    url: "/vouchers",
  },
];
const Vouchers = () => {
  const { setActiveItem } = useOutletContext();
  const [size, setSize] = useState(10);
  const [vouchers, setVouchers] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDelete, setIsDelete] = React.useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [filterTerm, setFilterTerm] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [voucherEdit, setVoucherEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const handleAddVoucher = (voucher) => {
    setVouchers([voucher, ...vouchers]);
  };
  const handleCloseForm = () => {
    setShowForm(false);
    setIsUpdate(false);
    setVoucherEdit(null);
  };
  const handleUpdateVoucher = (updatedVoucher) => {
    setVouchers(
      vouchers.map((item) =>
        item.id === updatedVoucher.id ? updatedVoucher : item
      )
    );
    setIsUpdate(false);
    setVoucherEdit(null);
  };
  const handleDeleteProduct = async (id) => {
    try {
      await deleteVoucher(id);
      notifySuccess("Delete voucher successfully");
      setVouchers(vouchers.filter((voucher) => voucher.id !== id));
    } catch (err) {
      notifyError("error occur");
    }
  };
  const handleStatusVoucher = async (voucher) => {
    const action = voucher.active ? unactiveVoucher : activeVoucher;
    try {
      const res = await action(voucher.id);
      notifySuccess(res.message);
    } catch (error) {}

    setVouchers((prev) =>
      prev.map((item) =>
        item.id === voucher.id ? { ...item, active: !item.active } : item
      )
    );
  };
  useEffect(() => {
    // Simulating API call to fetch vouchers
    setIsLoading(true);
    const fetchProducts = async () => {
      let res;
      try {
        res = await getAllVoucher({
          page: currentPage,
          size,
        });
        setVouchers(res.result);
        setMetadata(res.metadata);
        setIsLoading(false);
      } catch (error) {
        notifyError("Error occur");
      }
    };
    fetchProducts();
  }, [currentPage, size]);

  useEffect(() => {
    setActiveItem(menuItemsEnum.VOUCHERS);
  }, []);
  if (isLoading) return <Loading />;

  return (
    <div>
      <Breadcrumbs links={links} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Vouchers Admin</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add Voucher
        </button>
      </div>
      {showForm && (
        <AddVoucher
          isUpdate={isUpdate}
          handleUpdateVoucher={handleUpdateVoucher}
          voucher={voucherEdit}
          handleCloseForm={handleCloseForm}
          handleAddVoucher={handleAddVoucher}
        />
      )}
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Filter vouchers..."
            className="border rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          <FaFilter className="absolute right-3 top-3 text-gray-400" />
        </div>
        <div className="text-gray-600">
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
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left cursor-pointer">
                Voucher Code
              </th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left cursor-pointer">Discount</th>
              <th className="py-3 px-6 text-left cursor-pointer">Min Price</th>
              <th className="py-3 px-6 text-left cursor-pointer">
                Max Discount
              </th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left cursor-pointer">Start Date</th>
              <th className="py-3 px-6 text-left cursor-pointer">End Date</th>
              <th className="py-3 px-6 text-left cursor-pointer">Status</th>
              <th className="py-3 px-6 text-left cursor-pointer">
                For new user
              </th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {vouchers.map((voucher) => (
              <tr
                key={voucher.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  <div className="font-medium">{voucher.code}</div>
                </td>
                <td className="py-3 px-6 text-left">{voucher.type}</td>
                <td className="py-3 px-6 text-left font-bold">
                  {voucher.type === TypeVoucher.FIXED && "$"}
                  {voucher.discount}
                  {voucher.type === TypeVoucher.PERCENT && "%"}
                </td>
                <td className="py-3 px-6 text-left">
                  ${voucher.minPrice.toFixed(2)}
                </td>
                <td className="py-3 px-6 text-left">
                  ${voucher.maxDiscount.toFixed(2)}
                </td>
                <td className="py-3 px-6 text-left">{voucher.description}</td>
                <td className="py-3 px-6 text-left">{voucher.startDate}</td>
                <td className="py-3 px-6 text-left">{voucher.endDate}</td>
                <td className="py-3 px-6 text-left">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={voucher.active}
                      onChange={(e) => handleStatusVoucher(voucher)}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                  </label>
                </td>
                <td className="py-3 px-6 text-left">
                  {voucher.forNewUser ? "Yes" : "No"}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => {
                        setIsUpdate(true);
                        setVoucherEdit(voucher);
                        setShowForm(true);
                      }}
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                      onClick={() => {
                        setIsDelete(true);
                        setSelectedProductId(voucher.id);
                      }}
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
          handleDeleteProduct(selectedProductId);
          setIsDelete(false);
        }}
        itemName="voucher"
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
};

export default Vouchers;
