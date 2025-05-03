import Cookies from "js-cookie";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";
import axios from "axios";
import { baseURL } from "../constants";
const getProductsForAdminTable = async (data) => {
  const res = await api.get(baseURL + "/product/admin/all", { params: data });
  return handleApiResponse(res);
};
const getProductDetailAdmin = async (id) => {
  const res = await api.get(baseURL + "/product/admin/" + id);
  return handleApiResponse(res).result;
};
const getAllColorsOfProduct = async (id) => {
  const res = await api.get(baseURL + "/color/productSize/" + id);
  return handleApiResponse(res);
};
const updateQuantityForProduct = async (data) => {
  const res = await api.post(baseURL + "/product/updateQuantity", data);
  return handleApiResponse(res);
};
const addQuantityForProduct = async (data) => {
  const res = await api.post(baseURL + "/product/addQuantity", data);
  return handleApiResponse(res);
};
const deleteProduct = async (id) => {
  const res = await api.delete(baseURL + "/product/" + id);
  return handleApiResponse(res);
};
const publishProduct = async (id) => {
  const res = await api.get(baseURL + "/product/publish/" + id);
  return handleApiResponse(res);
};

const draftProduct = async (id) => {
  const res = await api.get(baseURL + "/product/draft/" + id);
  return handleApiResponse(res);
};

const addProduct = async (form) => {
  const res = await api.post(baseURL + "/product/add", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return handleApiResponse(res);
};
export {
  getProductsForAdminTable,
  getProductDetailAdmin,
  getAllColorsOfProduct,
  updateQuantityForProduct,
  addQuantityForProduct,
  deleteProduct,
  draftProduct,
  publishProduct,
  addProduct,
};
