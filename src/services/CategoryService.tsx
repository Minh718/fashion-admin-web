import { baseURL } from "../constants";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";

const getAllCategories = async () => {
  const res = await api.get(baseURL + "/category/all");
  return handleApiResponse(res).result;
};
const getAllCategoryForAdmin = async (data) => {
  const res = await api.get(baseURL + "/category/admin/all", { params: data });
  return handleApiResponse(res);
};
const addCategory = async (data) => {
  const res = await api.post(baseURL + "/category/add", data);
  return handleApiResponse(res);
};
const deleteCategory = async (id) => {
  const res = await api.delete(baseURL + "/category/" + id);
  return handleApiResponse(res);
};
const deleteSize = async (id) => {
  const res = await api.delete(baseURL + "/category/size/" + id);
  return handleApiResponse(res);
};
const getDetailCategory = async (id) => {
  const res = await api.get(baseURL + "/category/detail/" + id);
  return handleApiResponse(res).result;
};
const updateSize = async (data) => {
  const res = await api.post(baseURL + "/category/updateSize", data);
  return handleApiResponse(res);
};
const addSize = async (data) => {
  const res = await api.post(baseURL + "/category/addSize", data);
  return handleApiResponse(res);
};
const deleteSubCategory = async (id) => {
  const res = await api.delete(baseURL + "/category/subCategory/" + id);
  return handleApiResponse(res);
};
const updateSubCategory = async (data) => {
  const res = await api.post(baseURL + "/category/updateSubCategory", data);
  return handleApiResponse(res);
};
const addSubCategory = async (data) => {
  const res = await api.post(baseURL + "/category/addSubCategory", data);
  return handleApiResponse(res);
};
export {
  getAllCategories,
  deleteSubCategory,
  updateSubCategory,
  addSubCategory,
  getAllCategoryForAdmin,
  addCategory,
  deleteCategory,
  getDetailCategory,
  deleteSize,
  updateSize,
  addSize,
};
