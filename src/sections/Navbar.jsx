"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faBars,
  faBell,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toggleSideMenu } from "@/store/UI";

const Navbar = ({ profile }) => {
  return (
    <section className="h-[5rem] sm:px-6 px-3 flex justify-between items-center text-black w-full sticky top-0 z-50 bg-white border-b border-[#5b58662d]">
      {/* page title */}
      <h1 className="sm:text-sm font-semibold">Dashboard</h1>

      {/*  */}
      <div className="flex items-center justify-between sm:w-[17rem] w-[6rem]">
        {/* notification icon */}
        <div className="bg-nurseryColor w-[2.7rem] h-[2.7rem] inline-flex items-center justify-center p-1 rounded-full relative">
          <FontAwesomeIcon icon={faBell} />
          <div className="bg-[#F54CF8] w-3 h-3 absolute top-0 right-0 rounded-full" />
        </div>

        {/* profile */}
        <div className="hidden sm:flex items-center w-fit sm:space-x-6 space-x-3 py-1 px-1">
          {/* photo for desktop view */}
          {profile?.avatar.length === 1 ? (
            <div className="h-[2.7rem] w-[2.7rem] rounded-full overflow-hidden relative bg-primaryColor text-white inline-flex justify-center items-center">
              <div>{profile?.avatar}</div>
            </div>
          ) : (
            <div className="h-[2.7rem] w-[2.7rem] rounded-full overflow-hidden relative">
              <Image
                className="object-cover w-full h-full"
                src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                fill
                alt=""
                priority
              />
            </div>
          )}

          {/* photo for mobile view */}
          <div className="sm:hidden block">
            <Popover>
              <PopoverTrigger>
                {/* photo */}
                {profile?.avatar.length === 1 ? (
                  <div className="h-[2.7rem] w-[2.7rem] rounded-full overflow-hidden relative">
                    {profile?.avatar}
                  </div>
                ) : (
                  <div className="h-[2.7rem] w-[2.7rem] rounded-full overflow-hidden relative">
                    <Image
                      className="object-cover w-full h-full"
                      src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      fill
                      alt=""
                      priority
                    />
                  </div>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                {/* profile details for mobile */}
                <div className="text-black text-sm sm:hidden block">
                  <h1 className="text-sm font-semibold">{profile?.name}</h1>
                  <h2>{profile?.position}</h2>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* downn arrow icon */}
          <div className="sm:hidden block">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>

          {/* profile details for desktop */}
          <div className="text-black text-sm sm:block hidden">
            <h1 className="text-sm font-semibold">{profile?.name}</h1>
            <h2>{profile?.position}</h2>
          </div>
        </div>

        {/* hamburger menu */}
        <div onClick={toggleSideMenu}>
          <FontAwesomeIcon icon={faBars} className="text-xl am:hidden flex" />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
