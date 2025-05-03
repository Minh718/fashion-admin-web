import { baseURL } from "../constants";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";

const getALlBrands = async () => {
  const res = await api.get(baseURL + "/brand/all");
  return handleApiResponse(res).result;
};

export { getALlBrands };
