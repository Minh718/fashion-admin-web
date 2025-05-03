import Cookies from "js-cookie";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";
import axios from "axios";
import { baseURL } from "../constants";
const getMyInfo = async () => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) return null;
  try {
    const res = await api.get("/user/admin-info");
    return handleApiResponse(res).result;
  } catch (err) {
    return null;
  }
};
const adminLogin = async (data) => {
  try {
    const res = await axios.post(baseURL + `/auth/admin/signin`, data);
    return handleApiResponse(res).result;
  } catch (e) {
    console.log(e);
  }
};
export { getMyInfo, adminLogin };
