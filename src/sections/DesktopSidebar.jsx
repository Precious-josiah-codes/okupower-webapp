"use client";

// modules
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faBolt,
  faUserGroup,
  faUsers,
  faBook,
  faLocationDot,
  faHandHoldingDollar,
  faCircleQuestion,
  faGear,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
// import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

// Specify all properties: name, family, style

// files
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import { Separator } from "../components/ui/separator";

// styles
const link = `flex items-center p-2 text-gray-700 rounded-lg  hover:bg-white group cursor-pointer transition-all duration-300`;
const linkText = `ml-6  whitespace-nowrap group-hover:text-black group-hover:font-semibold`;
const desktopSideBar =
  "fixed top-0 left-0 z-40 w-64 text-sm h-screen bg-primaryColor border-r border-[#5b58662d] text-red-900 font-normal hidden sm:block";

const Sidebar = () => {
  //   const { toggleSideMenu, links } = useContext(StoreContext);
  const [activeLink, setActiveLink] = useState("");
  const [activeSubLink, setSubActiveLink] = useState("");
  const [toggleCaret, setToggleCaret] = useState(false);

  const [sideBarLinks, setSideBarLinks] = useState([
    {
      icon: <FontAwesomeIcon icon={faBorderAll} />,
      link: "/",
      text: "Branches",
    },
    {
      icon: <FontAwesomeIcon icon={faBolt} />,
      link: "/bands",
      text: "Bands",
    },

    {
      icon: <FontAwesomeIcon icon={faUsers} />,
      link: "/devices/inventory",
      text: "Inventory",
    },
    {
      icon: <FontAwesomeIcon icon={faBook} />,
      link: "/devices",
      text: "Devices",
    },

    {
      icon: <FontAwesomeIcon icon={faHandHoldingDollar} />,
      link: "/transactions",
      text: "Transactions",
    },
  ]);
  const router = useRouter();

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, [true]);

  const handleRoute = (path) => {
    router.push(path);
    setActiveLink(path);
    setSubActiveLink(" ");
    setToggleCaret(!toggleCaret);
    console.log(path, "hello");
  };

  const handleSubLink = (path) => {
    router.push(path);
    setSubActiveLink(path);
    console.log(activeSubLink, "hdjh");
  };

  return (
    <div
      id="cta-button-sidebar"
      className={desktopSideBar}
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col justify-between py-4 overflow-y-auto 2xl:py-[3.3rem] ">
        {/* start logo/brand name */}
        <div className="h-[3rem] w-[6rem] relative mx-auto">
          <Image
            className="object-contain w-full h-full"
            src="/white_logo.png"
            fill
            alt=""
            priority
          />
        </div>
        {/* start logo/brand name */}

        {/* start page links */}
        <div
          className="space-y-4
          h-[23rem] overflow-y-auto sidebar 2xl:h-auto 2xl:space-y-6 px-3"
        >
          {/* Main text */}
          <h1 className="pl-2 pt-6 text-gray-300">Main</h1>

          {/* other links */}
          {sideBarLinks.map((sideBarLink, index) => (
            <div key={index}>
              <div
                onClick={() => handleRoute(sideBarLink.link)}
                className={`w-full ${link} 
                  ${
                    activeLink === sideBarLink.link ? "bg-secondaryColor" : null
                  }`}
              >
                {/* icon */}
                <div
                  className={`${
                    activeLink === sideBarLink.link
                      ? "text-black"
                      : "text-secondaryColor"
                  } group-hover:text-black text-lg w-3`}
                >
                  {sideBarLink.icon}
                </div>

                {/* text */}
                <span
                  className={` ${linkText} ${
                    activeLink === sideBarLink.link
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {sideBarLink.text}
                </span>
              </div>
            </div>
          ))}

          {/* seperator */}
          <div className="mt-[20rem]">
            <Separator className="border border-secondaryColor" />
          </div>

          {/* Help text */}
          <h1 className="pl-2 pt-6 text-gray-300">Help</h1>

          {/* support link */}
          <Link
            href="/"
            className={`${link} ${
              activeLink === "/support" ? "bg-secondaryColor" : null
            }`}
          >
            {/* icon */}
            <div
              className={`${
                activeLink === "/support" ? "text-black" : "text-secondaryColor"
              } group-hover:text-black text-lg w-3`}
            >
              <FontAwesomeIcon icon={faCircleQuestion} />
            </div>
            {/* text */}
            <span
              className={`${linkText} ${
                activeLink === "/support" ? "text-black" : "text-white"
              }`}
            >
              Support
            </span>
          </Link>

          {/* settings link */}
          <Link
            href="/"
            className={`${link} ${
              activeLink === "/settings" ? "bg-secondaryColor" : null
            }`}
          >
            {/* icon */}
            <div
              className={`${
                activeLink === "/settings"
                  ? "text-black"
                  : "text-secondaryColor"
              } group-hover:text-black text-lg w-3`}
            >
              <FontAwesomeIcon icon={faGear} />
            </div>
            {/* text */}
            <span
              className={`${linkText} ${
                activeLink === "/settings" ? "text-black" : "text-white"
              }`}
            >
              Settings
            </span>
          </Link>
        </div>

        {/* end page links */}

        {/* profile section */}
        <div className="px-3">
          <div className="border-2 border-secondaryColor rounded-lg flex space-x-6 py-4 px-1">
            {/* photo */}
            <div className="h-[3rem] w-[3rem] rounded-full overflow-hidden relative">
              <Image
                className="object-cover w-full h-full"
                src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                fill
                alt=""
                priority
              />
            </div>

            {/* profile details */}
            <div className="text-white text-sm">
              <h1 className="text-base">Anthony Gideon</h1>
              <h2>Manager</h2>
              <h3 className="text-gray-200">hello@gmail.com</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
