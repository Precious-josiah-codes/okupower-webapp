import { getCookie } from "@/app/serverActions/cookieActions";
import { handleRouteAuthorization } from "@/lib/auth";
import axios from "axios";
import { create } from "zustand";

export const useBranchStore = create((set, get) => ({
  defaultBranchData: null,
  branches: null,
  branchesCount: null,
}));

// create branches
export const createBranch = async (data) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/branches/?account=${accounts[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    );
    console.log(response, "this is the response");

    if (response.status === 201) {
      return { msg: response.data, success: true };
    }
  } catch (error) {
    console.error("error: ", error);
    return { msg: error.response.data.detail, success: false };
  }
};

// get branches
export const getBranches = async () => {
  const { headers, accounts } = await handleRouteAuthorization();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/branches/?account=${accounts[0]["id"]}`,
      {
        headers: headers,
      }
    );

    if (response.status === 200) {
      console.log("response", response);
      useBranchStore.setState({ branches: response.data.results });
      useBranchStore.setState({ branchesCount: response.data.count });
      useBranchStore.setState({ defaultBranchData: response.data.results });
      return true;
    }
  } catch (error) {
    console.error(error, "error");
  }
};

// edit branches
export const editBranch = async (data, branchId) => {
  console.log(branchId, "edit branch");
  try {
    const { headers, accounts } = await handleRouteAuthorization();
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/branches/${branchId}/?account=${accounts[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    );
    console.log(response, "this is the response");

    if (response.status === 200) {
      return { msg: response.data, success: true };
    }
  } catch (error) {
    console.error("error: ", error);
    return { msg: error.response.data.detail, success: false };
  }
};

// delete branch
export const deleteBranch = async (branchId) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/branches/${branchId}/?account=${accounts[0]["id"]}`,
      {
        headers: headers,
      }
    );
    console.log(response, "this is the response");

    if (response.status === 204) {
      return { msg: response.data, success: true };
    }
  } catch (error) {
    console.error("error: ", error);
    return { msg: error.response.data.detail, success: false };
  }
};

// sort branches
export const sortBranches = async (sortBy) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/branches/?account=${accounts[0]["id"]}&ordering=${sortBy}`,
      {
        headers: headers,
      }
    );
    console.log(response, "this is the response");

    if (response.status === 200) {
      useBranchStore.setState({ branches: response.data.results });
      return { msg: response.data.results, success: true };
    }
  } catch (error) {
    console.error("error: ", error);
    return { msg: error.response.data.detail, success: false };
  }
};

// search branch
export const searchBranches = async (searchTerm) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/branches/?account=${accounts[0]["id"]}&search=${searchTerm}`,
      {
        headers: headers,
      }
    );
    console.log(response, "this is the response");

    if (response.status === 200) {
      useBranchStore.setState({ branches: response.data.results });
      return { msg: response.data.results, success: true };
    }
  } catch (error) {
    console.error("error: ", error);
    return { msg: error.data.detail, success: false };
  }
};

// clear search and sorting
export const clearSearchSort = () => {
  const defaultBranches = useBranchStore.getState().defaultBranchData;
  useBranchStore.setState({ branches: defaultBranches });
};
