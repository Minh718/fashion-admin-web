import Cookies from "js-cookie";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";
import axios from "axios";
import { baseURL } from "../constants";
const getMyInfo = async () => {
  const idUser = Cookies.get("x-user-id");
  if (!idUser) return null;
  try {
    const res = await api.get("/user/admin-info");
    return res;
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
