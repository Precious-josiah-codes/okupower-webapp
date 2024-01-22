import { handleRouteAuthorization } from "@/lib/auth";
import axios from "axios";
import { create } from "zustand";

export const useBandStore = create((set, get) => ({
  errorMsg: null,
  bandLoader: false,
}));

// create band
export const createBand = async (data) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    // make request
    const { status } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/?account=${accounts[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    );

    if (status === 201) {
      return { msg: "Successfully created", success: true };
    }
  } catch (error) {
    console.log(error, "this is the error");
    return { msg: error.response.data.detail, success: false };
  }
};

// get band metric
export const getBandMetrics = async () => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    // make request
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/?account=${accounts[0]["id"]}`,
      {
        headers: headers,
      }
    );

    if (status === 200) {
      console.log(data.results, "metric");
      return { msg: data.results, success: true };
    }
  } catch (error) {
    console.log(error, "this is the error");
    return { msg: "error.response.data.detail", success: false };
  }
};

// get devices in band
export const getBandDevices = async (id) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    // make request
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/${id}/devices/?account=${accounts[0]["id"]}`,
      {
        headers: headers,
      }
    );

    if (status === 200) {
      console.log(data, "the devices");
      return { msg: data.results, success: true };
    }
  } catch (error) {
    console.log(error, "this is the error");
    return { msg: "error.response.data.detail", success: false };
  }
};

// search devices in band
export const searchBandDevices = async (id, searchTerm) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    // make request
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/${id}/devices/?account=${accounts[0]["id"]}&q=${searchTerm}`,
      {
        headers: headers,
      }
    );

    if (status === 200) {
      console.log(data.results, "the devices");
      return { msg: data.results, success: true };
    }
  } catch (error) {
    console.log(error, "this is the error");
    return { msg: "error.response.data.detail", success: false };
  }
};

// sort band
export const sortBandDevices = async (id, sortBy) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    // make request
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/${id}/devices/?account=${accounts[0]["id"]}&order_by=${sortBy}`,
      {
        headers: headers,
      }
    );

    if (status === 200) {
      console.log(data.results, "the devices");
      return { msg: data.results, success: true };
    }
  } catch (error) {
    console.log(error, "this is the error");
    return { msg: "error.response.data.detail", success: false };
  }
};

// delete devices in band
export const deleteBand = async (bandId) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();
    console.log(headers);

    // make request
    const { data, status } = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/${bandId}/?account=${accounts[0]["id"]}`,
      {
        headers: headers,
      }
    );

    if (status === 200) {
      console.log(data, "the devices");
      return { msg: data.results, success: true };
    }
  } catch (error) {
    return { msg: error.response.data.detail, success: false };
  }
};

// delete devices in band
export const deleteBandDevices = async (bandId, deviceIds) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();
    console.log(headers);

    // make request
    const { data, status } = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/${bandId}/devices/?account=${accounts[0]["id"]}`,
      {
        headers: headers,
        data: {
          devices: deviceIds,
        },
      }
    );

    if (status === 200) {
      console.log(data, "the devices");
      return { msg: data.results, success: true };
    }
  } catch (error) {
    const deviceAlreadyDeleted =
      error.response.data.detail.includes("does not belong to");

    if (deviceAlreadyDeleted) {
      return { msg: "Device has already been deleted", success: false };
    }
    return { msg: error.response.data.detail, success: false };
  }
};

// delete all devices in band
export const deleteAllBandDevices = async (bandId) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();
    console.log(headers);

    // make request
    const { data, status } = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/${bandId}/delete_all_devices/?account=${accounts[0]["id"]}`,
      {
        headers: headers,
      }
    );

    console.log(data, status, "delete data");

    if (status === 200) {
      console.log(data, "the devices");
      return { msg: data.results, success: true };
    }
  } catch (error) {
    console.log(error, "the eror");
    return { msg: error.response.data.detail, success: false };
  }
};

// move device to another band
export const moveDeviceToBand = async (bandId, data) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    // make request
    const { status } = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/${bandId}/devices/?account=${accounts[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    );

    if (status === 202) {
      return { msg: "Successfully created", success: true };
    }
  } catch (error) {
    console.log(error, "this is the error");
    return { msg: error.response.data.detail, success: false };
  }
};

// give bonus to the user
export const giveBonusToDevice = async (bandId, data) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    // make request
    const { status } = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/${bandId}/give_multiple_device_bonus/?account=${accounts[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    );

    if (status === 200) {
      return {
        msg: "Bonus has been successfully given to the devices",
        success: true,
      };
    }
  } catch (error) {
    console.log(error, "this is the error");
    return { msg: error.response.data.detail, success: false };
  }
};

// give bonus to a band
export const giveBonusToBand = async (bandId, bandName, data) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    // make request
    const { status } = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/${bandId}/give_bonus/?account=${accounts[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    );

    console.log(status, "the status");
    if (status === 200) {
      return {
        msg: `Bonus has been successfully given to the band ${bandName}`,
        success: true,
      };
    }
  } catch (error) {
    console.log(error, "this is the error");
    return { msg: error.response.data.detail, success: false };
  }
};

// give bonus to multiple bands
export const giveBonusMultipleBands = async (data) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    // make request
    const { status } = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/give_multiple_band_bonus/?account=${accounts[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    );

    console.log(status, "the status");
    if (status === 200) {
      return {
        msg: `Bonus has been successfully given to the selected bands`,
        success: true,
      };
    }
  } catch (error) {
    console.log(error, "this is the error");
    return { msg: error.response.data.detail, success: false };
  }
};

// edit the band
export const editBand = async (bandId, data) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    // make request
    const { status } = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/${bandId}/?account=${accounts[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    );

    console.log(status, "this is the statius");

    if (status === 200) {
      return { msg: "Band has been successfully updated", success: true };
    }
  } catch (error) {
    console.log(error, "this is the error");
    return { msg: error.response.data.detail, success: false };
  }
};
