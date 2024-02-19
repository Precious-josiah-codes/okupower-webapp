import { Checkbox } from "@/components/ui/checkbox";

const InventoryTable = ({ inventories, handleSelectedDeviceFn }) => {
  const meterType = {
    ONE_PHASE: "One Phase",
    THREE_PHASE: "Three Phase",
  };

  return (
    <section>
      <section className="bg-white py-4 rounded-xl text-sm">
        {/* header for desktop */}
        <div className="sm:block hidden px-[52px]">
          <div className="grid grid-cols-4 py-5 font-bold">
            <div className="flex space-x-9">
              <div className="w-3" />

              <h1>Meter NO</h1>
            </div>
            <div>Date Purchased</div>
            <div>Status</div>
            <div>Device Type</div>
          </div>
        </div>

        {/* body */}
        <div className="sm:h-[85vh] h-[65vh] w-[100%] overflow-y-auto sidebar text-[#515151]  px-6">
          {/* header for mobile */}
          <div className="sm:hidden block text-black w-full">
            <div className="flex py-5 pl-6 font-bold w-[50rem]">
              <div>Meter NO</div>
              <div className="flex-1">Address</div>
              <div className="flex-1">Name</div>
              <div className="flex-1">Phone Number</div>
            </div>
          </div>

          {/* body */}
          {inventories?.map((device, index) => (
            <div
              className="grid grid-cols-4 bg-[#cfcfcf42] py-6 mb-3 rounded-[16px] hover:bg-[#0553321e] cursor-pointer text-[#51515] font-normal transition-all w-[50rem] sm:w-full px-6"
              key={index}
            >
              {/* device */}
              <div className="flex items-center space-x-9">
                <Checkbox
                  onCheckedChange={() => handleSelectedDeviceFn(device)}
                />
                <h1>{device?.serial_no}</h1>
              </div>

              {/* date purchased */}
              <div className="font-medium">
                {device?.created_at.split("T")[0]}
              </div>

              {/* status */}
              <div className="capitalize ">{device?.status}</div>

              {/* device type */}
              <div>{meterType[device?.type]}</div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default InventoryTable;
