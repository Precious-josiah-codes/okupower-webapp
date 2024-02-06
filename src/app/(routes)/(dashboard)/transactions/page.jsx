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
import TableLoader from "@/components/custom/lazy loaders/TableLoader";
import Image from "next/image";
import { sectionVariants } from "@/lib/framerVariants";
import { motion } from "framer-motion";

const Transaction = () => {
  const [defaultTransactions, setDefaultTransactions] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);
  const [transactionLoader, setTransactionLoader] = useState(false);
  const [sortBy, setSortBy] = useState("-created_at");
  const isFirstRender = useRef(true);

  const [notFoundLoader, setNotFoundLoader] = useState(false);

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
      <h1 className="mt-9">View all transaction</h1>
      <div
        className={`sm:flex justify-between items-center mt-4 mb-9 ${
          transactions ? "visible" : "invisible"
        }`}
      >
        {/* left section */}

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

        {/* right section  */}
        <div className="flex sm:w-fit items-center w-full mt-4 sm:mt-0 space-x-6  text-sm">
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

      {/* transaction table  skeleton loader */}
      {transactionLoader && <TableLoader />}

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
          <h1 className="absolute bottom-6">
            Couldn't find transaction for {searchTerm}
          </h1>
        </motion.div>
      )}

      {/* table */}
      {!transactionLoader && transactions?.length > 0 && (
        <div>
          <TransactionTable transactions={transactions} />
        </div>
      )}
    </section>
  );

  // handle sorting
  async function handleSorting(sortName, sortBy) {
    console.log(sortBy, "sortedby");
    if (!transactionLoader) setTransactionLoader(true);
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
        setTransactionLoader(false);
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
    if (!transactionLoader) setTransactionLoader(true);
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
        setTransactionLoader(false);
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
    if (!transactionLoader) setTransactionLoader(true);
    if (notFoundLoader) setNotFoundLoader(false);

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
      console.log(data.results, status, searchTerm, "the results");

      if (status === 200) {
        setTransactionLoader(false);
        setSearchLoader(false);
        setTransactions(data.results);

        if (data.results.length === 0) {
          setNotFoundLoader(true);
        }
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
    setNotFoundLoader(false);
  }
};

export default Transaction;
