import { baseURL } from "../constants";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";

const findAllColorNotInProductSize = async (idProductSize) => {
  const res = await api.get(baseURL + "/color/" + idProductSize);
  return handleApiResponse(res);
};
const getAllColorForAdmin = async (data) => {
  const res = await api.get(baseURL + "/color/admin/all", { params: data });
  return handleApiResponse(res);
};
const deleteColor = async (id) => {
  const res = await api.delete(baseURL + "/color/" + id);
  return handleApiResponse(res);
};
const addColor = async (data) => {
  const res = await api.post(baseURL + "/color/add", data);
  return handleApiResponse(res);
};
export {
  findAllColorNotInProductSize,
  getAllColorForAdmin,
  deleteColor,
  addColor,
};
