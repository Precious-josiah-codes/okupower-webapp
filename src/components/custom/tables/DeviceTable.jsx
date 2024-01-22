const DeviceTable = ({ handleDeviceDetails, devices }) => {
  return (
    <section>
      <section className="bg-white py-4 rounded-xl text-sm">
        {/* header for desktop */}
        <div className="px-6 sm:block hidden">
          <div className="flex py-5 pl-6 font-bold">
            <div className="flex-1">Meter ID</div>
            <div className="flex-1">Band Name</div>
            <div className="flex-1">Branch Name</div>
            <div className="flex-1">Consumption</div>
            <div className="flex-1">Status</div>
          </div>
        </div>
        {/* body */}
        <div className="sm:h-[85vh] h-[65vh] w-[100%] overflow-y-auto sidebar text-[#515151]  px-6">
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
          {devices?.map((device, index) => (
            <div
              className="flex bg-[#cfcfcf42] py-6 pl-6 mb-3 rounded-[16px] hover:bg-[#0553321e] cursor-pointer text-[#51515] font-normal transition-all w-[50rem] sm:w-full"
              key={index}
              onClick={() => handleDeviceDetails()}
            >
              {/* device */}
              <div className="flex-1">#{device.serial_no}</div>

              {/* band name */}
              <div className="flex-1">
                <span className="font-medium">{device.serial_no}</span>
              </div>

              {/* branch name */}
              <div className="flex-1">{device.branch_name}</div>

              {/* consumption */}
              <div className="flex-1">{device.band_name}</div>

              {/* status */}
              <div className="flex-1">
                <span
                  className={`text-sm rounded-full text-white px-3 py-1 ${
                    true ? "bg-[#0F732B]" : "bg-[#BF1D1D]"
                  }`}
                >
                  {device.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default DeviceTable;
