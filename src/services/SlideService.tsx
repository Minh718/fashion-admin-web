import { baseURL } from "../constants";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";
const unactiveSlide = async (id) => {
  const res = await api.put(baseURL + "/slide/unactive/" + id);
  return handleApiResponse(res);
};

const activeSlide = async (id) => {
  const res = await api.put(baseURL + "/slide/active/" + id);
  return handleApiResponse(res);
};
const getAllSlides = async (data) => {
  const res = await api.get(baseURL + "/slide/all", data);
  return handleApiResponse(res);
};
const deleteSlide = async (id) => {
  const res = await api.delete(baseURL + "/slide/" + id);
  return handleApiResponse(res);
};
const addSlide = async (data) => {
  const res = await api.post(baseURL + "/slide/add", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return handleApiResponse(res);
};
export { activeSlide, addSlide, deleteSlide, getAllSlides, unactiveSlide };
