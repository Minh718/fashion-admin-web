import React, { useEffect, useState } from "react";
import { TypeVoucher } from "../../../enum/TypeVoucher";
import { VoucherTypeTarget } from "../../../enum/VoucherTypeTarget";
import { createVoucher, updateVoucher } from "../../../services/voucherService";
import { notifySuccess } from "../../../components/toastNotify";

// eslint-disable-next-line react/prop-types
export default function AddVoucher(props) {
  const {
    isUpdate = false,
    voucher = null,
    handleAddVoucher,
    handleUpdateVoucher,
    handleCloseForm,
  } = props;
  const [voucherCode, setVoucherCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [maxDiscount, setMaxDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [minValue, setMinValue] = useState("");
  const [typeVoucher, setTypeVoucher] = useState(TypeVoucher.FIXED);
  const [voucherTargetType, setVoucherTargetType] = useState(
    VoucherTypeTarget.GLOBAL
  );
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      let res;
      if (isUpdate) {
        res = await updateVoucher({
          id: voucher.id,
          code: voucherCode,
          type: typeVoucher,
          discount: discountAmount,
          minPrice: minValue,
          maxDiscount: maxDiscount,
          active: isActive,
          description: description,
          startDate,
          endDate: expirationDate,
        });
        handleUpdateVoucher(res.result);
      } else {
        res = await createVoucher({
          code: voucherCode,
          type: typeVoucher,
          discount: discountAmount,
          minPrice: minValue,
          maxDiscount: maxDiscount,
          active: isActive,
          description: description,
          startDate,
          endDate: expirationDate,
          targetUserType: voucherTargetType,
        });
        handleAddVoucher(res.result);
      }
      notifySuccess(res.message);
      handleCloseForm();
      resetForm();
    }
  };
  const resetForm = () => {
    setVoucherCode("");
    setDiscountAmount("");
    setStartDate("");
    setExpirationDate("");
    setMaxDiscount("");
    setMinValue("");
    setErrors({});
  };
  const validateForm = () => {
    let newErrors = {};
    if (!voucherCode) newErrors.voucherCode = "Voucher code is required";
    if (!discountAmount)
      newErrors.discountAmount = "Discount amount is required";
    else if (isNaN(discountAmount) || Number(discountAmount) <= 0)
      newErrors.discountAmount = "Discount amount must be a positive number";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!expirationDate)
      newErrors.expirationDate = "Expiration date is required";
    if (typeVoucher === typeVoucher.PERCENT && !maxDiscount)
      newErrors.maxDiscount = "Max discount is required";
    // else if (isNaN(maxDiscount) || Number(maxDiscount) <= 0) newErrors.maxDiscount = "Max discount must be a positive number";
    if (!minValue) newErrors.minValue = "Min value is required";
    else if (isNaN(minValue) || Number(minValue) < 0)
      newErrors.minValue = "Min value must be a non-negative number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (isUpdate && voucher) {
      setVoucherCode(voucher.code);
      setTypeVoucher(voucher.type);
      setDiscountAmount(voucher.discount);
      setMinValue(voucher.minPrice);
      setMaxDiscount(voucher.maxDiscount);
      setIsActive(voucher.active);
      setDescription(voucher.description);
      setStartDate(voucher.startDate);
      setExpirationDate(voucher.endDate);
    }
  }, [isUpdate, voucher]);
  return (
    <div
      className="fixed z-20 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {isUpdate ? "Update" : "Create New"} Voucher
          </h3>
          <form onSubmit={handleSubmit} className="mt-2 text-left">
            <div className="mb-4">
              <label
                htmlFor="voucherCode"
                className="block text-sm font-medium text-gray-700"
              >
                Voucher Code
              </label>
              <input
                type="text"
                id="voucherCode"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  errors.voucherCode ? "border-red-500" : ""
                }`}
                aria-invalid={errors.voucherCode ? "true" : "false"}
              />
              {errors.voucherCode && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.voucherCode}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="typeVoucher"
                className="block text-sm font-medium text-gray-700"
              >
                Type voucher
              </label>
              <select
                className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                onChange={(e) => setTypeVoucher(e.target.value)}
                value={typeVoucher}
              >
                <option value={TypeVoucher.FIXED}>{TypeVoucher.FIXED}</option>
                <option value={TypeVoucher.PERCENT}>
                  {TypeVoucher.PERCENT}
                </option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="discountAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Discount Amount{" "}
                {TypeVoucher.FIXED === typeVoucher ? "($)" : "(%)"}
              </label>
              <input
                type="number"
                id="discountAmount"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  errors.discountAmount ? "border-red-500" : ""
                }`}
                aria-invalid={errors.discountAmount ? "true" : "false"}
              />
              {errors.discountAmount && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.discountAmount}
                </p>
              )}
            </div>
            {typeVoucher !== TypeVoucher.FIXED && (
              <div className="mb-4">
                <label
                  htmlFor="maxDiscount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Max Discount
                </label>
                <input
                  type="number"
                  id="maxDiscount"
                  value={maxDiscount}
                  onChange={(e) => setMaxDiscount(e.target.value)}
                  className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    errors.maxDiscount ? "border-red-500" : ""
                  }`}
                  aria-invalid={errors.maxDiscount ? "true" : "false"}
                />
                {errors.maxDiscount && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.maxDiscount}
                  </p>
                )}
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="minValue"
                className="block text-sm font-medium text-gray-700"
              >
                Min Value
              </label>
              <input
                type="number"
                id="minValue"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  errors.minValue ? "border-red-500" : ""
                }`}
                aria-invalid={errors.minValue ? "true" : "false"}
              />
              {errors.minValue && (
                <p className="mt-1 text-sm text-red-500">{errors.minValue}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  errors.startDate ? "border-red-500" : ""
                }`}
                aria-invalid={errors.startDate ? "true" : "false"}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="expirationDate"
                className="block text-sm font-medium text-gray-700"
              >
                Expiration Date
              </label>
              <input
                type="date"
                id="expirationDate"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  errors.expirationDate ? "border-red-500" : ""
                }`}
                aria-invalid={errors.expirationDate ? "true" : "false"}
              />
              {errors.expirationDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.expirationDate}
                </p>
              )}
            </div>
            {!isUpdate && (
              <div className="mb-4">
                <label
                  htmlFor="typeVoucher"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type voucher
                </label>
                <select
                  className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  onChange={(e) => setVoucherTargetType(e.target.value)}
                >
                  {Object.entries(VoucherTypeTarget).map(([key, val]) => (
                    <option key={key} value={val}>
                      {val
                        .replace("_", " ")
                        .toLowerCase()
                        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="active"
                className="block text-sm font-medium text-gray-700"
              >
                <input
                  type="checkbox"
                  name="active"
                  id="active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2">Active Status</span>
              </label>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCloseForm}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                {isUpdate ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
