import { baseURL } from "../constants";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "../utils/utilApi";

const getChatBoxListUnSeenByAdmin = async () => {
  const res = await api.get(baseURL + "/messages/admin/cbus/unseen");
  return handleApiResponse(res).result;
};
const getChatBoxListByAdmin = async () => {
  const res = await api.get(baseURL + "/messages/admin/cbus/all");
  return handleApiResponse(res).result;
};
const adminGetMessages = async ({ size, chatBoxId }) => {
  const res = await api.get(
    baseURL + "/messages/admin/get?size=" + size + "&chatBoxId=" + chatBoxId
  );
  return handleApiResponse(res).result;
};
const adminSendMessage = async (data) => {
  const res = await api.post(baseURL + "/messages/admin/send", data);
  return handleApiResponse(res).result;
};

export {
  getChatBoxListUnSeenByAdmin,
  adminGetMessages,
  adminSendMessage,
  getChatBoxListByAdmin,
};
