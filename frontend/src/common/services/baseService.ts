import axiosClient from "api/axiosClient";
import { store } from "redux/configureStore";

export const baseService = {
  GET: (url: string) => {
    const accessToken = store.getState().authReducer.accessToken;
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  POST: (url: string, data: any) => {
    const accessToken = store.getState().authReducer.accessToken;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  PUT: (url: string, data: any) => {
    const accessToken = store.getState().authReducer.accessToken;
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  PATCH: (url: string, data: any) => {
    const accessToken = store.getState().authReducer.accessToken;
    return axiosClient.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  DELETE: (url: string, data?: any) => {
    const accessToken = store.getState().authReducer.accessToken;
    return axiosClient.delete(url, {
      data: data || {},
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
