"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Link from "next/link";
import { login, useAccountStore } from "@/store/Account";
import Alerts from "@/components/custom/Alerts";
import Loader from "@/components/custom/Loader";
import { setCookie } from "@/app/serverActions/cookieActions";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email().min(14),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const Login = () => {
  // state
  const [showPassword, setShowPassword] = useState(false);
  const [authLoader, setAuthLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  // const [authLoader, error] = useAccountStore((state) => [
  //   state.authLoader,
  //   state.error,
  // ]);

  // Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // handling the display of the alert
  useEffect(() => {
    if (error) {
      setIsError(true);
      const timeout = setTimeout(() => {
        // Hide the alert after 3 seconds
        setIsError(false);
      }, 8000);

      return () => {
        // Clear the timeout when the component unmounts
        clearTimeout(timeout);
      };
    }
  }, [error]);

  return (
    <section className="relative">
      <main className="bg-[#0000000a] h-screen flex flex-col justify-center items-center space-y-6 sm:px-0 px-3">
        <h1 className="text-xl font-semibold">
          Sign into your okupower account
        </h1>

        {/* start form */}
        <section className="sm:w-[30rem] w-full bg-white p-6 rounded-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className="space-y-8">
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="•••••••••"
                          {...field}
                        />

                        {/* toggle input type */}
                        <div className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none">
                          {showPassword ? (
                            <svg
                              onClick={() => setShowPassword(!showPassword)}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 cursor-pointer"
                            >
                              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                              <path
                                fillRule="evenodd"
                                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              onClick={() => setShowPassword(!showPassword)}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 cursor-pointer"
                            >
                              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sign in button */}
              <Button
                type="submit"
                className="w-full bg-primaryColor hover:bg-primaryColor"
              >
                {authLoader ? <Loader /> : " Sign In"}
              </Button>
            </form>
          </Form>

          {/* already have an accoount */}
          <p className="text-center text-sm mt-4">
            Don"t have an account?{" "}
            <Link href="/signup">
              <span className="text-primaryColor font-semibold">Sign Up</span>
            </Link>
          </p>
        </section>
        {/* end form */}
      </main>
      {isError && (
        <Alerts type="error" title={error.title} message={error.message} />
      )}
    </section>
  );

  // login the user account
  async function login(data) {
    try {
      // if there was an initial error, set isError to false
      if (isError) setIsError(false);

      // toggle the auth loader
      setAuthLoader(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_JWT_BASE_URL}/create/`,
        { account_type: "DISCO", ...data }
      );

      if (response.status === 200 && response.data.registration_complete) {
        console.log(response, "the response");

        // save token data to localstorage
        // TODO: NOTE if am not using this localstorage thing anywhere in my codebase, remove it
        localStorage.setItem("token", JSON.stringify(response.data));

        // set the user data to cookie
        const [token, companyProfile, hasBankDetails, hasBranch, hasBand] =
          await Promise.all([
            await setCookie("token", JSON.stringify(response.data)),
            await setCookie("companyProfile", true),
            await setCookie("hasBankDetails", true),
            await setCookie("hasBranch", true),
            await setCookie("hasBand", true),
          ]);

        // Check if all requests were successful
        const allRequestsSuccessful = [
          token,
          companyProfile,
          hasBankDetails,
          hasBranch,
          hasBand,
        ].every((result) => result.success === true);

        // stop loader and route, if all request successfull
        if (allRequestsSuccessful) {
          console.log("all cokkies set, registration complete");
          // toggle the auth loader
          setAuthLoader(false);
          // push route to dashboard
          window.location.href = "/";
        } else {
          // all request wasnt successfull
          setAuthLoader(false);

          // set the error message
          setError({
            title: "Error",
            message: "Ooopppss something went wrong, please try again",
          });

          // toggle the error modal
          setIsError(true);
        }
      } else {
        console.log("something happended", response);
        const token = await setCookie("token", JSON.stringify(response.data));

        // if token has been sucessfully set, route to dashboard
        if (token.success) {
          console.log("registration has not been completed");
          window.location.href = "/";
        } else {
          // token wasnt successfully set
          setAuthLoader(false);

          // set the error message
          setError({
            title: "Error",
            message: "Ooopppss something went wrong, please try again",
          });

          // toggle the error modal
          setIsError(true);
        }
      }
    } catch (error) {
      // toggle the auth loader
      setAuthLoader(false);

      // set the error message
      setError({
        title: "Error",
        message: error.response.data.detail,
      });

      // toggle the error modal
      setIsError(true);
      console.error(error, "an error happened");
    }
  }
};

export default Login;
