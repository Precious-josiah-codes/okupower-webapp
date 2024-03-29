"use client";

import BranchCard from "@/components/custom/BranchCard";
import DashboardLoader from "@/components/custom/DashboardLoader";
// import DashboardLoader from "@/components/custom/DashboardLoader";
import Metrics from "@/sections/Metrics";
import {
  getUserProfile,
  useAccountStore,
  validateSession,
} from "@/store/Account";
import {
  clearSearchSort,
  getBranches,
  searchBranches,
  sortBranches,
  useBranchStore,
} from "@/store/Branch";
import { getBranchesMetric, useMetricStore } from "@/store/Metric";
import { useUIStore } from "@/store/UI";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
import { Input } from "@/components/ui/input";
import {
  faChevronDown,
  faEllipsisV,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useEffect, useRef, useState } from "react";
import BranchForm from "@/components/custom/BranchForm";
import { Check, FilterX, Search, X } from "lucide-react";
import Loader from "@/components/custom/Loader";
import Image from "next/image";
import MetricLoaderSection from "@/sections/MetricLoaderSection";
import BranchLoader from "@/components/custom/lazy loaders/BranchLoader";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/framerVariants";
import Loader2 from "@/components/custom/Loader2";

const Branches = () => {
  const [profile] = useAccountStore((state) => [state.profile]);
  const [branchesMetric] = useMetricStore((state) => [state.branchesMetric]);
  const [branches, branchesCount] = useBranchStore((state) => [
    state.branches,
    state.branchesCount,
  ]);
  const [sortByTitle, setSortByTitle] = useState("-created_at");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);
  const [sortLoader, setSortLoader] = useState(false);
  const [branchLoader, setBranchLoader] = useState(true);
  // const [isFirstRender, setIsFirstRender] = useState(1);
  const isFirstRender = useRef(true);

  // validateSession();
  useEffect(() => {
    getUserProfile();
    getBranchesMetric();
    getBranches();
  }, []);

  useEffect(() => {
    // Check if it's not the first render
    if (isFirstRender.current === false) {
      // if the search term is cleared
      if (searchTerm.trim().length === 0) {
        clearSearchSort();
      }
    }
  }, [searchTerm]);

  return (
    <section className="relative">
      {/* start metric skeleton loader section */}
      {!branchesMetric && <MetricLoaderSection />}
      {/* end metric skeleton loader section */}

      {/* start metrics */}
      {branchesMetric && <Metrics metrics={branchesMetric} />}
      {/* end metrics */}

      {/* start branches header and body */}
      <section>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className={`my-6 flex justify-between items-center w-full ${
            !branches ? "invisible" : "visible"
          }`}
        >
          {/* left section */}
          {/* search input */}
          <div className="relative flex space-x-4">
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
              onClick={handleBranchSearch}
              className={`${
                searchLoader ? "pointer-events-none" : "pointer-events-auto"
              }`}
            >
              {searchLoader ? <Loader /> : <Search className="h-4 w-4 " />}
            </Button>
          </div>

          {/* right section */}
          <div className="flex  sm:space-x-2 space-x-2 text-sm">
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
                      {!sortLoader ? (
                        <FontAwesomeIcon icon={faChevronDown} />
                      ) : (
                        <Loader2 />
                      )}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    {/* clear filter */}
                    <DropdownMenuItem
                      onClick={() => handleClearSorting("-created_at")}
                    >
                      <span className="w-6">
                        <FilterX className="w-5 h-5" />
                      </span>
                      <span className="ml-3">Clear Filter</span>
                    </DropdownMenuItem>
                    {/* branches */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <span className="w-6">
                          {sortByTitle.includes("name") && (
                            <Check className="h-5 w-5" />
                          )}
                        </span>
                        <span className="ml-3"> Branch Name</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            onClick={() => handleSorting("name")}
                          >
                            <span className="w-6">
                              {sortByTitle === "name" && (
                                <Check className="h-5 w-5" />
                              )}
                            </span>
                            <span className="ml-3">(A-Z) Ascending</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSorting("-name")}
                          >
                            <span className="w-6">
                              {sortByTitle === "-name" && (
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
                          {sortByTitle.includes("created_at") && (
                            <Check className="h-5 w-5" />
                          )}
                        </span>
                        <span className="ml-3">Date Created</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            onClick={() => handleSorting("created_at")}
                          >
                            <span className="w-6">
                              {sortByTitle === "created_at" && (
                                <Check className="h-5 w-5" />
                              )}
                            </span>
                            <span className="ml-3">Ascending</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSorting("-created_at")}
                          >
                            <span className="w-6">
                              {sortByTitle === "-created_at" && (
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

            {/* total branches */}
            <div className="rounded-md  bg-black text-white sm:flex hidden items-center px-3">
              {branchesCount} branches
            </div>

            {/* more options for mobile */}
            <div className="sm:hidden flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[10rem]">
                  <DropdownMenuLabel>31 Branches</DropdownMenuLabel>
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
        </motion.div>

        {/* branches skeleton loder - cards */}
        {!branches && (
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
            <BranchLoader />
            <BranchLoader />
            <BranchLoader />
            <BranchLoader />
            <BranchLoader />
            <BranchLoader />
            <BranchLoader />
            <BranchLoader />
            <BranchLoader />
          </div>
        )}

        {/* branches body - cards */}
        {branches && (
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
            {branches?.map((branch, index) => (
              <div key={index}>
                <BranchCard branch={branch} />
              </div>
            ))}
          </div>
        )}
      </section>
      {/* end branches header and body */}

      {/* start create branches modal */}
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
        <DialogContent className="sm:max-w-[425px] w-[95%] h-[25rem] overflow-y-auto sidebar">
          <BranchForm formType="save" branch={null} />
        </DialogContent>
      </Dialog>
      {/* end create branches modal */}

      {/* start notfound branches */}
      {branches?.length === 0 && (
        <div className="w-full flex items-center justify-center">
          <div>
            <Image src={"notfound.svg"} width={450} height={450} />
            <h1 className="text-center">
              Oooppss there is no branch with the name{" "}
              <strong>
                <i>{searchTerm}</i>
              </strong>
            </h1>
          </div>
        </div>
      )}
      {/* end notfound branches */}
    </section>
  );

  // handle sorting for the branches
  async function handleSorting(sortBy) {
    // TODO: test the sort by created at to check if it working

    setSortByTitle(sortBy);
    // setBranchLoader(true);
    setSortLoader(true);
    console.log(sortBy, "srting by");
    const response = await sortBranches(sortBy);

    if (response.success) {
      // setBranchLoader(false);
      setSortLoader(false);
    } else {
      setSortLoader(false);
      // setBranchLoader(false);
    }
  }

  // handle clear sorting for the branches
  async function handleClearSorting(sortBy) {
    setSortByTitle(sortBy);
    clearSearchSort();
    console.log(sortBy, "srting by");
  }

  // handle searching the branches
  async function handleBranchSearch() {
    isFirstRender.current = false;
    setSearchLoader(true);
    setBranchLoader(true);
    console.log("searching for the term ", searchTerm);
    const response = await searchBranches(searchTerm);

    if (response.success) {
      setBranchLoader(false);
      setSearchLoader(false);
    }
    console.log(response, "this is the response");
  }
};

export default Branches;
