import { API } from "../axios/apiWrapper";

const ContactService = {
  getContactDetails: async (id) => {
    try {
      const response = await API.get(`/app/v1/contacts/contact-details/${id}`);
      if (response.status === 200) {
        const data = response.data.data?.details;
        return data;
      }
    } catch (err) {
      throw new Error(err?.response?.data?.message || err.message);
    }
  },

  updateContact: async (id, contactData) => {
    try {
      const response = await API.put(
        `/app/v1/contacts/edit-contact/${id}`,
        contactData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        return response?.data?.data;
      }
    } catch (err) {
      throw new Error(err?.response?.data?.message || err.message);
    }
  },

  deleteContact: async (id) => {
    try {
      await API.delete(`/app/v1/contacts/delete-contact/${id}`);
    } catch (err) {
      throw new Error(err?.response?.data?.message || err.message);
    }
  },
};

export default ContactService;
