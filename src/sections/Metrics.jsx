import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MetricCard from "@/components/custom/MetricCard";

const Metrics = ({ metrics }) => {
  return (
    <section className="flex justify-between space-x-3 mt-6 w-[100%] overflow-x-auto ">
      {/* Total devices */}
      <MetricCard
        icon={<FontAwesomeIcon icon={faUserGroup} />}
        iconBg="bg-[#0F732B78]"
        title="Total Devices"
        value={metrics?.totalDevices}
        statistics={metrics?.devicePercentageIncrease}
        statisticsBg="bg-[#FBB62D52]"
        width="sm:flex-1 sm:min-w-0 min-w-[70%]"
      />

      {/* Faults */}
      <MetricCard
        icon={<FontAwesomeIcon icon={faUserGroup} />}
        iconBg="bg-[#f37fe4c2]"
        title="Faults"
        value={metrics?.totalFaults}
        statistics={metrics?.faultPercentageIncrease}
        statisticsBg="bg-[#CDFDC966]"
        width="sm:flex-1 sm:min-w-0 min-w-[70%]"
      />

      {/* Active Devices */}
      <MetricCard
        icon={<FontAwesomeIcon icon={faUserGroup} />}
        iconBg="bg-[#fbb62da6]"
        title="Active Devices"
        value={metrics?.totalActiveDevices}
        statistics={metrics?.activeDevicesPercentageIncrease}
        statisticsBg="bg-[#CDFDC966]"
        width="sm:flex-1 sm:min-w-0 min-w-[70%]"
      />

      {/* Electricity Consumed */}
      <MetricCard
        icon={<FontAwesomeIcon icon={faUserGroup} />}
        iconBg="bg-[#FBB62D52]"
        title="Electricity Consumed"
        value={metrics?.totalConsumption}
        statistics={metrics?.consumptionPercentageIncrease}
        statisticsBg="bg-[#CDFDC966]"
        width="sm:min-w-0 min-w-[70%] sm:w-[18rem] 2xl:w-[30rem]"
      />
    </section>
  );
};

export default Metrics;
