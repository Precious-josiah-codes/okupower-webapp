import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Loader from "./Loader";
import { toast } from "sonner";
import { createBranch, editBranch } from "@/store/Branch";

const BranchForm = ({ formType, branch }) => {
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [branchLoader, setBranchLoader] = useState(false);

  console.log(branch, "the branch");
  useEffect(() => {
    if (formType === "edit") {
      console.log(branch, "the bran", branch.phone_no);
      setBranchName(branch.name);
      setAddress(branch.address);
      setPhoneNumber(branch.phone_no);
      setEmail(branch.email);
    }
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold text-center py-2">
        {formType === "save" ? "Create Branch" : "Edit Branch"}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (formType === "save") {
            handleCreateBranch();
          } else {
            handleEditBranch();
          }
        }}
      >
        <div className="grid gap-4 py-4">
          {/* Branch name */}
          <div>
            <Label htmlFor="name">Branch Name</Label>
            <Input
              id="name"
              className="mt-3"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              required
            />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="Address">Address</Label>
            <Input
              id="Address"
              className="mt-3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="Phone Number">Phone Number</Label>
            <Input
              id="Phone Number"
              className="mt-3"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="Email">Email</Label>
            <Input
              id="Email"
              className="mt-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* create branch button */}
        {formType === "save" && (
          <Button
            type="submit"
            className={`w-full relative flex items-center bg-primaryColor ${
              branchLoader ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            {branchLoader ? <Loader /> : " Create Branch"}
          </Button>
        )}

        {/* edit branch button */}
        {formType === "edit" && (
          <Button
            type="submit"
            className={`w-full relative flex items-center bg-primaryColor ${
              branchLoader ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            {branchLoader ? <Loader /> : " Edit Branch"}
          </Button>
        )}
      </form>
    </div>
  );

  async function handleCreateBranch() {
    console.log(branchName, address, phoneNumber, email, "create branch");
    setBranchLoader(true);
    if (status) setIsError(null);

    // instantiating a new form instance
    const formData = new FormData();

    // appending the key value pair of the data
    formData.append("name", branchName);
    formData.append("address", address);
    formData.append("phone_no", phoneNumber);
    formData.append("email", email);

    // create company branch function
    const response = await createBranch(formData);

    // response was successfull
    if (response.success) {
      setBranchName("");
      setAddress("");
      setPhoneNumber("");
      setEmail("");

      toast.success("Branch has been successfully created");
      setBranchLoader(false);

      // raise error
    } else {
      setBranchLoader(false);

      toast.error(response.msg);
    }
  }

  async function handleEditBranch(e) {
    setBranchLoader(true);

    // instantiating a new form instance
    const formData = new FormData();

    // appending the key value pair of the data
    formData.append("name", branchName);
    formData.append("address", address);
    formData.append("phone_no", phoneNumber);
    formData.append("email", email);

    console.log(branch.id, "the id");
    // create company branch function
    const response = await editBranch(formData, branch.id);

    // response was successfull
    if (response.success) {
      setBranchName("");
      setAddress("");
      setPhoneNumber("");
      setEmail("");

      toast.success("Branch has been successfully updated");
      setBranchLoader(false);

      // raise error
    } else {
      setBranchLoader(false);
      toast.error(response.msg);
    }
    console.log(branchName, address, phoneNumber, email, "edit branch");
  }
};

export default BranchForm;
