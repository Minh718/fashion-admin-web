import { baseURLImages } from "../constants";

export const getUrlImage = (url) => {
  if (!url) return ""; // or a default image URL
  return url.startsWith("http") ? url : `${baseURLImages}/${url}`;
};
