"use client";

import Alerts from "@/components/custom/Alerts";
import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCompanyProfile, useAccountStore } from "@/store/Account";
import { useState } from "react";

const CompanyProfile = () => {
  const [companyProfileLoader, error] = useAccountStore((state) => [
    state.companyProfileLoader,
    state.error,
  ]);

  const [isError, setIsError] = useState(false);

  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cacRegistrationNo, setCacRegistrationNo] = useState("");
  const [cacRegistrationDoc, setCacRegistrationDoc] = useState("");
  const [logo, setLogo] = useState("");

  // handle cac doc upload
  async function handleCacDocUpload(event) {
    const file = await event.target.files[0];

    if (file) {
      setCacRegistrationDoc(file);
    }
  }

  // handle company logo
  async function handleCompanyLogo(event) {
    const file = await event.target.files[0];

    if (file) {
      setLogo(file);
    }
  }

  return (
    <div>
      <main className="bg-[#0000000a] h-auto flex flex-col justify-center items-center space-y-6 sm:px-0 px-3 ">
        <h1 className="text-xl font-semibold mt-[6rem]">
          Create your okupower account
        </h1>

        {/* start form */}
        <section className="sm:w-[30rem] w-full bg-white p-6 rounded-2xl">
          <form
            className=" space-y-6"
            onSubmit={(e) => handleCompanyProfile(e)}
          >
            {/* address */}
            <div className=" w-full space-y-3">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* phone number */}
            <div className=" w-full space-y-3">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {/* CAC Registration NO */}
            <div className=" w-full space-y-3">
              <Label htmlFor="cac_registration">CAC Registration NO</Label>
              <Input
                id="cac_registration"
                type="text"
                value={cacRegistrationNo}
                onChange={(e) => setCacRegistrationNo(e.target.value)}
                required
              />
            </div>

            {/* CAC Registration DOC */}
            <div className=" w-full space-y-3">
              <Label htmlFor="cac_registration_doc">CAC Registration DOC</Label>
              <Input id="cac_doc" type="file" onChange={handleCacDocUpload} />
            </div>

            {/* Logo */}
            <div className=" w-full space-y-3">
              <Label htmlFor="logo">Logo</Label>
              <Input id="logo" type="file" onChange={handleCompanyLogo} />
            </div>

            {/* sign up button */}
            <Button
              type="submit"
              className="w-full bg-primaryColor hover:bg-primaryColor"
            >
              {companyProfileLoader ? <Loader /> : " Save"}
            </Button>
          </form>
        </section>
        <div className="pb-[1rem]" />
        {/* end form */}
      </main>
      {isError && (
        <Alerts type="error" title={error.title} message={error.message} />
      )}
    </div>
  );

  // handle the passing of data to the create company profile function
  function handleCompanyProfile(e) {
    e.preventDefault();

    if (isError) setIsError(false);

    // instantiating a new form instance
    const formData = new FormData();

    // appending the key value pair of the data
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);

    formData.append("cacRegistrationNo", cacRegistrationNo);
    formData.append("cacRegistrationDoc", cacRegistrationDoc);
    formData.append("logo", logo);

    // create companyu profile function
    createCompanyProfile(formData);
  }
};

export default CompanyProfile;
