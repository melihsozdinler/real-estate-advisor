/* eslint-disable consistent-return */
import axios from 'axios';

export const getPropertyData = async (status, text) => {
  try {
    const { data: { property } } = await axios.get(`http://localhost:8081/db/properties/filter?status=${status}&text=${text}`, {
    });
    console.log(status + text);
    return property;
  } catch (error) {
    console.log(error);
  }
};
