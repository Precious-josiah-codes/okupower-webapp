import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GiveBonusModal from "./GiveBonusModal";
import ConfirmDelete from "./ConfirmDelete";

const BandCategoryBody = ({ band }) => {
  console.log(band, "na the band");
  return (
    <div className="space-y-6 bg-white w-full sm:flex-1 px-4 h-[11rem] flex flex-col justify-center">
      {/* username and select box */}
      <div className="flex justify-start items-start space-x-6 ">
        <Popover>
          <PopoverTrigger>
            <div>
              <input type="checkbox" id="user" className="w-4 h-4" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="px-0 w-[11.5rem] text-sm">
            <ul>
              <li className="hover:bg-nurseryColor py-3 px-6 cursor-pointer">
                <GiveBonusModal />
              </li>
              <li className="hover:bg-nurseryColor py-3 px-6 cursor-pointer">
                <ConfirmDelete
                  headerTitle="Delete Devices"
                  description="Are you sure you want to delete device"
                />
              </li>
              <li className="hover:bg-nurseryColor py-3 px-6 cursor-pointer">
                Change Band
              </li>
            </ul>
          </PopoverContent>
        </Popover>
        <label for="user" className="space-y-2">
          <h1 className="font-semibold capitalize">{band?.username}</h1>
          <h2>#{band?.meter_no}</h2>
        </label>
      </div>

      {/* user phone number */}
      <div className="flex items-start justify-start space-x-6">
        <div className="w-4 h-4 text-primaryColor">
          <FontAwesomeIcon icon={faAddressCard} />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold">{band?.address}</h1>
          <h2>{band?.phone_no}</h2>
        </div>
      </div>
    </div>
  );
};

export default BandCategoryBody;
