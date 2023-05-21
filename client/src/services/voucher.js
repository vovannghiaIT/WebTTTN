import axios from "axios";
import axiosConfig from "../axiosConfig";

export const apiGetVouchers = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/voucher/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiInsertVouchers = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/voucher/insert",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateVouchers = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/voucher/update",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteVouchers = (_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: "/api/v1/voucher/delete",
        data: _id,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
