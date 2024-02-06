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
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlertOctagon, AlertTriangle, Info, ThumbsUp } from "lucide-react";
import { handleRouteAuthorization } from "@/lib/auth";
import axios from "axios";

const Navbar = ({ profile }) => {
  const pathName = usePathname();
  const searchParam = useSearchParams();
  const [path, setPath] = useState(null);
  const [notifications, setNotifications] = useState(null);

  console.log(pathName, "this is the pathname");
  useEffect(() => {
    if (pathName === "/") {
      setPath("Branches");
    } else if (pathName.includes("/branch/meters/")) {
      setPath(searchParam.get("name"));
    } else if (pathName.includes("/bands")) {
      setPath("Bands");
    } else if (pathName.includes("/inventory")) {
      setPath("Inventory");
    } else if (pathName.includes("/meter")) {
      setPath("Meter");
    } else if (pathName.includes("/transactions")) {
      setPath("Transactions");
    }
  }, [pathName]);

  useEffect(() => {
    handleNotification();
  }, []);

  const notificationIcon = {
    ALERT: <AlertOctagon className="w-4 h-4 text-red-500" />,
    WARNING: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
    INFO: <Info className="w-4 h-4 text-blue-500" />,
    SUCCESS: <ThumbsUp className="w-4 h-4 text-green-500" />,
  };

  console.log(pathName, "this is the path name");
  return (
    <section className="h-[5rem] sm:px-6 px-3 flex justify-between items-center text-black w-full sticky top-0 z-50 bg-white border-b border-[#5b58662d]">
      {/* page title */}
      <h1 className="sm:text-sm font-semibold capitalize">{path}</h1>

      {/* gfgdgfd */}
      <div className="flex items-center space-x-4 sm:w-fit w-[6rem]">
        {/* notification icon */}
        <Sheet>
          <SheetTrigger>
            <div className="bg-nurseryColor w-[2.7rem] h-[2.7rem] inline-flex items-center justify-center p-1 rounded-full relative">
              <FontAwesomeIcon icon={faBell} />
              <div className="bg-[#F54CF8] w-3 h-3 absolute top-0 right-0 rounded-full" />
            </div>
          </SheetTrigger>
          <SheetContent className="w-[40rem] sm:max-w-none p-0">
            <SheetHeader>
              <SheetTitle>
                <h1 className="text-sm font-medium pl-6 py-3">
                  Clear Notification
                </h1>
              </SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto h-full p-6 text-sm space-y-5 divide-y sidebar ">
              {notifications?.map((notification, index) => (
                <div className="flex space-x-3 pt-5" key={index}>
                  <div className=" pt-1">
                    {notificationIcon[notification.type]}
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <h1 className="capitalize font-medium">
                        {notification?.title}
                      </h1>
                      <h1>{formatTime(notification?.created_at)}</h1>
                    </div>
                    <p className="font-light">{notification?.message}</p>
                  </div>
                </div>
              ))}
              <div className="pb-[5rem]" />
            </div>
          </SheetContent>
        </Sheet>

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
                  <h1 className="text-sm font-semibold">
                    {profile?.name.split(" ")[0]}
                  </h1>
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
            <h1 className="text-sm font-semibold">
              {profile?.name.split(" ")[0]}
            </h1>
            <h2>{profile?.position}</h2>
          </div>
        </div>

        {/* hamburger menu */}
        <div onClick={toggleSideMenu} className="sm:hidden flex">
          <FontAwesomeIcon icon={faBars} className="text-xl " />
        </div>
      </div>
    </section>
  );

  // handling notification
  async function handleNotification() {
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/notifications/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
        }
      );

      console.log(data, status, "o boy");
      if (status === 200) {
        setNotifications(data.results);
        console.log(data, "the meters");

        //  return { msg: data.results, success: true };
      }
    } catch (error) {
      console.log(error, "this is the error");
      //  return { msg: "error.response.data.detail", success: false };
    }
  }

  // format time
  function formatTime(datetime) {
    let date = new Date(datetime);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return `${hour}:${minutes}:${seconds}`;
  }
};

export default Navbar;
