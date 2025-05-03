import Cookies from "js-cookie";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";
import axios from "axios";
import { baseURL } from "../constants";
const unactiveVoucher = async (id) => {
  const res = await api.get(baseURL + "/vouchers/unactive/" + id);
  return handleApiResponse(res);
};

const activeVoucher = async (id) => {
  const res = await api.get(baseURL + "/vouchers/active/" + id);
  return handleApiResponse(res);
};
const getAllVoucher = async (data) => {
  const res = await api.get(baseURL + "/vouchers/all", data);
  return handleApiResponse(res);
};
const deleteVoucher = async (id) => {
  const res = await api.delete(baseURL + "/vouchers/" + id);
  return handleApiResponse(res);
};
const createVoucher = async (data) => {
  const res = await api.post(baseURL + "/vouchers/create", data);
  return handleApiResponse(res);
};
const updateVoucher = async (data) => {
  const res = await api.put(baseURL + "/vouchers", data);
  return handleApiResponse(res);
};
export {
  unactiveVoucher,
  activeVoucher,
  getAllVoucher,
  deleteVoucher,
  updateVoucher,
  createVoucher,
};
