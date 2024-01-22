import { getCookie } from "@/app/serverActions/cookieActions";
import { handleRouteAuthorization } from "@/lib/auth";
import axios from "axios";
import { create } from "zustand";

export const useAccountStore = create((set, get) => ({
  sideMenu: false,
  authLoader: false,
  error: null,
  companyProfileLoader: false,
  companyBankDetailsLoader: false,
  profile: null,
}));

// checking if user is still logged in or hasnt created an account
export const validateSession = () => {
  const session = JSON.parse(localStorage.getItem("token"));
  if (!session) {
    window.location.href = "/login";
  }
};

// create an account for the user
export const signUp = (data) => {
  console.log("this is the sifgh up", data);
  useAccountStore.setState((state) => ({
    authLoader: !state.authLoader,
  }));

  // reset the error state
  if (useAccountStore.getState().error) {
    useAccountStore.setState((state) => ({
      error: null,
    }));
  }

  axios
    .post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/?account_type=DISCO`,
      data
    )
    .then(function (response) {
      console.log(response.data, "success");

      // toggle the autloader state
      useAccountStore.setState((state) => ({
        authLoader: !state.authLoader,
      }));

      // route the user to the otp page
      window.location.href = `/otp?email=${data.email}`;
    })
    .catch(function (error) {
      console.log(Object.values(error.response.data)[0], "error");
      useAccountStore.setState((state) => ({
        authLoader: !state.authLoader,
      }));
      useAccountStore.setState((state) => ({
        error: {
          title: "Error",
          message: Object.values(error.response.data)[0],
        },
      }));
    });
};

// validate the user account through otp
export const login = async (data) => {
  useAccountStore.setState((state) => ({
    authLoader: !state.authLoader,
  }));

  // reset the error state
  if (useAccountStore.getState().error) {
    useAccountStore.setState((state) => ({
      error: null,
    }));
  }

  // make the request to validate the token
  return await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_JWT_BASE_URL}/create/`, data)
    .then(function (response) {
      // save the user token to local storage
      localStorage.setItem("token", JSON.stringify(response.data));

      return JSON.stringify(response.data);

      // reset the authLoader
      // useAccountStore.setState((state) => ({
      //   authLoader: !state.authLoader,
      // }));

      // route the user to the otp page
      // window.location.href = "/";
    })
    .catch(function (error) {
      console.log(error, "error");
      // reset the authLoader
      useAccountStore.setState((state) => ({
        authLoader: !state.authLoader,
      }));

      // set error message
      useAccountStore.setState((state) => ({
        error: {
          title: "Error",
          message: Object.values(error.response.data)[0],
        },
      }));
    });
};

// validate the user account through otp
export const validateToken = (token) => {
  useAccountStore.setState((state) => ({
    authLoader: !state.authLoader,
  }));

  // reset the error state
  if (useAccountStore.getState().error) {
    useAccountStore.setState((state) => ({
      error: null,
    }));
  }

  // make the request to validate the token
  axios
    .post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/activation/`,
      token
    )
    .then(function (response) {
      console.log(response.data, "success");

      // reset the authLoader
      useAccountStore.setState((state) => ({
        authLoader: !state.authLoader,
      }));

      // route the user to the otp page
      window.location.href = "/login";
    })
    .catch(function (error) {
      console.log(error.response, "error");
      // reset the authLoader
      useAccountStore.setState((state) => ({
        authLoader: !state.authLoader,
      }));

      // set error message
      useAccountStore.setState((state) => ({
        error: {
          title: "Error",
          message: Object.values(error.response.data)[0],
        },
      }));
    });
};

// resend token to user mail
export const resendToken = async (email) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/resend_activation/`,
    email
  );

  console.log(response, "na the otp");
};

// get the user profile
export const getUserProfile = async () => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    console.log(accounts, "the account");
    // making the request
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/me/?account=${accounts[0]["id"]}`,
      {
        headers: headers,
      }
    );

    console.log(response.data, "dt");

    if (response.status === 200) {
      // destructuring the response data
      const { setup_info, account, email, name } = response.data;
      useAccountStore.setState({
        profile: {
          position: account.position,
          email,
          name,
          avatar: name[0],
        },
      });
      return true;
    }
  } catch (error) {
    console.error(error, "this is from the error");
  }
};

// create the company profile
export const createCompanyProfile = async (data) => {
  // reset the companyProfileLoader
  useAccountStore.setState((state) => ({
    companyProfileLoader: !state.companyProfileLoader,
  }));

  const { headers, accounts } = await handleRouteAuthorization();

  axios
    .post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/discos/?account=${accounts[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    )
    .then(function (response) {
      // set the company profile cookies

      // route the user to the dashboard page
      window.location.href = "/";

      console.log(response, "this is the response");
    })
    .catch(function (error) {
      console.log(error, "error");
      // toggle the companyProfileLoader
      useAccountStore.setState((state) => ({
        companyProfileLoader: !state.companyProfileLoader,
      }));

      // set error message
      useAccountStore.setState((state) => ({
        error: {
          title: "Error",
          message: Object.values(error.response.data)[0],
        },
      }));
    });
};

// create company bank details
export const createBankDetails = async (data) => {
  // reset the companyProfileLoader
  useAccountStore.setState((state) => ({
    companyBankDetailsLoader: !state.companyBankDetailsLoader,
  }));

  const { headers, accounts } = await handleRouteAuthorization();

  axios
    .post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/discos/?account=${accounts[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    )
    .then(function (response) {
      // route the user to the dashboard page
      window.location.href = "/";

      console.log(response, "this is the response");
    })
    .catch(function (error) {
      console.log(error, "error");
      // toggle the companyProfileLoader
      useAccountStore.setState((state) => ({
        companyProfileLoader: !state.companyProfileLoader,
      }));

      // set error message
      useAccountStore.setState((state) => ({
        error: {
          title: "Error",
          message: Object.values(error.response.data)[0],
        },
      }));
    });
};

// get the list of banks
export const getListOfBanks = async () => {
  const { headers, accounts } = await handleRouteAuthorization();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/payments/list_banks/?account=${accounts[0]["id"]}`,
    {
      headers: headers,
    }
  );
  console.log(response.data.data, "this is the response");
  return response.data.data;
};

// verify bank details
export const verifyBankDetails = async (data) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/discos/verify_bank_details/?account=${accounts[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    );
    console.log(response.data, "this is the response");
    return { msg: response.data.account_name, success: true };
  } catch (error) {
    console.error("error", "===>", error, "===", error?.response?.status);
    if (error.response.status === 400) {
      return {
        msg: "Please check your bank name and account number",
        success: false,
      };
    }
  }
};

// save bank account details
export const saveBankDetails = async (data) => {
  try {
    const { headers, accounts } = await handleRouteAuthorization();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/discos/save_bank_details/?account=${accounts[0]["id"]}`,
      data,
      {
        headers: headers,
      }
    );
    console.log(response.data, "this is the response");

    if (response.data.detail === "success") {
      return { msg: response.data, success: true };
    }
  } catch (error) {
    console.error("error", "===>", error, "===", error?.response?.status);
    return {
      msg: "Something went wrong, Please try again",
      success: false,
    };
    // if (error.response.status === 401) {
    // }
  }
};
