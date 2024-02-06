"use client";

import Alerts from "@/components/custom/Alerts";
import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resendToken, useAccountStore, validateToken } from "@/store/Account";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Otp = () => {
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef(Array(6).fill());

  const [authLoader, error] = useAccountStore((state) => [
    state.authLoader,
    state.error,
  ]);

  // get the user email from the query parameter
  const email = useSearchParams().get("email");

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
      <main className="sm:bg-[#0000000a] h-screen flex justify-center items-center space-y-6">
        <section className=" flex flex-col justify-center items-center sm:w-[40rem] h-[28rem] space-y-6">
          {/* text content */}
          <div className="space-y-3 text-center">
            <h1 className="text-xl font-semibold">Authenticate Your Account</h1>
            <p className="text-primaryColor ">
              Enter code sent to your email address
            </p>
          </div>

          {/* input fields */}
          <div className="flex w-full justify-between items-center sm:space-x-0 space-x-2">
            {inputRefs.map((ref, index) => (
              <Input
                type="text"
                className="sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] text-center bg-transparent rounded-md border border-green-800 font-semibold"
                ref={ref}
                maxLength="1"
                key={index}
                onChange={(e) => handleInputChange(e, index)}
              />
            ))}
          </div>

          {/* submit otp button */}
          <Button
            type="submit"
            onClick={handleSubmitOtp}
            className=" w-full bg-primaryColor hover:bg-primaryColor"
          >
            {authLoader ? <Loader /> : " Send Token"}
          </Button>

          {error.message.toLowerCase() === "invalid token" && (
            <p
              className="underline cursor-pointer text-black"
              onClick={() => resendToken({ email: email })}
            >
              Get another OTP
            </p>
          )}
        </section>
      </main>
      {isError && (
        <Alerts type="error" title={error.title} message={error.message} />
      )}
    </section>
  );

  // Function to handle input changes and navigate between fields
  function handleInputChange(e, index) {
    const value = e.target.value;
    // Focus on the next input field if there's a value
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  }

  // handle the submit of the otp token
  function handleSubmitOtp() {
    let otps = "";
    inputRefs.map((inputRef) => {
      if (inputRef.current.value.length) {
        console.log(typeof inputRef.current.value);
        otps += inputRef.current.value;
      }
    });

    if (otps.length === 6) {
      validateToken({ email: email, token: otps });
    }
  }
};

export default Otp;
