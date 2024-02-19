"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faEllipsisV,
  faEllipsisVertical,
  faFilter,
  faMagnifyingGlass,
  faPlus,
  faSearch,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
import ConfirmDelete from "@/components/custom/ConfirmDelete";
import BandCategoryBody from "@/components/custom/BandCategoryBody";
import BandCard from "@/components/custom/BandCard";

import BandTable from "@/components/custom/tables/BandTable";
import {
  Activity,
  AlertTriangle,
  Check,
  FilterX,
  Gift,
  Search,
  X,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GiveBonusModal from "@/components/custom/GiveBonusModal";
import {
  createBand,
  deleteAllBandDevices,
  deleteBandDevices,
  getBandDevices,
  getBandMetrics,
  moveDeviceToBand,
  searchBandDevices,
  sortBandDevices,
} from "@/store/Band";
import { useEffect, useRef, useState } from "react";
import Loader from "@/components/custom/Loader";
import { toast } from "sonner";
import BandLoader from "@/components/custom/lazy loaders/BandLoader";
import TableLoader from "@/components/custom/lazy loaders/TableLoader";
import Image from "next/image";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/framerVariants";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const bands = [
  {
    band: "a",
    username: "Jay Elect",
    meter_no: "#01654789",
    address: "Lorem ipsum dolor sit.",
    phone_no: "08173556677",
  },
  {
    band: "b",
    username: "Jay Elect",
    meter_no: "#01654789",
    address: "Lorem ipsum dolor sit.",
    phone_no: "08173556677",
  },
  {
    band: "c",
    username: "Jay Elect",
    meter_no: "#01654789",
    address: "Lorem ipsum dolor sit.",
    phone_no: "08173556677",
  },
  {
    band: "d",
    username: "Jay Elect",
    meter_no: "#01654789",
    address: "Lorem ipsum dolor sit.",
    phone_no: "08173556677",
  },
  {
    band: "d",
    username: "Jay Elect",
    meter_no: "#01654789",
    address: "Lorem ipsum dolor sit.",
    phone_no: "08173556677",
  },
  {
    band: "d",
    username: "Jay Elect",
    meter_no: "#01654789",
    address: "Lorem ipsum dolor sit.",
    phone_no: "08173556677",
  },
];

