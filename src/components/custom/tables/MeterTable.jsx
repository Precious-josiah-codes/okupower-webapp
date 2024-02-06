import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GiveBonusModal from "../GiveBonusModal";
import ConfirmDelete from "../ConfirmDelete";
import { useState } from "react";
import Loader from "../Loader";
import { useRouter } from "next/navigation";

const dropDownItemStyle =
  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50";

const MeterTable = ({ meters }) => {
  const router = useRouter();
  const meterType = {
    ONE_PHASE: "One Phase",
    THREE_PHASE: "Three Phase",
  };

  return (
    <section>
      <section className="bg-white py-4 rounded-xl text-sm">
        {/* header for desktop */}
        <div className="sm:block hidden px-[52px] ">
          <div className="grid grid-cols-5 py-5 font-bold">
            <div>Meter NO</div>
            <div>Username</div>
            <div>Address</div>
            <div>Meter Type</div>
            <div>Status</div>
          </div>
        </div>

        {/* body */}
        <div className="sm:h-[85vh] h-[65vh] px-6 w-[100%] overflow-y-auto sidebar text-[#515151]">
          {/* header for mobile */}
          <div className="sm:hidden block text-black w-full">
            <div className="flex py-5 pl-6 font-bold w-[50rem]">
              <div className="flex-1">DEVICE</div>
              <div className="flex-1">TYPE</div>
              <div className="flex-1">START DATE</div>
              <div className="flex-1">DATE RESOLVED</div>
              <div className="flex-1">STATUS</div>
            </div>
          </div>

          {/* body */}
          {meters?.map((meter, index) => (
            <div
              className="grid grid-cols-5 bg-[#cfcfcf42] py-6  mb-3 rounded-[16px] hover:bg-[#0553321e] cursor-pointer text-[#51515] font-normal transition-all w-[50rem] sm:w-full px-6"
              key={index}
              onClick={() => router.push(`/meter/${meter.id}`)}
            >
              {/* meter no */}
              <div>#{meter.meter_no}</div>

              {/* user name */}
              <div className="font-medium">{meter?.user_name}</div>

              {/* address */}
              <div>{meter.user_address}</div>

              {/* type of meter */}
              <div>{meterType[meter.type]}</div>

              {/* status */}
              <div>
                <span
                  className={`text-sm rounded-full text-white px-3 py-1 ${
                    true ? "bg-[#0F732B]" : "bg-[#BF1D1D]"
                  }`}
                >
                  {meter.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default MeterTable;
