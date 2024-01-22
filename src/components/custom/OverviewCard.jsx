"use client";

import { useRouter } from "next/navigation";

const OverviewCard = ({ branch }) => {
  const router = useRouter();
  return (
    <div
      className="bg-white hover:bg-[#FBB62D] text-[#515151]  flex-1 px-6 2xl:px-9 py-9 space-y-5 rounded-xl transition-all duration-75 delay-150 cursor-pointer"
      onClick={() => router.push("/branch_details")}
    >
      <div>
        <h1 className="font-bold text-black">{branch?.name}</h1>
      </div>
      <div className="space-y-5 sm:text-sm ">
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
          <h1>{branch?.consumption}</h1>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