function Bands() {
  const [bandMetric, setBandMetric] = useState(null);
  const [defaultBandDevices, setDefaultBandDevices] = useState(null);
  const [bandDevices, setBandDevices] = useState(null);
  const [bandName, setBandName] = useState("");
  const [tariff, setTariff] = useState("");
  const [bandLoader, setBandLoader] = useState(false);
  const [activeBand, setActiveBand] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);
  const [sortBy, setSortBy] = useState("-created_at");
  const isFirstRender = useRef(true);
  const [loader, setLoader] = useState(false);
  const [bandMeterLoader, setBandMeterLoader] = useState(true);
  const [notFoundLoader, setNotFoundLoader] = useState(false);
  const [notFoundStatus, setNotFoundStatus] = useState("");

  useEffect(() => {
    console.log("i ran");
    if (!bandMetric) {
      handleGetBandMetric();
    }
  }, []);

  useEffect(() => {
    console.log("1");
    // Check if it's not the first render
    if (isFirstRender.current === false) {
      console.log("2");
      // if the search term is cleared
      if (searchTerm.trim().length === 0) {
        console.log("3");
        // restore the default device
        clearSearch();
      }
    }
  }, [searchTerm]);

  return (
    <section className="relative text-sm">
      {/* band metric skeleton loader */}
      {!bandMetric && (
        <div className="grid grid-cols-3 gap-x-5 mt-6">
          <BandLoader />
          <BandLoader />
          <BandLoader />
        </div>
      )}

      {/* start metrics */}
      {bandMetric && (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mt-6"
        >
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {bandMetric?.map((metric, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <BandCard
                    metric={metric}
                    handleBandFilter={handleBandFilter}
                    activeBand={activeBand}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious className="-left-4 top-[10rem] bg-[#0f732b21]" />
          <CarouselNext className="-right-4 top-[10rem] bg-[#0f732b21]" /> */}
          </Carousel>
        </motion.div>
      )}
      {/* end metrics */}

      {/* band header */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className={`py-9 space-y-5 ${bandDevices ? "visible" : "invisible"}`}
      >
        <div>
          <h1 className="font-semibold text-lg">Band {activeBand?.name}</h1>
          <h1>See all available devices In each Band {activeBand?.name}</h1>
        </div>
        <div className={"sm:flex justify-between items-center"}>
          {/* left section ->  search input  */}
          <div
            className={`relative flex space-x-4 ${
              activeBand?.total_devices === 0
                ? "pointer-events-none"
                : "pointer-events-auto"
            }`}
          >
            <Input
              type="text"
              placeholder="Search"
              className={`rounded-md w-[15rem] pl-9 bg-nurseryColor border-black border-2 focus:ring-0  focus-visible:ring-0 focus-visible:ring-offset-0 `}
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
              onClick={handleSearchDevice}
              className={`${
                searchLoader || activeBand?.total_devices === 0
                  ? "pointer-events-none"
                  : "pointer-events-auto"
              }`}
            >
              {searchLoader ? <Loader /> : <Search className="h-4 w-4 " />}
            </Button>
          </div>

          {/* right section -> faults, consumption, give bonus, sortby */}
          <div className="flex sm:w-fit items-center w-full mt-4 sm:mt-0 space-x-6  text-sm ">
            {/* total faults */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex space-x-4">
                    <AlertTriangle />
                    <h1>{activeBand?.total_faults}</h1>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total Faults</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* total consumption */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex space-x-4">
                    <Activity />
                    <h1>{activeBand?.total_consumption}</h1>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total Consumption</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* give bonus to all bands */}
            <div
              className={`cursor-pointer ${
                activeBand?.total_devices === 0
                  ? "pointer-events-none"
                  : "pointer-events-auto"
              }`}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <GiveBonusModal
                      content={
                        <div className="animate-bounce delay-500">
                          <Gift />
                        </div>
                      }
                      bonusType="bands"
                      devices={null}
                      bands={bandMetric}
                      activeBand={null}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Give bonus to all bands</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* sort by */}
            <div
              className={`sm:block hidden ${
                activeBand?.total_devices === 0
                  ? "pointer-events-none"
                  : "pointer-events-auto"
              }`}
            >
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
                      <span className="ml-3">Clear Filter</span>
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
                              handleSorting(
                                activeBand?.id,
                                "name",
                                "user__name"
                              )
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
                              handleSorting(
                                activeBand?.id,
                                "-name",
                                "-user__name"
                              )
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

                    {/* address */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <span className="w-6">
                          {sortBy.includes("address") && (
                            <Check className="h-5 w-5" />
                          )}
                        </span>
                        <span className="ml-3"> User Address</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            onClick={() =>
                              handleSorting(
                                activeBand?.id,
                                "address",
                                "user__address"
                              )
                            }
                          >
                            <span className="w-6">
                              {sortBy === "address" && (
                                <Check className="h-5 w-5" />
                              )}
                            </span>
                            <span className="ml-3">(A-Z) Ascending</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleSorting(
                                activeBand?.id,
                                "-address",
                                "-user__address"
                              )
                            }
                          >
                            <span className="w-6">
                              {sortBy === "-address" && (
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
                              handleSorting(
                                activeBand?.id,
                                "created_at",
                                "created_at"
                              )
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
                              handleSorting(
                                activeBand?.id,
                                "-created_at",
                                "-created_at"
                              )
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

            {/* more options */}
            <div className="sm:hidden flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="sm:w-56 w-[10rem]">
                  <DropdownMenuLabel>More Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Filter by, Sort by, select band */}
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

                    {/* Select band */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        Select Band
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Band A</DropdownMenuItem>
                          <DropdownMenuItem>Band B</DropdownMenuItem>
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
      </motion.div>

      {/* band table skeleton loader */}
      {bandMeterLoader && (
        <div>
          <TableLoader />
        </div>
      )}

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

      {/* band tables */}
      {!bandMeterLoader && bandDevices?.length > 0 && (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <BandTable
            bandDevices={bandDevices}
            bandMetric={bandMetric}
            loader={loader}
            handleDeleteDevice={handleDeleteDevice}
            handleDeleteAllDevice={handleDeleteAllDevice}
            activeBand={activeBand}
            handleMovingDeviceFromBand={handleMovingDeviceFromBand}
          />
        </motion.div>
      )}

      {/* start create band modal */}
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
        <DialogContent className="sm:max-w-[425px] max-w-[90%] p-6">
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
        </DialogContent>
      </Dialog>
      {/* end create band modal */}
    </section>
  );

  // handle getting the band metric
  async function handleGetBandMetric() {
    const { msg, success } = await getBandMetrics();

    if (success) {
      handleGetBandDevices(msg[0]["id"], msg[0]["name"]);
      setBandMetric(msg);
      setActiveBand(msg[0]);
      const bandName = msg.map((band) => band.name);
      console.log(activeBand, msg[0], "all the bands");
    }
  }

  // handle getting the band devices
  async function handleGetBandDevices(id, bandName) {
    console.log(activeBand, "all the bands000");
    if (!bandMeterLoader) setBandMeterLoader(true);
    if (notFoundLoader) setNotFoundLoader(false);

    const { msg, success } = await getBandDevices(id);

    if (success) {
      setBandMeterLoader(false);
      if (msg.length === 0) {
        setNotFoundLoader(true);
        setNotFoundStatus(`There are no meters in  band ${bandName}`);
      }
      setBandDevices(msg);
      console.log(activeBand, "the meters check");
      setDefaultBandDevices(msg);
    }

    console.log("response");
  }

  // handle creating a band
  async function handleCompanyBand(e) {
    e.preventDefault();
    setBandLoader(true);
    // TODO: handle error whilst createing the band
    // if (isError) setIsError(null);

    // instantiating a new form instance
    const formData = new FormData();

    // appending the key value pair of the data
    formData.append("name", bandName);
    formData.append("tariff", tariff);

    // create company band function
    const response = await createBand(formData);

    console.log(response, "the response");

    if (response.success) {
      setBandLoader(false);
      toast.success("Band has been successfully created");
    } else {
      setBandLoader(false);
    }
  }

  // handle band filter
  function handleBandFilter(metric, bandName) {
    setActiveBand(metric);
    handleGetBandDevices(metric.id, bandName);
    console.log(metric, "the m  etric");
  }

  // handle search device in a band
  async function handleSearchDevice() {
    isFirstRender.current = false;
    if (!bandMeterLoader) setBandMeterLoader(true);
    if (notFoundLoader) setNotFoundLoader(false);

    setSearchLoader(true);

    // make request to search
    const { msg, success } = await searchBandDevices(activeBand.id, searchTerm);

    // if search was successfull
    if (success) {
      setBandDevices(msg);
      setSearchLoader(false);
      setBandMeterLoader(false);
      if (msg.length === 0) {
        setNotFoundLoader(true);
        setNotFoundStatus(`ooppss couldn't find the meter your looking for`);
      }
    }
  }

  // clear the search
  function clearSearch() {
    // restore the default devices
    setBandDevices(defaultBandDevices);
    setNotFoundLoader(false);
  }

  // handle sorting
  async function handleSorting(bandId, sortName, sortBy) {
    setSortBy(sortName);
    if (!bandMeterLoader) setBandMeterLoader(true);

    const { msg, success } = await sortBandDevices(bandId, sortBy);

    if (success) {
      setBandDevices(msg);
      setBandMeterLoader(false);
    } else {
    }
  }

  // handle clear sorting for the bands
  async function handleClearSorting(sortBy) {
    setSortBy(sortBy);
    setBandDevices(defaultBandDevices);
  }

  // handle deleting device
  async function handleDeleteDevice(devices) {
    // check if loader is true. default to false else true
    if (loader) setLoader(false);
    setLoader(true);

    // get the device ids
    const deviceIds = devices.map((device) => device.id);
    console.log(deviceIds, "deviceIds");

    // delete band devices
    const { msg, success } = await deleteBandDevices(activeBand?.id, deviceIds);

    if (success) {
      toast.success("Device has been successfully deleted.");
      setLoader(false);
      console.log(msg);
    } else {
      setLoader(false);
      toast.error(msg);
    }
  }

  // handle deleting all device
  async function handleDeleteAllDevice() {
    // check if loader is true. default to false else true
    if (loader) setLoader(false);
    setLoader(true);

    // delete band devices
    const { msg, success } = await deleteAllBandDevices(activeBand?.id);

    if (success) {
      toast.success(
        `Devices has been successfully deleted from ${activeBand?.name}`
      );
      setLoader(false);
      console.log(msg);
    } else {
      setLoader(false);
      toast.error(msg);
    }
  }

  // handle moving device
  async function handleMovingDeviceFromBand(devices, toBandId) {
    console.log(devices, toBandId, "boy");
    // check if loader is true. default to false else true
    if (loader) setLoader(false);
    setLoader(true);

    // get the device ids
    const deviceIds = devices.map((device) => device.id);
    console.log(deviceIds, "deviceIds");

    const data = {
      devices: deviceIds,
      to_band: toBandId,
    };

    console.log(data, "move band device data");
    // delete band devices
    const { msg, success } = await moveDeviceToBand(activeBand?.id, data);
    console.log(msg, success, "buddy");
    if (success) {
      toast.success("Device has been successfully deleted.");
      setLoader(false);
      console.log(msg);
    } else {
      setLoader(false);
      toast.error(msg);
    }
  }
}

export default Bands;
