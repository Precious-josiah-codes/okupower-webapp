"use client";

import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CompanyProfile = () => {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [cacRegistrationNo, setCacRegistrationNo] = useState("");
  const [cacRegistrationDoc, setCacRegistrationDoc] = useState("");
  const [logo, setLogo] = useState("");

  return (
    <section className="sm:w-[30rem] w-full bg-white p-6 rounded-2xl ">
      <h1 className="text-xl font-semibold mt-[6rem]">
        Create your okupower account
      </h1>
      <form className=" space-y-6" onSubmit={() => console.log(address)}>
        {/* company name */}
        <div className=" w-full space-y-3">
          <Label htmlFor="company_name">Company Name</Label>
          <Input id="company_name" type="text" required />
          {address}
        </div>

        {/* address */}
        <div className=" w-full space-y-3">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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

        {/* Bank Name */}
        <div className=" w-full space-y-3">
          <Label htmlFor="bank_name">Bank Name</Label>
          <Input
            id="bank_name"
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </div>

        {/* Bank Account Number */}
        <div className=" w-full space-y-3">
          <Label htmlFor="bank_account_number">Bank Account Number</Label>
          <Input id="bank_account_number" type="text" />
        </div>

        {/* CAC Registration NO */}
        <div className=" w-full space-y-3">
          <Label htmlFor="cac_registration">CAC Registration NO</Label>
          <Input id="cac_registration" type="text" />
        </div>

        {/* CAC Registration DOC */}
        <div className=" w-full space-y-3">
          <Label htmlFor="cac_registration_doc">CAC Registration DOC</Label>
          <Input id="cac_registration_doc" type="text" />
        </div>

        {/* Logo */}
        <div className=" w-full space-y-3">
          <Label htmlFor="logo">Logo</Label>
          <Input id="logo" type="text" />
        </div>

        {/* sign up button */}
        <Button
          type="submit"
          className="w-full bg-primaryColor hover:bg-primaryColor"
        >
          Save
          {/* {authLoader ? <Loader /> : " Sign Up"} */}
        </Button>
      </form>
    </section>
  );
};

export default CompanyProfile;
