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
import { useRouter } from "next/navigation";
import DeviceTable from "@/components/custom/tables/MeterTable";
import { handleRouteAuthorization } from "@/lib/auth";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Metrics from "@/sections/Metrics";
import { Check, FilterX, Search, X } from "lucide-react";
import Loader from "@/components/custom/Loader";
import MeterTable from "@/components/custom/tables/MeterTable";
import MetricLoaderSection from "@/sections/MetricLoaderSection";
import TableLoader from "@/components/custom/lazy loaders/TableLoader";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/framerVariants";
import Image from "next/image";

const Devices = () => {
  const [meters, setMeters] = useState(null);
  const [defaultMeters, setDefaultMeters] = useState(null);
  const [metric, setMetric] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("-created_at");
  const [filterBy, setFilterBy] = useState("");
  const [filterByKey, setFilterByKey] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [meterLoader, setMeterLoader] = useState(true);
  const [notFoundLoader, setNotFoundLoader] = useState(false);
  const [notFoundStatus, setNotFoundStatus] = useState("");

  const isFirstRender = useRef(true);
  const router = useRouter();

  useEffect(() => {
    handleGetMeters();
    handleGetMeterMetric();
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
      {/* metric skeleton loader */}
      {!metric && <MetricLoaderSection />}

      {/* metrics cards */}
      {metric && <Metrics metrics={metric} />}

      {/* meters section */}
      <section>
        {/* header */}
        <div
          className={`my-9 sm:flex justify-between items-center ${
            meters ? "visible" : "invisible"
          }`}
        >
          {/* left section */}
          <div>

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
          <div className="sm:flex hidden w-fit space-x-6 text-sm">
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
                            onClick={() => handleSorting("name", "user__name")}
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
                            onClick={() => handleFiltering("status", "DEFAULT")}
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
                            onClick={() => handleFiltering("type", "ONE_PHASE")}
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

        {/* meter skeleton loader */}
        {meterLoader && <TableLoader />}

        {/* not found meters */}
        {notFoundLoader && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center w-full relative"
          >
            <div className="relative h-[18rem] w-[18rem] text-xs rounded-lg overflow-hidden">
              <Image
                src="/notfound.png"
                alt="not found image"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
                priority
              />
            </div>
            <h1 className="absolute bottom-6">{notFoundStatus}</h1>
          </motion.div>
        )}

        {/* meter table */}
        {!meterLoader && meters?.length > 0 && (
          <MeterTable
            meters={meters}
            loader={loader}
            handleDeleteMeter={handleDeleteMeter}
            handleDeleteAllMeter={handleDeleteAllMeter}
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
  async function handleGetMeters() {
    if (!meterLoader) setMeterLoader(true);
    try {
      const { headers, accounts } = await handleRouteAuthorization();
      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/manage/devices/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
        }
      );

      // console.log(data, status, "the devices");
      if (status === 200) {
        console.log(data, "the devices");
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

  // handle get meter device metrics
  async function handleGetMeterMetric() {
    const { headers, accounts } = await handleRouteAuthorization();

    try {
      // making the request
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/discos/overview/?account=${accounts[0]["id"]}`,
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
        });
      }
    } catch (error) {
      console.error(error, "error");
    }
  }

  // handle meter search
  async function handleMeterSearch() {
    if (!meterLoader) setMeterLoader(true);
    if (notFoundLoader) setNotFoundLoader(false);
    isFirstRender.current = false;
    setSearchLoader(true);

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
        console.log(data.results, "the available meter");

        if (data.results.length === 0) {
          setNotFoundLoader(true);
          setNotFoundStatus(`ooppss couldn't find the meter your looking for`);
        }
      }
    } catch (error) {
      setSearchLoader(false);
      console.error("error: ", error);
      return { msg: error.response.data.detail, success: false };
    }
  }

  // handle clear search
  async function handleClearSearch() {
    setMeters(defaultMeters);
    setNotFoundLoader(false);
  }

  // handle sorting
  async function handleSorting(sortName, sortBy) {
    if (!meterLoader) setMeterLoader(true);
    setSortBy(sortName);
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
    if (!meterLoader) setMeterLoader(true);
    setFilterBy(filterByValue);
    setFilterByKey(filterByKey);
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
    }
  }

  // handle clear sorting for the meters
  function handleClearFiltering() {
    setFilterBy("");
    setMeters(defaultMeters);
  }

  // handle clear sorting for the meters
  function handleClearSorting(sortBy) {
    setSortBy(sortBy);
    setBandDevices(defaultBandDevices);
  }

  // handle deleting meters
  async function handleDeleteMeter(meter) {
    console.log("delete meter", meter);
    // check if loader is true. default to false else true
    if (loader) setLoader(false);
    setLoader(true);

    // get the meter ids
    const meterIds = meters.map((meter) => meter.id);

    try {
      const { headers, accounts } = await handleRouteAuthorization();
      console.log(headers);

      // make request
      const { data, status } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bands/${bandId}/devices/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
          data: {
            devices: deviceIds,
          },
        }
      );

      if (status === 200) {
        console.log(data, "the devices");
        return { msg: data.results, success: true };
      }
    } catch (error) {
      const deviceAlreadyDeleted =
        error.response.data.detail.includes("does not belong to");

      if (deviceAlreadyDeleted) {
        return { msg: "Device has already been deleted", success: false };
      }
      return { msg: error.response.data.detail, success: false };
    }
  }

  // handle deleting all meters
  async function handleDeleteAllMeter(meter) {
    console.log("delete all meter", meter);
  }
};

export default Devices;
