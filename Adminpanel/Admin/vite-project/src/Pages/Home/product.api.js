import axios from "axios";

const API_URL = "http://13.232.248.125:8001/api/create";

export const createProductApi = (formData) => {
  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
