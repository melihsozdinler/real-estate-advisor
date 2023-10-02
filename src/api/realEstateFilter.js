/* eslint-disable consistent-return */
import axios from 'axios';

export const getPropertyData = async (status) => {
  try {
    const { data: { property } } = await axios.get(`http://localhost:8081/db/properties/filter?status=${status}`, {
    });
    console.log(status);
    return property;
  } catch (error) {
    console.log(error);
  }
};
