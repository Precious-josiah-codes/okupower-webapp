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
import { useRouter } from "next/navigation";

const dropDownItemStyle =
  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50";

const BandTable = ({
  bandDevices,
  bandMetric: bands,
  loader,
  handleDeleteDevice: handleDeleteDeviceFn,
  handleDeleteAllDevice,
  handleMovingDeviceFromBand: handleMovingDeviceFromBandFn,
  activeBand,
}) => {
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [activeMoveBand, setActiveMoveBand] = useState(null);
  const router = useRouter();

  console.log(bandDevices, "activeMoveBand");
  return (
    <section>
      <section className="bg-white py-4 rounded-xl text-sm">
        {/* header for desktop */}
        <div className="sm:block hidden px-[52px]">
          <div className="grid grid-cols-4 py-5 font-bold">
            <div className="flex space-x-9">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="h-6 w-3 text-left ">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* give bonus */}
                  <div
                    className={` ${dropDownItemStyle} ${
                      selectedDevices?.length === 0
                        ? "text-slate-500 pointer-events-none"
                        : "text-black pointer-events-auto"
                    }`}
                  >
                    <GiveBonusModal
                      content={<span>Give Bonus</span>}
                      bonusType="selected"
                      devices={selectedDevices}
                      bands={null}
                      activeBand={activeBand}
                    />
                  </div>

                  {/* delete all devices*/}
                  <div
                    className={` ${dropDownItemStyle} ${
                      bandDevices?.length === 0
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
                  </div>

                  {/* delete devices */}
                  <div
                    className={`${dropDownItemStyle} ${
                      selectedDevices.length === 0
                        ? "text-slate-500 pointer-events-none"
                        : "text-black pointer-events-auto"
                    }`}
                  >
                    <ConfirmDelete
                      headerTitle="Delete Devices"
                      description="Are you sure you want to delete device"
                      loader={loader}
                      handleDeleteDeviceFn={handleDeleteDeviceFn}
                      itemsToDelete={selectedDevices}
                    />
                  </div>

                  {/* move devices */}
                  <DropdownMenuSub className="">
                    <DropdownMenuSubTrigger
                      className={`${
                        selectedDevices.length === 0
                          ? "text-slate-500 pointer-events-none"
                          : "text-black pointer-events-auto"
                      }`}
                    >
                      <span>Move Devices</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {bands?.map((band, index) => (
                          <div key={index} className={`${dropDownItemStyle}`}>
                            {/* */}
                            <Dialog>
                              <DialogTrigger className="w-full">
                                <div
                                  className="inline-flex justify-center text-left w-full"
                                  onClick={() => setActiveMoveBand(band)}
                                >
                                  {band.name}
                                </div>{" "}
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="text-center mx-auto w-[350px] text-sm font-normal mb-9">
                                    Are you sure, you'd want to move this device
                                    from {activeBand?.name} to{" "}
                                    {activeMoveBand?.name}
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
                                        handleMovingDeviceFromBandFn(
                                          selectedDevices,
                                          activeMoveBand.id
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
                        ))}
                        <DropdownMenuSeparator />
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>

              <h1>Meter ID</h1>
            </div>
            <div>Address</div>
            <div>Name</div>
            <div>Phone Number</div>
          </div>
        </div>

        {/* body */}
        <div className="sm:h-[85vh] h-[65vh] w-[100%] overflow-y-auto sidebar text-[#515151]  px-6">
          {/* header for mobile */}
          <div className="sm:hidden block text-black w-full">
            <div className="flex py-5 pl-6 font-bold w-[50rem]">
              <div>Meter ID</div>
              <div className="flex-1">Address</div>
              <div className="flex-1">Name</div>
              <div className="flex-1">Phone Number</div>
            </div>
          </div>

          {/* body */}
          {bandDevices?.map((meter, index) => (
            <div
              className="grid grid-cols-4 bg-[#cfcfcf42] py-6 mb-3 rounded-[16px] hover:bg-[#0553321e] cursor-pointer text-[#51515] font-normal transition-all w-[50rem] sm:w-full px-6"
              key={index}
              onClick={() => router.push(`/meter/${meter.id}`)}
            >
              {/* meter */}
              <div className="flex items-center space-x-9">
                <Checkbox onCheckedChange={() => handleSelectedDevice(meter)} />
                <h1>{meter?.serial_no}</h1>
              </div>

              {/* type */}
              <div className="font-medium">{meter?.user_address}</div>

              {/* username */}
              <div>{meter?.user_name}</div>

              {/* phone no */}
              <div>{meter?.user_phone_no}</div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );

  function handleSelectedDevice(device) {
    // check if device exist in array
    const deviceSelected = selectedDevices.find(
      (selectedDevice) => selectedDevice.id === device.id
    );

    // if device exist, remove it
    if (deviceSelected) {
      const filterDevice = selectedDevices.filter(
        (selectedDevice) => selectedDevice.id !== device.id
      );
      setSelectedDevices(filterDevice);
    } else {
      // else add the new device
      const newSelectedDevice = [device, ...selectedDevices];
      setSelectedDevices(newSelectedDevice);
    }
  }
};

export default BandTable;
