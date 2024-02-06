import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  faEllipsis,
  faEllipsisVertical,
  faNairaSign,
  faSnowflake,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Loader from "./Loader";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ConfirmDelete from "./ConfirmDelete";
import { toast } from "sonner";
import { editBand } from "@/store/Band";
import GiveBonusModal from "./GiveBonusModal";
import { CircuitBoard } from "lucide-react";

const BandCard = ({ metric, handleBandFilter, activeBand }) => {
  const [loader, setLoader] = useState(false);
  const [bandName, setBandName] = useState(metric.name);
  const [tariff, setTariff] = useState(metric.tariff);
  return (
    <div
      className={`${
        activeBand.id === metric.id ? "bg-yellow-500" : "bg-white"
      }  sm:flex-1 sm:min-w-0 min-w-[80%] h-[14rem] p-[1rem] space-y-12 rounded-xl flex flex-col justify-center cursor-pointer`}
      onClick={() => handleBandFilter(metric, activeBand?.name)}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`py-[0.79rem] px-4 ${
                activeBand.id === metric.id
                  ? "bg-[#e5e7e552]"
                  : "bg-[#FBB62D52]"
              }  rounded-md inline-flex justify-center items-center`}
            >
              <CircuitBoard className="h-4 w-4" />
            </div>

            <h1 className=" font-semibold">
              Band <span className="uppercase">{metric.name}</span>
            </h1>
          </div>

          <Popover>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <PopoverTrigger>
                <div className="w-6 text-right">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </PopoverTrigger>
            </div>
            <PopoverContent className="px-0 w-[11.5rem] text-sm">
              <div
                onClick={(e) => {
                  console.log(metric, "this is the metric");
                  e.stopPropagation();
                }}
              >
                {/* edit band */}
                <Dialog className="bg-black/80">
                  <DialogTrigger asChild>
                    <div className="py-3 px-6 hover:bg-slate-100 cursor-pointer">
                      {" "}
                      Edit Band
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] max-w-[90%] p-6">
                    <form className=" space-y-6" onSubmit={handleEditBand}>
                      {/* band name */}
                      <div className=" w-full space-y-3">
                        <Label htmlFor="bandName">Band Name</Label>
                        <Input
                          id="bandName"
                          type="text"
                          defaultValue={metric.name}
                          onChange={(e) => setBandName(e.target.value)}
                          required
                        />
                      </div>

                      {/* tariff */}
                      <div className=" w-full space-y-3">
                        <Label htmlFor="tariff">Tariff</Label>
                        <Input
                          id="tariff"
                          type="number"
                          defaultValue={metric.tariff}
                          onChange={(e) => setTariff(e.target.value)}
                        />
                      </div>

                      {/* sign up button */}
                      <Button
                        type="submit"
                        className={`w-full bg-primaryColor hover:bg-primaryColor ${
                          loader ? "pointer-events-none" : "pointer-events-auto"
                        }`}
                      >
                        {loader ? <Loader /> : " Edit Band"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* give bonus */}
                <div className="py-3 px-6 hover:bg-slate-100 cursor-pointer">
                  <GiveBonusModal
                    content={<span>Give Bonus</span>}
                    bonusType="band"
                    devices={null}
                    bands={null}
                    activeBand={activeBand}
                  />
                </div>

                {/* delete band */}
                <div className="py-3 px-6 hover:bg-slate-100 cursor-pointer">
                  <ConfirmDelete
                    headerTitle="Delete Band"
                    description={`Are you sure you want to delete band ${activeBand.name}`}
                    loader={loader}
                    handleDeleteFn={handleDeleteBand}
                    itemsToDelete={null}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <h1 className="text-3xl font-semibold text-[#000000] mt-6">
          <span>
            <FontAwesomeIcon icon={faNairaSign} />
          </span>
          {metric.tariff}/kwh
        </h1>
      </div>
      <div className="w-full flex justify-end">
        <div
          className={`flex items-center justify-end bg-[#F54CF82B] w-fit rounded-full px-3 py-2 space-x-2`}
        >
          <FontAwesomeIcon icon={faUserGroup} />
          <h1>{metric.total_devices}</h1>
        </div>
      </div>
    </div>
  );

  // handle editing the band
  async function handleEditBand(e) {
    e.preventDefault();
    setLoader(true);
    console.log(metric.id, {
      band_name: bandName,
      tariff: tariff,
    });

    // instantiating a new form instance
    const formData = new FormData();

    // appending the key value pair of the data
    formData.append("name", bandName);
    formData.append("tariff", tariff);

    const { msg, success } = await editBand(metric.id, formData);

    if (success) {
      setLoader(false);
      toast.success(msg);
    }
  }

  // handle delete band
  async function handleDeleteBand() {
    setLoader(true);

    const { msg, success } = await deleteBand(metric.id);

    if (success) {
      setLoader(false);
      toast.success(msg);
    } else {
      setLoader(false);
      toast.success(msg);
    }
  }
};

export default BandCard;
