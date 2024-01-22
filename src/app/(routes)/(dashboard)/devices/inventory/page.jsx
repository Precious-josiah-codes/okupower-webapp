"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { popoverDropdownStyle, popoverStyle } from "@/lib/styles";
import {
  faChevronDown,
  faEllipsisV,
  faFilter,
  faMagnifyingGlass,
  faPlus,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import DeviceTable from "@/components/custom/tables/DeviceTable";
import { handleRouteAuthorization } from "@/lib/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import InventoryTable from "@/components/custom/tables/InventoryTable";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import Loader from "@/components/custom/Loader";
import { toast } from "sonner";

// const branches = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ];

const Devices = () => {
  const [inventories, setInventories] = useState(null);
  const [bands, setBands] = useState(null);
  const [branches, setBranches] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSelectedBand, setOpenSelectedBand] = useState(false);
  const [value, setValue] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBand, setSelectedBand] = useState(null);
  const [address, setAddress] = useState("");
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleAllRequest();
  }, []);

  return (
    <section>
      {/* devices section */}
      <section>
        <div className="my-9 sm:flex justify-between items-center">
          {/* left section */}
          <div className="flex items-center space-x-6">
            <h1 className="font-semibold">Inventories</h1>
          </div>

          {/* right section desktop */}
          <div className="sm:flex hidden w-fit space-x-6 text-sm">
            {/* assign device to branch and band */}
            <Dialog className="bg-black/80">
              <DialogTrigger
                asChild
                className={`${
                  selectedDevices.length === 0
                    ? "pointer-events-none"
                    : "pointer-events-auto"
                }`}
              >
                <Button
                  variant="outline"
                  className="text-sm bg-transparent border-2 border-black px-2 space-x-2 w-[7rem]"
                >
                  <h1>Assign To</h1>
                  <span className={`text-sm text-black group-hover:text-black`}>
                    <FontAwesomeIcon icon={faFilter} />
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] h-[20rem] overflow-y-auto sidebar">
                <div className="grid gap-4 py-4 text-sm">
                  {/* Pick branch */}
                  <div>
                    <h1 className="mb-3">Select branch</h1>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {selectedBranch
                            ? branches?.find(
                                (branch) =>
                                  branch.name.toLowerCase() ===
                                  selectedBranch.name.toLowerCase()
                              )?.name
                            : "Select branch..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command className="w-[23rem]">
                          <CommandInput placeholder="Search branches..." />
                          <CommandEmpty>No branches found.</CommandEmpty>
                          <CommandGroup className="w-[23rem]">
                            {branches?.map((branch, index) => (
                              <CommandItem
                                className="w-full"
                                key={index}
                                value={branch}
                                onSelect={(currentValue) => {
                                  console.log(branch, "hello");
                                  console.log(currentValue, "hellos");
                                  setSelectedBranch(
                                    currentValue === selectedBranch?.name
                                      ? ""
                                      : branch
                                  );
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedBranch?.name.toLowerCase() ===
                                      branch.name.toLowerCase()
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {branch.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Pick band */}
                  <div>
                    <h1 className="mb-3">Select band</h1>
                    <Popover
                      open={openSelectedBand}
                      onOpenChange={setOpenSelectedBand}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openSelectedBand}
                          className="w-full justify-between"
                        >
                          {selectedBand
                            ? bands?.find(
                                (band) =>
                                  band.name.toLowerCase() ===
                                  selectedBand.name.toLowerCase()
                              )?.name
                            : "Select band..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command className="w-[23rem]">
                          <CommandInput placeholder="Search band..." />
                          <CommandEmpty>No band found.</CommandEmpty>
                          <CommandGroup className="w-[23rem]">
                            {bands?.map((band) => (
                              <CommandItem
                                className="w-full"
                                key={band.name}
                                value={band}
                                onSelect={(currentValue) => {
                                  setSelectedBand(
                                    currentValue.toLowerCase() ===
                                      selectedBand?.name?.toLowerCase()
                                      ? ""
                                      : band
                                  );
                                  setOpenSelectedBand(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedBand?.name?.toLowerCase() ===
                                      band.name.toLowerCase()
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {band.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* address */}
                  <div>
                    <h1 className="mb-3">Enter meter address</h1>
                    <Input
                      type="text"
                      placeholder="Enter Meter Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className={`w-full bg-primaryColor ${
                      loader ? "pointer-events-none" : "pointer-events-auto"
                    }`}
                    onClick={handleAssignDevice}
                  >
                    {loader ? <Loader /> : "Assign Device"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* filter by */}
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-sm bg-transparent border-2 border-black px-2 space-x-2 w-[7rem]"
                  >
                    <h1>Filter By</h1>
                    <span
                      className={`text-sm text-black group-hover:text-black`}
                    >
                      <FontAwesomeIcon icon={faFilter} />
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={popoverStyle}>
                  <h1 className={popoverDropdownStyle}>Resolved</h1>
                  <h1 className={popoverDropdownStyle}>Unresolved</h1>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* right section mobile: more options */}
          <div className="sm:hidden flex justify-between space-x-3 mt-3 sm:mt-0">
            {/* seach input */}
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search"
                className="rounded-md w-full pl-9 bg-nurseryColor border-black border-2 focus:border-none focus:ring-0 focus:outline-none"
              />

              {/* search icon */}
              <div className="absolute inset-y-0 left-0 px-3 py-2 focus:outline-none">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-[#a8a8a8]"
                />
              </div>
            </div>

            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>More Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Filter by, Sort by */}
                  <DropdownMenuGroup>
                    {/* Filter by */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Filter By</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Resolved</DropdownMenuItem>
                          <DropdownMenuItem>Unresolved</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>

                    {/* Sort by */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Sort By</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Resolved</DropdownMenuItem>
                          <DropdownMenuItem>Unresolved</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* device table */}
        <InventoryTable
          inventories={inventories}
          handleSelectedDeviceFn={handleSelectedDevice}
        />
      </section>

      {/* start create devices modal */}
      <Dialog className="bg-black/80">
        <DialogTrigger asChild>
          <div className="fixed bottom-10 right-6 cursor-pointer">
            <span className="relative flex h-[3.5rem] w-[3.5rem] ">
              <span className="animate-ping absolute inline-flex   h-full w-full rounded-full bg-primaryColor opacity-75"></span>
              <span className="relative inline-flex rounded-full h-[3.5rem] w-[3.5rem] bg-primaryColor items-center justify-center text-white">
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-[25rem] overflow-y-auto sidebar">
          <div className="grid gap-4 py-4">
            {/* ID Number */}
            <div>
              <Label htmlFor="IdNumber">ID Number</Label>
              <Input
                id="IdNumber"
                defaultValue="#56783638929"
                className="mt-3"
              />
            </div>

            {/* Phase */}
            <div>
              <Label htmlFor="Phase">Phase</Label>
              <Input id="Phase" defaultValue="40kwh" className="mt-3" />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="Email">Email</Label>
              <Input id="Email" defaultValue="N2000" className="mt-3" />
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="Name">Name</Label>
              <Input id="Name" defaultValue="N2000" className="mt-3" />
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="Phone Number">Phone Number</Label>
              <Input id="Phone Number" defaultValue="N2000" className="mt-3" />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="Address">Address</Label>
              <Input id="Address" defaultValue="N2000" className="mt-3" />
            </div>

            {/* Band */}
            <div>
              <Label htmlFor="Band">
                Band <span className="text-gray-600">(Optional)</span>
              </Label>
              <Input id="Band" defaultValue="N2000" className="mt-3" />
            </div>

            {/* Branch */}
            <div>
              <Label htmlFor="Branch">
                Branch <span className="text-gray-600">(Optional)</span>
              </Label>
              <Input id="Branch" defaultValue="N2000" className="mt-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-primaryColor">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* end create devices modal */}
    </section>
  );

  function handleDeviceDetails() {
    router.push("/device_details");
  }

  async function handleAllRequest() {
    const [bandsMetric, branches, inventories] = await Promise.all([
      getBandMetrics(),
      getBranches(),
      handleGetInventories(),
    ]);

    // Check if all requests were successful
    const allRequestsSuccessful = [bandsMetric, branches, inventories].every(
      (result) => result === true
    );

    if (allRequestsSuccessful) {
      console.log("am done");
    }
  }

  // handle get inventories
  async function handleGetInventories() {
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/manage/devices/inventory/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
        }
      );

      // console.log(data, status, "the devices");
      if (status === 200) {
        setInventories(data.results);
        console.log(data, "got inventories");
        //  return { msg: data.results, success: true };
      }
    } catch (error) {
      console.log(error, "this is the error");
      //  return { msg: "error.response.data.detail", success: false };
    }
  }

  // get the branches
  async function getBranches() {
    const { headers, accounts } = await handleRouteAuthorization();
    try {
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/branches/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
        }
      );

      if (status === 200) {
        setBranches(data.results);
        console.log("got branches", data.results);
      }
    } catch (error) {
      console.error(error, "error");
    }
  }

  // get band metric
  async function getBandMetrics() {
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
        }
      );

      if (status === 200) {
        setBands(data.results);
        console.log(data.results, "get bands");
        return { msg: data.results, success: true };
      }
    } catch (error) {
      console.log(error, "this is the error");
      return { msg: "error.response.data.detail", success: false };
    }
  }

  // handle selected devices
  function handleSelectedDevice(device) {
    console.log(selectedDevices, "the devices");
    // check if device exist in array
    const deviceSelected = selectedDevices.find(
      (selectedDevice) => selectedDevice === device.id
    );

    // if device exist, remove it
    if (deviceSelected) {
      const filterDevice = selectedDevices.filter(
        (selectedDevice) => selectedDevice !== device.id
      );
      setSelectedDevices(filterDevice);
    } else {
      // else add the new device
      const newSelectedDevice = [device.id, ...selectedDevices];
      setSelectedDevices(newSelectedDevice);
    }
  }

  // handle assisgn device to a branch and band
  async function handleAssignDevice() {
    setLoader(true);
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      const body = {
        to_band: selectedBand.id,
        devices: selectedDevices,
        to_branch: selectedBranch.id,
        address: address,
      };

      console.log(body, "this is the bodu");

      // make request
      const { data, status } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/manage/devices/assign/?account=${accounts[0]["id"]}`,
        body,
        {
          headers: headers,
        }
      );

      console.log(data, status, "the response");

      if (status === 202) {
        setLoader(false);
        toast.success("Devices has been successfully assigned");
        console.log(data.results, "get bands");
      }
    } catch (error) {
      setLoader(false);

      toast.error(error.msg);
      console.log(error, "this is the error");
    }
  }
};

export default Devices;
