"use client";

import Alerts from "@/components/custom/Alerts";
import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBranch } from "@/store/Branch";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CompanyBranch = () => {
  const [branchLoader, setBranchLoader] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(null);

  const router = useRouter();

  return (
    <div>
      <main className="bg-[#0000000a] h-auto flex flex-col justify-center items-center space-y-6 sm:px-0 px-3 ">
        <h1 className="text-xl font-semibold mt-[6rem]">
          Create your first branch
        </h1>

        {/* start form */}
        <section className="sm:w-[30rem] w-full bg-white p-6 rounded-2xl">
          <form className=" space-y-6" onSubmit={(e) => handleCompanyBranch(e)}>
            {/* branch name */}
            <div className=" w-full space-y-3">
              <Label htmlFor="branchName">Branch Name</Label>
              <Input
                id="branchName"
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                required
              />
            </div>

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
              />
            </div>

            {/* Email */}
            <div className=" w-full space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* sign up button */}
            <Button
              type="submit"
              className={`w-full bg-primaryColor hover:bg-primaryColor ${
                branchLoader ? "pointer-events-none" : "pointer-events-auto"
              }`}
            >
              {branchLoader ? <Loader /> : " Save"}
            </Button>
          </form>
        </section>
        <div className="pb-[1rem]" />
        {/* end form */}
      </main>

      {/* error alert */}
      {isError && (
        <Alerts
          type="error"
          title={isError?.title}
          message={isError?.message}
        />
      )}
    </div>
  );

  // handle the passing of data to the create company branch function
  async function handleCompanyBranch(e) {
    e.preventDefault();
    setBranchLoader(true);
    if (isError) setIsError(null);

    // instantiating a new form instance
    const formData = new FormData();

    // appending the key value pair of the data
    formData.append("name", branchName);
    formData.append("address", address);
    formData.append("phone_no", phoneNumber);
    formData.append("email", email);

    // create company branch function
    const response = await createBranch(formData);
    console.log("this is it response man", response);

    // response was successfull, go to dashboard
    if (response.success) {
      console.log("this is it man");
      window.location.href = "/";

      // raise error
    } else {
      setBranchLoader(false);
      setIsError({
        title: "Error",
        message: response.msg,
      });
    }
  }
};

export default CompanyBranch;
