"use client";

import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  getListOfBanks,
  saveBankDetails,
  verifyBankDetails,
} from "@/store/Account";
import { useEffect, useState } from "react";
import Alerts from "@/components/custom/Alerts";
import { useRouter } from "next/navigation";

const CompanyProfile = () => {
  // states
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankList, setBankList] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [bankLoader, setBankLoader] = useState(false);
  const [bankVerified, setBankVerified] = useState(false);
  const [bankVerifiedName, setBankVerifiedName] = useState("");
  const [error, setError] = useState(null);

  // router
  const router = useRouter();

  // useEffect hook
  useEffect(() => {
    // handle get list of banks
    async function handleGetListOfBanks() {
      const response = await getListOfBanks();
      setBankList(response);
    }

    // getting the list of banks
    handleGetListOfBanks();
  }, []);

  // loader to display until the list of banks is gotten
  if (!bankList) {
    return "loading...";
  }

  return (
    <div>
      <main className="bg-[#0000000a] h-auto flex flex-col justify-center items-center space-y-6 sm:px-0 px-3 ">
        <h1 className="text-xl font-semibold mt-[6rem]">
          Create your Bank Details
        </h1>

        {/* start form */}
        <section className="sm:w-[30rem] w-full bg-white p-6 rounded-2xl">
          <div className=" space-y-6">
            {/* Bank Name */}
            <div className=" w-full space-y-3">
              <Label htmlFor="bank_account_number">Pick your bank</Label>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {value
                      ? bankList.find(
                          (bank) =>
                            bank.name.toLowerCase() === value.toLowerCase()
                        )?.name
                      : "Select bank..."}
                    {console.log(value.length, "the value")}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[100%] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search bank..."
                      className="h-9"
                    />
                    <CommandEmpty>No bank found.</CommandEmpty>

                    <CommandGroup className={cn("h-[18rem] overflow-auto")}>
                      {bankList.map((bank) => (
                        <CommandItem
                          key={bank.id}
                          value={bank.name}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setBankDetails(bank);

                            setOpen(false);
                          }}
                        >
                          {bank.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Bank Account Number */}
            <div className=" w-full space-y-3">
              <Label htmlFor="bank_account_number">Bank Account Number</Label>
              <Input
                id="bank_account_number"
                type="text"
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                required
              />
            </div>

            {/* verified account name */}
            {bankVerifiedName.length !== 0 && (
              <h1 className="text-green-700">{bankVerifiedName}</h1>
            )}

            {/* verify bank details button */}
            {!bankVerified && (
              <Button
                type="submit"
                className={`w-full bg-primaryColor hover:bg-primaryColor ${
                  bankAccountNumber.length < 9 || !bankDetails || bankLoader
                    ? "pointer-events-none"
                    : "pointer-events-auto"
                }`}
                onClick={handleBankVerification}
              >
                {bankLoader ? <Loader /> : " Verify Bank Details"}
              </Button>
            )}

            {/* save bank details */}
            {bankVerified && (
              <Button
                type="submit"
                className={`w-full bg-primaryColor hover:bg-primaryColor ${
                  bankAccountNumber.length < 9 || !bankDetails
                    ? "pointer-events-none"
                    : "pointer-events-auto"
                }`}
                onClick={handleSaveBankDetails}
              >
                {bankLoader ? <Loader /> : " Save Bank Details"}
              </Button>
            )}
          </div>
        </section>
        <div className="pb-[1rem]" />
        {/* end form */}
      </main>
      {error && (
        <Alerts type="error" title={error.title} message={error.message} />
      )}
    </div>
  );

  // handle the verification of the bank details
  async function handleBankVerification() {
    setBankLoader(true);
    setBankVerifiedName("");
    setError(null);

    // instantiating a new form instance
    const formData = new FormData();

    // appending the key value pair of the data
    formData.append("bank_code", bankDetails.code);
    formData.append("bank_account_no", bankAccountNumber);

    // making the response to verify bank details
    const response = await verifyBankDetails(formData);

    // response was successfull
    if (response.success) {
      setBankLoader(false);
      setBankVerifiedName(response.msg);
      setBankVerified(true);

      // response wasnt successfull
    } else {
      setBankLoader(false);
      setError({
        title: "Error",
        message: response.msg,
      });
    }
  }

  // handle saving the bank details
  async function handleSaveBankDetails() {
    setBankLoader(true);
    setError(null);

    // instantiating a new form instance
    const formData = new FormData();

    // appending the key value pair of the data
    formData.append("account_name", bankVerifiedName);
    formData.append("bank_code", bankDetails.code);
    formData.append("bank_account_no", bankAccountNumber);

    // making the request to save the bank details
    const response = await saveBankDetails(formData);

    // if response is successfull route the user to the dashboard
    if (response.success) {
      router.push("/");

      // response wasnt successfull
    } else {
      setBankLoader(false);
      setError({
        title: "Error",
        message: response.msg,
      });
    }
  }
};

export default CompanyProfile;
