import axios from "axios";

const API = "https://grandsameerevents.com/8001/api/contact";

// GET All Contacts
export const getContactsApi = () => {
  return axios.get(API);
};

// DELETE Contact
export const deleteContactApi = (id) => {
  return axios.delete(`${API}/${id}`);
};
