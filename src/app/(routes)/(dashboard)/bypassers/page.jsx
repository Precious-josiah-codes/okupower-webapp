import Bypassers from "@/components/custom/tables/Bypassers";
import Metrics from "@/sections/Metrics";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEllipsisV,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { popoverDropdownStyle, popoverStyle } from "@/lib/styles";
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

const Bypass = () => {
  return (
    <section>
      {/* metrics */}
      <Metrics />

      {/* bypassers */}
      <section>
        <div className="my-9 sm:flex justify-between items-center">
          {/* left section */}
          <h1 className="font-semibold">Bypassers</h1>

          {/* right section for desktop */}
          <div className="flex sm:w-[31rem] w-full mt-3 sm:mt-0 space-x-6  text-sm">
            {/* seach input */}
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search"
                className="rounded-md sm:w-[15rem] w-full pl-9 bg-nurseryColor border-black border-2 focus:border-none focus:ring-0 focus:outline-none"
              />

              {/* search icon */}
              <div className="absolute inset-y-0 left-0 px-3 py-2 focus:outline-none">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-[#a8a8a8]"
                />
              </div>
            </div>

            {/* sort by */}
            <div className="sm:block hidden">
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
            <div className="sm:block hidden">
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
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={popoverStyle}>
                  <h1 className={popoverDropdownStyle}>Resolved</h1>
                  <h1 className={popoverDropdownStyle}>Unresolved</h1>
                </PopoverContent>
              </Popover>
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

        {/* table */}
        <Bypassers />
      </section>
    </section>
  );
};

export default Bypass;
