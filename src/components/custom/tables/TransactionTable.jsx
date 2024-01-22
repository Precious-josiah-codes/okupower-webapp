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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GiveBonusModal from "../GiveBonusModal";
import ConfirmDelete from "../ConfirmDelete";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const dropDownItemStyle =
  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50";

const TransactionTable = ({ transactions }) => {
  const paymentMethod = {
    CREDIT_CARD: "Credit Card",
    BANK_TRANSFER: "Bank Transfer",
    BANK: "Bank",
    USSD: "Ussd",
    QR: "Qr",
    MOBILE_MONEY: "Mobile Money",
  };
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [activeMoveBand, setActiveMoveBand] = useState(null);

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
                  {/* print reciepts */}
                  <div
                    className={`${dropDownItemStyle} ${
                      true
                        ? "text-slate-500 pointer-events-none"
                        : "text-black pointer-events-auto"
                    }`}
                  >
                    Print Receipts
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <h1>Username</h1>
            </div>
            <div>Amount</div>
            <div>Payment Method</div>
            <div>Meter ID</div>
          </div>
        </div>

        {/* body */}
        <div className="sm:h-[85vh] h-[65vh] w-[100%] overflow-y-auto sidebar text-[#515151]  px-6">
          {/* header for mobile */}
          <div className="sm:hidden block text-black w-full">
            <div className="flex py-5 pl-6 font-bold w-[50rem]">
              <div>Username</div>
              <div className="flex-1">Amount</div>
              <div className="flex-1">Payment Method</div>
              <div className="flex-1">Meter ID</div>
            </div>
          </div>

          {/* body */}
          {transactions?.map((transaction, index) => (
            <div
              className="grid grid-cols-4 bg-[#cfcfcf42] py-6 mb-3 rounded-[16px] hover:bg-[#0553321e] cursor-pointer text-[#51515] font-normal transition-all w-[50rem] sm:w-full px-6"
              key={index}
            >
              {/* name */}
              <div className="flex items-center space-x-9">
                <Checkbox
                  onCheckedChange={() => handleSelectedDevice(transaction)}
                />
                <div>{transaction?.name}</div>
              </div>

              {/* amount */}
              <div>{transaction?.amount}</div>

              {/* payment method */}
              <div className="capitalize">
                {paymentMethod[transaction?.channel]}
              </div>

              {/* meter id */}
              <div>{transaction?.device_id}</div>
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

export default TransactionTable;
