import { baseURL } from "../constants";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";
const getStatisticsDashboard = async (type) => {
  try {
    const res = await api.get(baseURL + "/statistic/dashboard?type=" + type);
    return handleApiResponse(res).result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { getStatisticsDashboard };
