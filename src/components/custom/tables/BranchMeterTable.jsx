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
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/framerVariants";
import { useRouter } from "next/navigation";

const dropDownItemStyle =
  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50";

const BranchMeterTable = ({
  meters,
  activeBranch,
  loader,
  handleDeleteMeter,
  branches,
  handleDeleteAllMeter,
  handleMovingMeterFromBranchFn,
}) => {
  const [selectedMeters, setSelectedMeters] = useState([]);
  const [activeMoveBranch, setActiveMoveBranch] = useState(null);
  const router = useRouter();

  console.log(branches, "this are the branches");

  const meterType = {
    ONE_PHASE: "One Phase",
    THREE_PHASE: "Three Phase",
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="bg-white py-4 rounded-xl text-sm"
    >
      {/* header for desktop */}
      <div className="sm:block hidden px-[52px]">
        <div className="grid grid-cols-5 py-5 font-bold">
          <div className="flex space-x-9 ">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="h-6 w-3 text-left ">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* delete all meters*/}
                {/* <div
                    className={` ${dropDownItemStyle} ${
                      bandDevices.length === 0
                        ? "text-slate-500 pointer-events-none"
                        : "text-black pointer-events-auto"
                    } `}
                  >
                    <ConfirmDelete
                      headerTitle="Delete All Devices"
                      description="Are you sure you want to delete all device in this band"
                      loader={loader}
                      handleDeleteFn={handleDeleteAllDevice}
                      itemsToDelete={null}
                    />
                  </div> */}

                {/* delete meters */}
                <div
                  className={`${dropDownItemStyle} ${
                    selectedMeters.length === 0
                      ? "text-slate-500 pointer-events-none"
                      : "text-black pointer-events-auto"
                  }`}
                >
                  <ConfirmDelete
                    headerTitle="Delete Meter"
                    description="Are you sure you want to delete this meter, it would be moved to the default branch"
                    loader={loader}
                    handleDeleteFn={handleDeleteMeter}
                    itemToDelete={selectedMeters}
                  />
                </div>

                {/* move meters */}
                <DropdownMenuSub className="">
                  <DropdownMenuSubTrigger
                    className={`${
                      selectedMeters.length === 0
                        ? "text-slate-500 pointer-events-none"
                        : "text-black pointer-events-auto"
                    }`}
                  >
                    <span>Move Devices</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {branches?.map(
                        (branch, index) =>
                          branch.id !== activeBranch.id && (
                            <div key={index} className={`${dropDownItemStyle}`}>
                              <Dialog>
                                <DialogTrigger className="w-full">
                                  <div
                                    className="inline-flex text-left w-full"
                                    onClick={() => setActiveMoveBranch(branch)}
                                  >
                                    {branch?.name}
                                  </div>{" "}
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="text-center mx-auto w-[350px] text-sm font-normal mb-9">
                                      Are you sure, you'd want to move this
                                      device from {activeBranch?.name} to{" "}
                                      {activeMoveBranch?.name}
                                    </DialogTitle>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button
                                          type="submit"
                                          className="w-full bg-nurseryColor text-black hover:bg-nurseryColor"
                                        >
                                          Cancel
                                        </Button>
                                      </DialogClose>

                                      <Button
                                        type="submit"
                                        className="w-full bg-primaryColor"
                                        onClick={() =>
                                          handleMovingMeterFromBranchFn(
                                            selectedMeters,
                                            activeMoveBranch
                                          )
                                        }
                                      >
                                        {loader ? <Loader /> : "Move Device"}
                                      </Button>
                                    </DialogFooter>
                                  </DialogHeader>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )
                      )}
                      <DropdownMenuSeparator />
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>

            <h1>Meter NO</h1>
          </div>
          <div>Username</div>
          <div>Address</div>
          <div>Meter Type</div>
          <div>Status</div>
        </div>
      </div>

      {/* body */}
      <div className="sm:h-[85vh] h-[65vh] w-[100%] overflow-y-auto sidebar text-[#515151] px-6">
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
            <div className="flex items-center space-x-9">
              <Checkbox onCheckedChange={() => handleSelectedMeter(meter)} />
              <h1>#{meter.meter_no}</h1>
            </div>

            {/* user name */}
            <div className="font-medium">{meter?.user_name}</div>

            {/* address */}
            <div>{meter.user_address}</div>

            {/* type of meter */}
            <div>{meterType[meter.type]}</div>

            {/* status */}
            <div>
              <span
                className={`text-xs font-semibold rounded-full text-white px-3 py-1 ${
                  meter.status === "ASSIGNED"
                    ? "bg-[#0F732B]"
                    : meter.status === "BREACHED"
                    ? "bg-red-500"
                    : meter.status === "CONNECTED"
                    ? "bg-[#0F732B]"
                    : "bg-gray-600"
                }`}
              >
                {meter.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );

  function handleSelectedMeter(meter) {
    console.log(meter, "the merter");
    // check if meter exist in array
    const meterSelected = selectedMeters.find(
      (selectedDevice) => selectedDevice.id === meter.id
    );

    // if meter exist, remove it
    if (meterSelected) {
      const filterMeter = selectedMeters.filter(
        (selectedMeter) => selectedMeter.id !== meter.id
      );
      setSelectedMeters(filterMeter);
    } else {
      // else add the new meter
      const newSelectedMeter = [meter, ...selectedMeters];
      setSelectedMeters(newSelectedMeter);
    }
  }
};

export default BranchMeterTable;
