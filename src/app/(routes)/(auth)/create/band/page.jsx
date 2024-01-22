"use client";

import { setCookie } from "@/app/serverActions/cookieActions";
import Alerts from "@/components/custom/Alerts";
import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBand, useBandStore } from "@/store/Band";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CompanyBand = () => {
  const [bandLoader, setBandLoader] = useState(false);
  const [isError, setIsError] = useState(null);

  const [bandName, setBandName] = useState("");
  const [tariff, setTariff] = useState("");

  const router = useRouter();

  return (
    <div>
      <main className="bg-[#0000000a] h-screen flex flex-col justify-center items-center space-y-6 sm:px-0 px-3 ">
        <h1 className="text-xl font-semibold mt-[6rem]">
          Create your first band
        </h1>

        {/* start form */}
        <section className="sm:w-[30rem] w-full bg-white p-6 rounded-2xl">
          <form className=" space-y-6" onSubmit={(e) => handleCompanyBand(e)}>
            {/* band name */}
            <div className=" w-full space-y-3">
              <Label htmlFor="branchName">Band Name</Label>
              <Input
                id="bandName"
                type="text"
                value={bandName}
                onChange={(e) => setBandName(e.target.value)}
                required
              />
            </div>

            {/* tariff */}
            <div className=" w-full space-y-3">
              <Label htmlFor="tariff">Tariff</Label>
              <Input
                id="tariff"
                type="text"
                value={tariff}
                onChange={(e) => setTariff(e.target.value)}
              />
            </div>

            {/* sign up button */}
            <Button
              type="submit"
              className={`w-full bg-primaryColor hover:bg-primaryColor ${
                bandLoader ? "pointer-events-none" : "pointer-events-auto"
              }`}
            >
              {bandLoader ? <Loader /> : " Create Band"}
            </Button>
          </form>
        </section>
        <div className="pb-[1rem]" />
        {/* end form */}
      </main>

      {isError && (
        <Alerts
          type="error"
          title={isError?.title}
          message={isError?.message}
        />
      )}
    </div>
  );

  // handle the passing of data to the create company profile function
  async function handleCompanyBand(e) {
    e.preventDefault();
    setBandLoader(true);
    if (isError) setIsError(null);

    // instantiating a new form instance
    const formData = new FormData();

    // appending the key value pair of the data
    formData.append("name", bandName);
    formData.append("tariff", tariff);

    // create company band function
    const response = await createBand(formData);

    console.log(response, "the response");

    if (response.success) {
      const [companyProfile, hasBankDetails, hasBranch, hasBand] =
        await Promise.all([
          await setCookie("companyProfile", true),
          await setCookie("hasBankDetails", true),
          await setCookie("hasBranch", true),
          await setCookie("hasBand", true),
        ]);

      // Check if all requests were successful
      const allRequestsSuccessful = [
        companyProfile,
        hasBankDetails,
        hasBranch,
        hasBand,
      ].every((result) => result.success === true);

      // stop loader and route, if all request successfull
      if (allRequestsSuccessful) {
        console.log("all cokkies set");

        // push route to dashboard
        window.location.href = "/";
      } else {
        // all request wasnt successfull
        setBandLoader(false);

        // set the error message
        setIsError({
          title: "Error",
          message: "Ooopppss something went wrong, please try again",
        });
      }
    } else {
      setBandLoader(false);
      setIsError({
        title: "Error",
        message: response.msg,
      });
    }
  }
};

export default CompanyBand;
