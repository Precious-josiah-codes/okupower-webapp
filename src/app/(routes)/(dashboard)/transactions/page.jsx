"use client";

import TransactionTable from "@/components/custom/tables/TransactionTable";
import { Button } from "@/components/ui/button";
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
import { faChevronDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Check, FilterX, Search, X } from "lucide-react";
import Loader from "@/components/custom/Loader";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { handleRouteAuthorization } from "@/lib/auth";
import axios from "axios";

const Transaction = () => {
  const [defaultTransactions, setDefaultTransactions] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);
  const [sortBy, setSortBy] = useState("-created_at");
  const isFirstRender = useRef(true);

  useEffect(() => {
    handleGetTransaction();
  }, []);

  // handle the clear search term
  useEffect(() => {
    // Check if it's not the first render
    if (isFirstRender.current === false) {
      // if the search term is cleared
      if (searchTerm.trim().length === 0) {
        console.log("3");
        // restore the default device
        clearSearch();
      }
    }
  }, [searchTerm]);

  return (
    <section>
      <div className="sm:flex justify-between items-center py-9">
        {/* left section */}
        <div>
          <h1 className="font-semibold text-lg">Band A</h1>
          <h1>See all available devices In each Band A</h1>
        </div>

        {/* right section  */}
        <div className="flex sm:w-[38.8rem] items-center w-full mt-4 sm:mt-0 space-x-6  text-sm">
          {/* search input */}
          <div className="relative flex space-x-4">
            <Input
              type="text"
              placeholder="Search by username"
              className="rounded-md w-[15rem] pl-9 bg-nurseryColor border-black border-2 focus:ring-0  focus-visible:ring-0 focus-visible:ring-offset-0"
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
              onClick={handleSearch}
              className={`${
                searchLoader ? "pointer-events-none" : "pointer-events-auto"
              }`}
            >
              {searchLoader ? <Loader /> : <Search className="h-4 w-4 " />}
            </Button>
          </div>

          {/* sort by */}
          <div className="sm:block hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-sm bg-transparent border-2 border-black px-2 space-x-2 w-[6rem] focus-visible:outline-none"
                >
                  <h1>Sort By</h1>
                  <span className={`text-sm text-black group-hover:text-black`}>
                    <FontAwesomeIcon icon={faChevronDown} />
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
                            handleSorting("name", "device__user__name")
                          }
                        >
                          <span className="w-6">
                            {sortBy === "name" && <Check className="h-5 w-5" />}
                          </span>
                          <span className="ml-3">(A-Z) Ascending</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleSorting("-name", "-device__user__name")
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
                  {/* amount */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <span className="w-6">
                        {sortBy.includes("amount") && (
                          <Check className="h-5 w-5" />
                        )}
                      </span>
                      <span className="ml-3"> Amount</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem
                          onClick={() => handleSorting("amount", "amount")}
                        >
                          <span className="w-6">
                            {sortBy === "amount" && (
                              <Check className="h-5 w-5" />
                            )}
                          </span>
                          <span className="ml-3">(A-Z) Ascending</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleSorting("-amount", "-amount")}
                        >
                          <span className="w-6">
                            {sortBy === "-amount" && (
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

                {/* Sort by*/}
                <DropdownMenuGroup>
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
      {/* table */}

      <div>
        <TransactionTable transactions={transactions} />
      </div>
    </section>
  );

  // handle sorting
  async function handleSorting(sortName, sortBy) {
    console.log(sortBy, "sortedby");
    setSortBy(sortName);
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/disco/payments/?account=${accounts[0]["id"]}&ordering=${sortBy}`,
        {
          headers: headers,
        }
      );

      if (status === 200) {
        setTransactions(data.results);
        console.log(data.results, "the devices");
        // return { msg: data.results, success: true };
      }
    } catch (error) {
      console.log(error, "this is the error");
      // return { msg: "error.response.data.detail", success: false };
    }
  }

  // handle getting the transactions
  async function handleGetTransaction() {
    try {
      const { headers, accounts } = await handleRouteAuthorization();
      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/disco/payments/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
        }
      );

      console.log(data, status, "the devices");
      if (status === 200) {
        setTransactions(data.results);
        setDefaultTransactions(data.results);
        console.log(data, "the devices");
        //  return { msg: data.results, success: true };
      }
    } catch (error) {
      console.log(error, "this is the error");
      //  return { msg: "error.response.data.detail", success: false };
    }
  }

  // handle clear sorting for the transactions
  async function handleClearSorting(sortBy) {
    setSortBy(sortBy);
    setTransactions(defaultTransactions);
  }

  // handle searching transactions
  async function handleSearch() {
    isFirstRender.current = false;
    setSearchLoader(true);
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/disco/payments/?account=${accounts[0]["id"]}&search=${searchTerm}`,
        {
          headers: headers,
        }
      );

      if (status === 200) {
        setSearchLoader(false);
        setTransactions(data.results);
      }
    } catch (error) {
      setSearchLoader(false);

      console.log(error, "this is the error");
    }
  }

  // handle clear search
  function clearSearch() {
    // restore the default devices
    setTransactions(defaultTransactions);
  }
};

export default Transaction;
