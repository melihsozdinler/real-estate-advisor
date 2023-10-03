/* eslint-disable consistent-return */
import axios from 'axios';

export const getPropertyData = async (status, text, propertyType) => {
  try {
    const { data: { property } } = await axios.get(`http://localhost:8081/db/properties/filter?status=${status}&text=${text}&type=${propertyType}`, {
    });
    console.log(status + text + propertyType);
    return property;
  } catch (error) {
    console.log(error);
  }
};
