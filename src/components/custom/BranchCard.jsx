"use client";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useRouter } from "next/navigation";
import { popoverDropdownStyle, popoverStyle } from "@/lib/styles";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import BranchForm from "./BranchForm";
import { Button } from "../ui/button";
import { CopyIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { deleteBranch } from "@/store/Branch";
import { toast } from "sonner";
import { useState } from "react";
import Loader from "./Loader";

const BranchCard = ({ branch }) => {
  const [deleteLoader, setDeleteLoader] = useState(false);
  return (
    <div className="bg-white hover:bg-[#FBB62D] text-[#515151]  flex-1 px-6 2xl:px-9 py-9 space-y-5 rounded-xl transition-all duration-75 delay-150 cursor-pointer">
      <div className="flex justify-between w-full">
        <h1 className="font-bold text-black">{branch?.name}</h1>

        <Popover>
          <PopoverTrigger>
            <div className="h-6 w-6 text-right">
              <FontAwesomeIcon icon={faEllipsisV} />
            </div>
          </PopoverTrigger>
          <PopoverContent className={popoverStyle}>
            <div>
              {/* add device */}
              <div className={popoverDropdownStyle}>
                <Dialog className="bg-black/80">
                  <DialogTrigger>Add Device</DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] w-[95%] h-[25rem] overflow-y-auto sidebar">
                    <BranchForm formType="save" />
                  </DialogContent>
                </Dialog>
              </div>

              {/* edit branch */}
              <div className={popoverDropdownStyle}>
                <Dialog className="bg-black/80">
                  <DialogTrigger>Edit Branch</DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] w-[95%] h-[25rem] overflow-y-auto sidebar">
                    <BranchForm formType="edit" branch={branch} />
                  </DialogContent>
                </Dialog>
              </div>

              {/* delete branch */}
              <div className={popoverDropdownStyle}>
                <Dialog>
                  <DialogTrigger>Delete Branch</DialogTrigger>
                  <DialogContent className="sm:max-w-md ">
                    <DialogHeader className="justify-center">
                      <DialogTitle className="mb-3 text-center">
                        Delete Branch
                      </DialogTitle>
                      <DialogDescription className="text-center">
                        Are you sure you want to delete this branch.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-center space-x-12">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          className="bg-[#e4333311] px-12"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        type="button"
                        variant="secondary"
                        className="bg-[#2bc72b25] px-12"
                        onClick={() => handleDeleteBranch(branch.id)}
                      >
                        {deleteLoader ? <Loader /> : "Confirm"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-5 sm:text-sm">
        <div className="flex justify-between text-[#515151]">
          <h1>Total Devices</h1>
          <h1>{branch?.total_devices}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-[#BF1D1D]">Faults</h1>
          <h1>{branch?.total_faults}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-[#0F732B]">Consumption</h1>
          <h1>{branch?.total_consumption}</h1>
        </div>
      </div>
    </div>
  );

  async function handleDeleteBranch(branchId) {
    setDeleteLoader(true);
    let response = await deleteBranch(branchId);

    if (response.success) {
      console.log("kjnkdjankdjasn");
    } else {
      setDeleteLoader(false);
      toast.error(response.msg);
    }

    console.log(response, "the delete");
  }
};

export default BranchCard;
