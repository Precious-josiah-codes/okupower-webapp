import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MetricCard from "@/components/custom/MetricCard";
import {
  AlertTriangle,
  PlugZap,
  ServerCrash,
  SmartphoneCharging,
  UtilityPole,
  Zap,
} from "lucide-react";

const Metrics = ({ metrics }) => {
  console.log(metrics, "halo james");
  return (
    <section className="flex justify-between space-x-3 mt-6 w-[100%] overflow-x-auto ">
      {/* Total devices */}
      <MetricCard
        icon={<SmartphoneCharging className="w-5 h-5" />}
        iconBg="bg-[#2cc75878]"
        title="Total Devices"
        value={metrics?.totalDevices}
        statistics={metrics?.devicePercentageIncrease}
        statisticsBg="bg-[#CDFDC966]"
        arrowDirection={metrics?.deviceArrowDirection}
      />

      {/* Faults */}
      <MetricCard
        icon={<AlertTriangle className="w-5 h-5" />}
        iconBg="bg-[#f5626285]"
        title="Faults"
        value={metrics?.totalFaults}
        statistics={metrics?.faultPercentageIncrease}
        statisticsBg="bg-[#CDFDC966]"
        arrowDirection={metrics?.faultArrowDirection}
      />

      {/* Active Devices */}
      <MetricCard
        icon={<PlugZap className="w-5 h-5" />}
        iconBg="bg-[#2cc75878]"
        title="Active Devices"
        value={metrics?.totalActiveDevices}
        statistics={metrics?.activeDevicesPercentageIncrease}
        statisticsBg="bg-[#CDFDC966]"
        arrowDirection={metrics?.activeDeviceArrowDirection}
      />

      {/* Electricity Consumed */}
      <MetricCard
        icon={<Zap className="w-5 h-5" />}
        iconBg="bg-[#fbb62d75]"
        title="Electricity Consumed"
        value={metrics?.totalConsumption}
        statistics={metrics?.consumptionPercentageIncrease}
        statisticsBg="bg-[#CDFDC966]"
        arrowDirection={metrics?.consumptionArrowDirection}
      />
    </section>
  );
};

export default Metrics;
