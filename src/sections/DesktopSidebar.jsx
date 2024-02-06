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
      link: "/meters/inventory",
      text: "Inventory",
    },
    {
      icon: <FontAwesomeIcon icon={faBook} />,
      link: "/meters",
      text: "Meters",
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
      <div className="h-full flex flex-col  py-4 overflow-y-auto 2xl:py-[3.3rem] ">
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
          h-fit sidebar 2xl:h-auto 2xl:space-y-6 px-3 mt-[5rem]"
        >
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
        </div>

        {/* end page links */}
      </div>
    </div>
  );
};

export default Sidebar;
