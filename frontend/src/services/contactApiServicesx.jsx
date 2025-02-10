import { API } from "../axios/apiWrapper";

// Fetch all contacts
export const getContactLists = async () => {
  try {
    const response = await API.get(
      `/app/v1/contacts?name=mia&page=1&perPage=5`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addContact = async (data) => {
  try {
    const response = await API.post(`/app/v1/contacts/new-contact`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const deleteContact = async (contactId) => {
  try {
    const response = await API.delete(
      `/app/v1/contacts/${contactId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
