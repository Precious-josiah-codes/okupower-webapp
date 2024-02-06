import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "./Loader";
import { useState } from "react";
import {
  giveBonusMultipleBands,
  giveBonusToBand,
  giveBonusToDevice,
} from "@/store/Band";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";

const GiveBonusModal = ({ content, bonusType, devices, bands, activeBand }) => {
  const [bonus, setBonus] = useState();
  const [loader, setLoader] = useState(false);
  const [selectedBands, setSelectedBands] = useState([]);

  return (
    <>
      <Dialog className="bg-black/80" onOpenChange={() => setSelectedBands([])}>
        <DialogTrigger asChild>{content}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Give Bonus</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* band bonus amount */}
            <div>
              <Label htmlFor="amount">Enter amount</Label>
              <Input
                id="amount"
                type="number"
                className="mt-3"
                placeholder="Enter discount unit"
                onChange={(e) => setBonus(e.target.value)}
              />
            </div>

            {/* select band */}
            {bonusType === "bands" && (
              <div>
                <Label>Select Bands</Label>
                <div className="grid grid-cols-4 gap-y-4 mt-3">
                  {bands?.map((band, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <Checkbox
                        id={band.id}
                        onCheckedChange={(checked) => {
                          checked
                            ? setSelectedBands([band.id, ...selectedBands])
                            : setSelectedBands(
                                selectedBands.filter((id) => id !== band.id)
                              );
                          console.log(selectedBands, "the checked");
                        }}
                      />
                      <label
                        htmlFor={band.id}
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {band.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-primaryColor"
              onClick={() => handleGiveBonus(bonusType)}
            >
              {loader ? <Loader /> : "Give Bonus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );

  // handle giving bonuses
  function handleGiveBonus(type) {
    if (type === "band") {
      handleGiveBonusBand();
    } else if (type === "bands") {
      if (selectedBands.length > 1 && bonus) {
        console.log("bands", selectedBands);
        handleGiveBonusBands();
      }
    } else {
      handleGiveBonusDevices();
    }
  }

  // handle bonus to devices
  async function handleGiveBonusDevices() {
    setLoader(true);

    // get the device ids
    const deviceIds = devices.map((device) => device.id);

    const { msg, success } = await giveBonusToDevice(activeBand.id, {
      devices: deviceIds,
      bonus: bonus,
    });

    if (success) {
      setLoader(false);
      toast.success(msg);
    }
  }

  // handle bonuses to band
  async function handleGiveBonusBand() {
    console.log("handle give bonus to band");
    setLoader(true);

    const { msg, success } = await giveBonusToBand(
      activeBand.id,
      activeBand.name,
      {
        bonus: bonus,
      }
    );

    console.log(success, "the success");
    if (success) {
      setLoader(false);
      toast.success(msg);
    }
  }

  // handle bonuses to band
  async function handleGiveBonusBands() {
    setLoader(true);

    const { msg, success } = await giveBonusMultipleBands({
      bands: selectedBands,
      bonus: bonus,
    });

    console.log(success, "the success");
    if (success) {
      setLoader(false);
      toast.success(msg);
    }
  }
};

export default GiveBonusModal;
