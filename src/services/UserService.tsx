import Cookies from "js-cookie";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";
import axios from "axios";
import { baseURL } from "../constants";
const unactiveUser = async (id) => {
  const res = await api.get(baseURL + "/user/unactive/" + id);
  return handleApiResponse(res);
};

const activeUser = async (id) => {
  const res = await api.get(baseURL + "/user/active/" + id);
  return handleApiResponse(res);
};
const getAllUser = async (data) => {
  const res = await api.get(baseURL + "/user/all", { params: data });
  return handleApiResponse(res);
};

export { unactiveUser, activeUser, getAllUser };
