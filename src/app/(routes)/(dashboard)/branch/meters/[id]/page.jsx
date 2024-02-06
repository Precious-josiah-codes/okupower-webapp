"use client";

import MetricCard from "@/components/custom/MetricCard";
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
import { useParams, useRouter } from "next/navigation";
import DeviceTable from "@/components/custom/tables/MeterTable";
import { handleRouteAuthorization } from "@/lib/auth";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Metrics from "@/sections/Metrics";
import { Check, FilterX, Search, X } from "lucide-react";
import Loader from "@/components/custom/Loader";
import MeterTable from "@/components/custom/tables/MeterTable";
import BranchMeterTable from "@/components/custom/tables/BranchMeterTable";
import { toast } from "sonner";
import MetricLoaderSection from "@/sections/MetricLoaderSection";
import { motion } from "framer-motion";
import MetricLoader from "@/components/custom/lazy loaders/MetricLoader";
import { sectionVariants } from "@/lib/framerVariants";
import TableLoader from "@/components/custom/lazy loaders/TableLoader";

const BranchMeters = () => {
  const [meters, setMeters] = useState(null);
  const [defaultMeters, setDefaultMeters] = useState(null);
  const [metric, setMetric] = useState(null);
  const [branches, setBranches] = useState(null);
  const [activeBranch, setActiveBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("-created_at");
  const [filterBy, setFilterBy] = useState("");
  const [filterByKey, setFilterByKey] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [meterLoader, setMeterLoader] = useState(true);
  const isFirstRender = useRef(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    handleGetMeterMetric(params.id);

    handleGetBranches();
  }, []);

  // useEffect for search
  useEffect(() => {
    // Check if it's not the first render
    if (isFirstRender.current === false) {
      // if the search term is cleared
      if (searchTerm.trim().length === 0) {
        handleClearSearch();
      }
    }
  }, [searchTerm]);

  return (
    <section>
      {/* start metric skeleton loader section */}
      {!metric && <MetricLoaderSection />}
      {/* end metric skeleton loader section */}

      {/* metrics cards */}
      {metric && <Metrics metrics={metric} />}

      {/* meters section */}
      <section>
        {
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className={`my-9 sm:flex justify-between items-center ${
              !meters ? "invisible" : "visible"
            }`}
          >
            {/* left section */}
            <div className="flex items-center space-x-6">
              <h1 className="font-semibold">Meters</h1>

              {/* seach input */}
              <div className="relative sm:flex hidden space-x-4">
                <Input
                  type="text"
                  placeholder="Search"
                  className="rounded-md w-[15rem] pl-9 bg-nurseryColor border-black border-2 focus:border-none focus:ring-0 focus:outline-none"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />

                {/* search icon */}
                <div
                  className={`absolute inset-y-0 left-0  py-2 focus:outline-none inline-flex items-center`}
                >
                  {searchTerm.trim().length > 1 ? (
                    <X
                      className="h-4 w-4 text-[#a8a8a8] cursor-pointer"
                      onClick={() => setSearchTerm("")}
                    />
                  ) : (
                    <Search className="h-4 w-4 text-[#a8a8a8]" />
                  )}
                </div>

                {/* search button */}
                <Button
                  onClick={handleMeterSearch}
                  className={`${
                    searchLoader ? "pointer-events-none" : "pointer-events-auto"
                  }`}
                >
                  {searchLoader ? <Loader /> : <Search className="h-4 w-4 " />}
                </Button>
              </div>
            </div>

            {/* right section desktop */}
            <div className={`sm:flex hidden w-fit space-x-6 text-sm `}>
              {/* sort by */}
              <div className="sm:block hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-sm bg-transparent border-2 border-black px-2 space-x-2 w-[6rem] focus-visible:outline-none"
                    >
                      <h1>Sort By</h1>
                      <span
                        className={`text-sm text-black group-hover:text-black`}
                      >
                        <FontAwesomeIcon icon={faChevronDown} />
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      {/* clear sorting */}
                      <DropdownMenuItem
                        onClick={() => handleClearSorting("-created_at")}
                      >
                        <span className="w-6">
                          <FilterX className="w-5 h-5" />
                        </span>
                        <span className="ml-3">Clear Sorting</span>
                      </DropdownMenuItem>

                      {/* user name */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <span className="w-6">
                            {sortBy.includes("name") && (
                              <Check className="h-5 w-5" />
                            )}
                          </span>
                          <span className="ml-3"> User Name</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() =>
                                handleSorting("name", "user__name")
                              }
                            >
                              <span className="w-6">
                                {sortBy === "name" && (
                                  <Check className="h-5 w-5" />
                                )}
                              </span>
                              <span className="ml-3">(A-Z) Ascending</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleSorting("-name", "-user__name")
                              }
                            >
                              <span className="w-6">
                                {sortBy === "-name" && (
                                  <Check className="h-5 w-5" />
                                )}
                              </span>
                              <span className="ml-3">(Z-A) Descending</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>

                      {/* created at */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <span className="w-6">
                            {sortBy.includes("created_at") && (
                              <Check className="h-5 w-5" />
                            )}
                          </span>
                          <span className="ml-3">Date Created</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() =>
                                handleSorting("created_at", "created_at")
                              }
                            >
                              <span className="w-6">
                                {sortBy === "created_at" && (
                                  <Check className="h-5 w-5" />
                                )}
                              </span>
                              <span className="ml-3">Ascending</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleSorting("-created_at", "-created_at")
                              }
                            >
                              <span className="w-6">
                                {sortBy === "-created_at" && (
                                  <Check className="h-5 w-5" />
                                )}
                              </span>
                              <span className="ml-3">Descending</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* filter by */}
              <div className="sm:block hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-sm bg-transparent border-2 border-black px-2 space-x-2 w-[6rem] focus-visible:outline-none"
                    >
                      <h1>Filter By</h1>
                      <span
                        className={`text-sm text-black group-hover:text-black`}
                      >
                        <FontAwesomeIcon icon={faFilter} />
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      {/* clear filter */}
                      <DropdownMenuItem onClick={handleClearFiltering}>
                        <span className="w-6">
                          <FilterX className="w-5 h-5" />
                        </span>
                        <span className="ml-3">Clear Filter</span>
                      </DropdownMenuItem>

                      {/* status */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <span className="w-6">
                            {filterByKey === "status" && (
                              <Check className="h-5 w-5" />
                            )}
                          </span>
                          <span className="ml-3">Status</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {/* assigned */}
                            <DropdownMenuItem
                              onClick={() =>
                                handleFiltering("status", "ASSIGNED")
                              }
                            >
                              <span className="w-6">
                                {filterBy === "ASSIGNED" && (
                                  <Check className="h-5 w-5" />
                                )}
                              </span>
                              <span className="ml-3">Assigned</span>
                            </DropdownMenuItem>
                            {/* breached */}
                            <DropdownMenuItem
                              onClick={() =>
                                handleFiltering("status", "BREACHED")
                              }
                            >
                              <span className="w-6">
                                {filterBy === "BREACHED" && (
                                  <Check className="h-5 w-5" />
                                )}
                              </span>
                              <span className="ml-3">Breached</span>
                            </DropdownMenuItem>
                            {/* connected */}
                            <DropdownMenuItem
                              onClick={() =>
                                handleFiltering("status", "CONNECTED")
                              }
                            >
                              <span className="w-6">
                                {filterBy === "CONNECTED" && (
                                  <Check className="h-5 w-5" />
                                )}
                              </span>
                              <span className="ml-3">Connected</span>
                            </DropdownMenuItem>
                            {/* inventory */}
                            <DropdownMenuItem
                              onClick={() =>
                                handleFiltering("status", "DEFAULT")
                              }
                            >
                              <span className="w-6">
                                {filterBy === "DEFAULT" && (
                                  <Check className="h-5 w-5" />
                                )}
                              </span>
                              <span className="ml-3">Inventory</span>
                            </DropdownMenuItem>
                            {/* disconnected */}
                            <DropdownMenuItem
                              onClick={() =>
                                handleFiltering("status", "DISCONNECTED")
                              }
                            >
                              <span className="w-6">
                                {filterBy === "DISCONNECTED" && (
                                  <Check className="h-5 w-5" />
                                )}
                              </span>
                              <span className="ml-3">Disconnected</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>

                      {/* meter type */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <span className="w-6">
                            {filterByKey === "type" && (
                              <Check className="h-5 w-5" />
                            )}
                          </span>
                          <span className="ml-3">Meter Type</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() =>
                                handleFiltering("type", "ONE_PHASE")
                              }
                            >
                              <span className="w-6">
                                {filterBy === "ONE_PHASE" && (
                                  <Check className="h-5 w-5" />
                                )}
                              </span>
                              <span className="ml-3">One Phase</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleFiltering("type", "THREE_PHASE")
                              }
                            >
                              <span className="w-6">
                                {filterBy === "THREE_PHASE" && (
                                  <Check className="h-5 w-5" />
                                )}
                              </span>
                              <span className="ml-3">Three Phase</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                        <DropdownMenuSubTrigger>
                          Filter By
                        </DropdownMenuSubTrigger>
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
          </motion.div>
        }

        {/* branch meter table skeleton loader */}
        {meterLoader && <TableLoader />}

        {/* meter table */}
        {!meterLoader && (
          <BranchMeterTable
            meters={meters}
            loader={loader}
            handleDeleteMeter={handleDeleteMeter}
            branches={branches}
            activeBranch={activeBranch}
            handleMovingMeterFromBranchFn={handleMoveMeterFromBranch}
          />
        )}
      </section>

      {/* start create meter modal */}
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
      {/* end create meter modal */}
    </section>
  );

  // function handleDeviceDetails() {
  //   router.push("/device_details");
  // }

  // handle get meters
  async function handleGetBranchMeters(id) {
    console.log(id, "this is the id");
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/branches/${id}/devices/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
        }
      );

      console.log(data, status, "the devices");
      if (status === 200) {
        console.log(data, "the meters");
        setMeters(data.results);
        setDefaultMeters(data.results);
        setMeterLoader(false);
        //  return { msg: data.results, success: true };
      }
    } catch (error) {
      console.log(error, "this is the error");
      //  return { msg: "error.response.data.detail", success: false };
    }
  }

  // handle get branches
  async function handleGetBranches() {
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/branches/list_branches/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
        }
      );

      console.log(data, status, "the bravh");
      if (status === 200) {
        console.log(data, "the branches");
        setBranches(data);
        setActiveBranch(data.find((branch) => branch.id === params.id));

        // get the branches data
        handleGetBranchMeters(params.id);

        //  return { msg: data.results, success: true };
      }
    } catch (error) {
      console.log(error, "this is the error");
      //  return { msg: "error.response.data.detail", success: false };
    }
  }

  // handle get meter device metrics
  async function handleGetMeterMetric(id) {
    const { headers, accounts } = await handleRouteAuthorization();

    try {
      // making the request
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/branches/${id}/overview/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        console.log(response, "resp");
        setMetric({
          totalDevices: response.data.total_devices,
          devicePercentageIncrease: response.data.device_percentage_increase,
          totalFaults: response.data.total_faults,
          faultPercentageIncrease: response.data.fault_percentage_increase,
          totalActiveDevices: response.data.total_active_devices,
          activeDevicesPercentageIncrease:
            response.data.active_devices_percentage_increase,
          totalConsumption: response.data.total_consumption,
          consumptionPercentageIncrease:
            response.data.consumption_percentage_increase,
          deviceArrowDirection: response.data.device_arrow_direction,
          faultArrowDirection: response.data.fault_arrow_direction,
          activeDeviceArrowDirection:
            response.data.active_devices_arrow_direction,
          consumptionArrowDirection: response.data.consumption_arrow_direction,
        });
      }
    } catch (error) {
      console.error(error, "error");
    }
  }

  // handle meter search
  async function handleMeterSearch() {
    isFirstRender.current = false;
    setSearchLoader(true);
    setMeterLoader(true);
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/manage/devices/?account=${accounts[0]["id"]}&search=${searchTerm}`,
        {
          headers: headers,
        }
      );
      console.log(data, "this is the response");

      if (status === 200) {
        setSearchLoader(false);
        setMeters(data.results);
        setMeterLoader(false);
      }
    } catch (error) {
      setSearchLoader(false);
      setMeterLoader(false);
      console.error("error: ", error);
      return { msg: error.response.data.detail, success: false };
    }
  }

  // handle clear search
  async function handleClearSearch() {
    setMeters(defaultMeters);
  }

  // handle sorting
  async function handleSorting(sortName, sortBy) {
    setSortBy(sortName);
    setMeterLoader(true);
    console.log(sortBy, "sortby");
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/manage/devices/?account=${accounts[0]["id"]}&ordering=${sortBy}`,
        {
          headers: headers,
        }
      );

      if (status === 200) {
        console.log(data.results, "the devices");
        setMeters(data.results);
        setMeterLoader(false);
      }
    } catch (error) {
      console.log(error, "this is the error");
      return { msg: "error.response.data.detail", success: false };
    }
  }

  // handle filtering
  async function handleFiltering(filterByKey, filterByValue) {
    setFilterBy(filterByValue);
    setFilterByKey(filterByKey);
    setMeterLoader(true);
    console.log(sortBy, "sortby");
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/manage/devices/?account=${accounts[0]["id"]}&${filterByKey}=${filterByValue}`,
        {
          headers: headers,
        }
      );

      if (status === 200) {
        console.log(data.results, "the devices");
        setMeters(data.results);
        setMeterLoader(false);
      }
    } catch (error) {
      console.log(error, "this is the error");
      return { msg: "error.response.data.detail", success: false };
    }
  }

  // handle clear sorting for the bands
  function handleClearFiltering() {
    setFilterBy("");
    setMeters(defaultMeters);
  }
  // handle clear sorting for the bands
  function handleClearSorting(sortBy) {
    setSortBy(sortBy);
    setBandDevices(defaultBandDevices);
  }

  // handle deleting a meter
  async function handleDeleteMeter(meterIdsToDelete) {
    // check if loader is true. default to false else true
    if (loader) setLoader(false);
    setLoader(true);

    // get the meter ids
    const meterIds = meterIdsToDelete.map((meter) => meter.id);
    console.log(params.id, meterIds, "delete these motherfuckers");

    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/branches/${params.id}/devices/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
          data: {
            devices: meterIds,
          },
        }
      );

      if (status === 200) {
        console.log(data, "the devices");
        setLoader(false);
        toast.success(
          "Meter has been successfully removed from this branch and moved to the default branch"
        );
      }
    } catch (error) {
      setLoader(false);
      const deviceAlreadyDeleted =
        error.response.data.detail.includes("does not belong to");

      if (deviceAlreadyDeleted) {
        console.log({ msg: "Device has already been deleted", success: false });
      }
      console.log({ msg: error.response.data.detail, success: false });
    }
  }

  // handle moving meter from branch
  async function handleMoveMeterFromBranch(selectedMeters, moveBranch) {
    // check if loader is true. default to false else true
    if (loader) setLoader(false);
    setLoader(true);

    // get the device ids
    const meterIds = selectedMeters.map((selectedMeter) => selectedMeter.id);
    console.log(meterIds, "meterIds");

    const data = {
      devices: meterIds,
      to_branch: moveBranch.id,
    };

    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { status } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/branches/${params.id}/devices/?account=${accounts[0]["id"]}`,
        data,
        {
          headers: headers,
        }
      );

      console.log(status);

      if (status === 202) {
        toast.success(
          `Meter has been successfully moved to ${moveBranch.name}`
        );
        console.log({ msg: "Successfully created", success: true });
        setLoader(false);
      }
    } catch (error) {
      console.log(error, "this is the error");
      console.log({ msg: error.response.data.detail, success: false });
      setLoader(false);
    }

    console.log(data, "move band device data");
  }
  console.log("janky janky", selectedMeters, branchId);
};

export default BranchMeters;
