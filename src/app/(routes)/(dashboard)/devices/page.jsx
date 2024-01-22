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
import DeviceTable from "@/components/custom/tables/DeviceTable";
import { handleRouteAuthorization } from "@/lib/auth";
import { useEffect, useState } from "react";
import axios from "axios";

const Devices = () => {
  const [devices, setDevices] = useState(null);
  const router = useRouter();

  useEffect(() => {
    handleGetInventories();
  }, []);

  return (
    <section>
      {/* metrics cards */}
      <section className="flex justify-between space-x-3 mt-6 w-[100%] overflow-x-auto">
        {/* Total users */}
        <MetricCard
          icon={<FontAwesomeIcon icon={faUserGroup} className="text-black" />}
          iconBg="bg-[#0F732B78]"
          title="Total Users"
          value={150}
          statistics={100}
          statisticsBg="bg-[#FBB62D52]"
          width="sm:flex-1 sm:min-w-0 min-w-[70%]"
        />

        {/* Bypassers */}
        <MetricCard
          icon={<FontAwesomeIcon icon={faUserGroup} className="text-black" />}
          iconBg="bg-[#f37fe4c2]"
          title="By Passers"
          value={2000}
          statistics={100}
          statisticsBg="bg-[#CDFDC966]"
          width="sm:flex-1 sm:min-w-0 min-w-[70%]"
        />

        {/* Active Users */}
        <MetricCard
          icon={<FontAwesomeIcon icon={faUserGroup} className="text-black" />}
          iconBg="bg-[#fbb62da6]"
          title="Active Users"
          value={2000}
          statistics={100}
          statisticsBg="bg-[#CDFDC966]"
          width="sm:flex-1 sm:min-w-0 min-w-[70%]"
        />

        {/* Electricity Consumed */}
        <MetricCard
          icon={<FontAwesomeIcon icon={faUserGroup} className="text-black" />}
          iconBg="bg-[#FBB62D52]"
          title="Electricity Consumed"
          value={2000}
          statistics={100}
          statisticsBg="bg-[#CDFDC966]"
          width="sm:min-w-0 min-w-[70%] sm:w-[18rem] 2xl:w-[30rem]"
        />
      </section>

      {/* devices section */}
      <section>
        <div className="my-9 sm:flex justify-between items-center">
          {/* left section */}
          <div className="flex items-center space-x-6">
            <h1 className="font-semibold">Devices</h1>

            {/* seach input */}
            <div className="relative sm:flex hidden">
              <Input
                type="text"
                placeholder="Search"
                className="rounded-md w-[15rem] pl-9 bg-nurseryColor border-black border-2 focus:border-none focus:ring-0 focus:outline-none"
              />

              {/* search icon */}
              <div className="absolute inset-y-0 left-0 px-3 py-2 focus:outline-none">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-[#a8a8a8]"
                />
              </div>
            </div>
          </div>

          {/* right section desktop */}
          <div className="sm:flex hidden w-fit space-x-6 text-sm">
            {/* sort by */}
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-sm bg-transparent border-2 border-black px-2 space-x-2 w-[6rem]"
                  >
                    <h1>Sort By</h1>
                    <span
                      className={`text-sm text-black group-hover:text-black`}
                    >
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={popoverStyle}>
                  <h1 className={popoverDropdownStyle}>Type</h1>
                  <h1 className={popoverDropdownStyle}>Status</h1>
                  <h1 className={popoverDropdownStyle}>Date</h1>
                  <h1 className={popoverDropdownStyle}>Branch</h1>
                </PopoverContent>
              </Popover>
            </div>

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
        <DeviceTable
          handleDeviceDetails={handleDeviceDetails}
          devices={devices}
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

  // handle get inventories
  async function handleGetInventories() {
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
        setDevices(data.results);
        //  return { msg: data.results, success: true };
      }
    } catch (error) {
      console.log(error, "this is the error");
      //  return { msg: "error.response.data.detail", success: false };
    }
  }
};

export default Devices;
