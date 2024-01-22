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
import { toggleSideMenu, useUIStore } from "@/store/UI";

// styles
const link = `flex items-center p-2 text-gray-700 rounded-lg  hover:bg-white group cursor-pointer transition-all duration-300`;
const linkText = `ml-6  whitespace-nowrap group-hover:text-black group-hover:font-semibold`;

const MobileSidebar = () => {
  const [sideMenu] = useUIStore((state) => [state.sideMenu]);
  const [activeLink, setActiveLink] = useState("");
  const [activeSubLink, setSubActiveLink] = useState("");
  const [toggleCaret, setToggleCaret] = useState(false);

  const [sideBarLinks, setSideBarLinks] = useState([
    {
      icon: <FontAwesomeIcon icon={faBorderAll} />,
      link: "/",
      text: "Overview",
    },
    {
      icon: <FontAwesomeIcon icon={faBolt} />,
      link: "/consumption",
      text: "Consumption",
    },
    {
      icon: <FontAwesomeIcon icon={faUserGroup} />,
      link: [
        { link: "/devices", text: "Devices" },
        { link: "/bypassers", text: "Bypassers" },
        { link: "/bands", text: "Bands" },
      ],
      text: "Users",
    },
    {
      icon: <FontAwesomeIcon icon={faUsers} />,
      link: "/team_members",
      text: "Team  Members",
    },
    {
      icon: <FontAwesomeIcon icon={faBook} />,
      link: "/reports",
      text: "Reports",
    },
    {
      icon: <FontAwesomeIcon icon={faLocationDot} />,
      link: "/branches",
      text: "Branches",
    },
    {
      icon: <FontAwesomeIcon icon={faHandHoldingDollar} />,
      link: "/transaction",
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
    <section
      className={`w-full h-screen bg-[#00000086] sm:hidden block fixed top-0 right-0 z-[9999] ease-in-out duration-300 ${
        sideMenu ? "translate-x-0 " : "translate-x-full sm:hidden"
      }`}
      onClick={toggleSideMenu}
    >
      <div
        id="cta-button-sidebar"
        className="fixed right-0 w-[18rem] text-sm h-screen bg-primaryColor border-r border-[#5b58662d] text-red-900 font-normal sm:hidden block"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col justify-between py-4 overflow-y-auto 2xl:py-[3.3rem] ">
          {/* start page links */}
          <div
            className="space-y-4
          h-[37rem] overflow-y-auto sidebar 2xl:h-auto 2xl:space-y-6 px-3"
          >
            {/* Main text */}
            <h1 className="pl-2 pt-6 text-gray-300">Main</h1>

            {/* other links */}
            {sideBarLinks.map((sideBarLink, index) => (
              <div key={index}>
                {sideBarLink.text !== "Users" ? (
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
                ) : (
                  <Collapsible>
                    <CollapsibleTrigger className="w-full">
                      <div
                        onClick={() => handleRoute(sideBarLink.link)}
                        className={`${link} py-3 w-full ${
                          activeLink === sideBarLink.link
                            ? "bg-secondaryColor"
                            : null
                        }`}
                      >
                        {/* icon */}
                        <div
                          className={` group-hover:text-black w-3 ${
                            activeLink === sideBarLink.link
                              ? "text-black"
                              : "text-secondaryColor"
                          }`}
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
                        {/* counter */}
                        {!toggleCaret ? (
                          <span
                            className={`ml-[5rem] text-sm text-white group-hover:text-black`}
                          >
                            <FontAwesomeIcon icon={faChevronDown} />
                          </span>
                        ) : (
                          <span
                            className={`ml-[5rem] text-sm text-white group-hover:text-black`}
                          >
                            <FontAwesomeIcon icon={faChevronUp} />
                          </span>
                        )}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="CollapsibleContent">
                      {sideBarLink.link.map((subLink, index) => (
                        <div
                          className={`flex items-center p-2  hover:text-black rounded-lg cursor-pointer w-full ${
                            activeSubLink === subLink.link
                              ? "text-black"
                              : "text-white"
                          }`}
                          key={index}
                          onClick={() => handleSubLink(subLink.link)}
                        >
                          <span className="ml-9 whitespace-nowrap">
                            {subLink.text}
                          </span>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}
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
                  activeLink === "/support"
                    ? "text-black"
                    : "text-secondaryColor"
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
    </section>
  );
};

export default MobileSidebar;
