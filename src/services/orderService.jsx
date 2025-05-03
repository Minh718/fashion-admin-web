import { baseURL } from "../constants";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";
const getOrders = async (data, filterStatus) => {
  let res;
  if (filterStatus === "all") {
    res = await api.get(baseURL + "/order/admin/all", {
      params: data,
    });
  } else {
    res = await api.get(baseURL + "/order/admin/filter/" + filterStatus, {
      params: data,
    });
  }
  return handleApiResponse(res);
};
const updateStatusOrder = async (id, statusOrder) => {
  const res = await api.put(baseURL + `/order/${id}/${statusOrder}`);
  return handleApiResponse(res);
};
const getDetailOrder = async (id) => {
  const res = await api.get(baseURL + "/order/admin/detail/" + id);
  return handleApiResponse(res).result;
};
export { getOrders, updateStatusOrder, getDetailOrder };
