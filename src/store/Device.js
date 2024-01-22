import axios from "axios";
import { create } from "zustand";

const token = JSON.parse(localStorage.getItem("token"));
const headers = {
  Authorization: `Bearer ${token.access}`,
};

export const useDeviceStore = create((set, get) => ({
  errorMsg: null,
  deviceLoader: false,
}));

// create branches
export const createDevice = (data) => {
  // toggle the deviceLoader
  useDeviceStore.setState((state) => ({
    deviceLoader: !state.deviceLoader,
  }));

  // reset the error message
  useDeviceStore.setState({ errorMsg: null });

  // make request
  axios
    .post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/manage/devices/?account=${token.account[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    )
    .then(function (response) {
      // route the user to the dashboard page
      window.location.href = "/";

      // toggle the deviceLoader
      useDeviceStore.setState((state) => ({
        deviceLoader: !state.deviceLoader,
      }));
    })
    .catch(function (error) {
      // toggle the deviceLoader
      useDeviceStore.setState((state) => ({
        deviceLoader: !state.deviceLoader,
      }));

      // set error message
      useDeviceStore.setState({
        errorMsg: Object.values(error.response.data)[0],
      });
    });
};
