import { handleRouteAuthorization } from "@/lib/auth";
import axios from "axios";
import { create } from "zustand";

export const useMetricStore = create((set, get) => ({
  branchesMetric: null,
}));

export const getBranchesMetric = async () => {
  const { headers, accounts } = await handleRouteAuthorization();

  try {
    // making the request
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/discos/overview/?account=${accounts[0]["id"]}`,
      {
        headers: headers,
      }
    );

    if (response.status === 200) {
      console.log(response, "resp");
      useMetricStore.setState({
        branchesMetric: {
          totalDevices: response.data.total_devices,
          devicePercentageIncrease: response.data.device_percentage_increase,
          totalFaults: response.data.total_faults,
          faultPercentageIncrease: response.data.fault_percentage_increase,
          totalActiveDevices: response.data.total_active_devices,
          activeDevicesPercentageIncrease:
            response.data.active_devices_percentage_increase,
          totalConsumption: response.data.total_consumption,
          consumptionPercentageIncrease:
            response.data.consumption_percentage_increase,
          deviceArrowDirection: response.data.device_arrow_direction,
        },
      });
      return true;
    }
  } catch (error) {
    console.error(error, "error");
  }
};
