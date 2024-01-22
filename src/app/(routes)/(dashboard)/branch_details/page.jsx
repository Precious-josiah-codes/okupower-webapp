"use client";

import ConfirmDelete from "@/components/custom/ConfirmDelete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { popoverDropdownStyle, popoverStyle } from "@/lib/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import MetricCard from "@/components/custom/MetricCard";
import BranchTable from "@/components/custom/tables/BandTable";
import Metrics from "@/sections/Metrics";

const {
  faRotate,
  faBolt,
  faMagnifyingGlass,
  faChevronDown,
  faFilter,
  faChartSimple,
  faCloudArrowDown,
  faLocationDot,
  faTrash,
  faList,
  faEllipsisV,
} = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

const BranchDetails = () => {
  return (
    <section>
      {/* metrics cards */}
      <Metrics metrics={[]} />

      {/* branch header */}
      <section className="my-9">
        {/* header */}
        <div className=" flex justify-between items-center">
          {/* left section */}
          <div className="sm:space-x-6 w-full flex items-center sm:justify-start justify-between">
            <h1 className="font-semibold">Ibeto</h1>

            <div className="flex items-center space-x-4">
              {/* search input */}
              <div className="relative">
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

              {/* more options */}
              <div className="sm:hidden flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>More Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* chart, Map, Table, Download Report */}
                    <DropdownMenuGroup>
                      {/* chart */}
                      <DropdownMenuItem onClick={() => setDisplay("chart")}>
                        Chart
                        <DropdownMenuShortcut>
                          <FontAwesomeIcon icon={faChartSimple} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      {/* Map */}
                      <DropdownMenuItem onClick={() => setDisplay("map")}>
                        Map
                        <DropdownMenuShortcut>
                          <FontAwesomeIcon icon={faLocationDot} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      {/* Table */}
                      <DropdownMenuItem onClick={() => setDisplay("table")}>
                        Table
                        <DropdownMenuShortcut>
                          <FontAwesomeIcon icon={faList} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      {/* Download Report */}
                      <DropdownMenuItem>
                        Download Report
                        <DropdownMenuShortcut>
                          <FontAwesomeIcon icon={faCloudArrowDown} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

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
          </div>

          {/* right section */}
          <div className="sm:flex hidden w-fit space-x-6 text-sm ">
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
                  <h1 className={popoverDropdownStyle}>Alphabetically</h1>
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

            {/* download */}
            <div className="rounded-md border-2 border-black  flex items-center px-3 cursor-pointer">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <FontAwesomeIcon icon={faCloudArrowDown} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download Report</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </section>

      {/* branch displays */}
      <section>
        <BranchTable />
      </section>
    </section>
  );
};

export default BranchDetails;
