"use client";

import BarCharts from "@/components/custom/charts/BarChart";
import BarchartLoader from "@/components/custom/lazy loaders/BarchartLoader";
import MeterDetailsLoader from "@/components/custom/lazy loaders/MeterDetailLoader";
import PaymentHistoryLoader from "@/components/custom/lazy loaders/PaymentHistoryLoader";
import { handleRouteAuthorization } from "@/lib/auth";
import {
  faArrowTrendUp,
  faCircle,
  faNairaSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { MoveRight, TrendingDown, TrendingUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MeterDetails = () => {
  const [meterDetails, setMeterDetails] = useState(null);
  const [consumptionHistory, setConsumptionHistory] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState(null);
  const [consumptionHistoryLoader, setConsumtptionHistoryLoader] =
    useState(false);
  const [paymentHistoryLoader, setPaymentHistoryLoader] = useState(false);
  const params = useParams();

  const consumptionData = [
    {
      month: "January",
      load: 1537.6000000000004,
    },
    {
      month: "February",
      load: 127.6004,
    },
    {
      month: "March",
      load: 400,
    },
    {
      month: "April",
      load: 107.6004,
    },
    {
      month: "May",
      load: 111.6004,
    },
    {
      month: "June",
      load: 500.4398,
    },
    {
      month: "July",
      load: 679.0000004,
    },
    {
      month: "August",
      load: 927.6004,
    },
    {
      month: "September",
      load: 779.0000004,
    },
    {
      month: "October",
      load: 479.0000004,
    },
    {
      month: "November",
      load: 179.6000000000004,
    },
    {
      month: "December",
      load: 200,
    },
  ];

  const paymentData = [
    {
      consumptionMonth: "Jan",
      value: 38407,
      trend: "normal",
    },
    {
      consumptionMonth: "Feb",
      value: 20000,
      trend: "down",
    },
    {
      consumptionMonth: "Mar",
      value: 30000,
      trend: "up",
    },
    {
      consumptionMonth: "Apr",
      value: 30000,
      trend: "normal",
    },
    {
      consumptionMonth: "May",
      value: 10000,
      trend: "down",
    },
    {
      consumptionMonth: "Jun",
      value: 10000,
      trend: "normal",
    },
    {
      consumptionMonth: "Jul",
      value: 100000,
      trend: "up",
    },
    {
      consumptionMonth: "Aug",
      value: 150000,
      trend: "up",
    },
    {
      consumptionMonth: "Sep",
      value: 100000,
      trend: "down",
    },
    {
      consumptionMonth: "Oct",
      value: 120000,
      trend: "up",
    },
    {
      consumptionMonth: "Nov",
      value: 130000,
      trend: "up",
    },
    {
      consumptionMonth: "Dec",
      value: 500000,
      trend: "up",
    },
  ];

  useEffect(() => {
    handleGetMeterDetails(params.id);
    handleGetMeterConsumptionHistory(params.id);
    handleGetMeterPaymentHistory(params.id);
  }, []);

  useEffect(() => {
    console.log(meterDetails, "this is the meter details");
  }, [meterDetails]);

  return (
    <section className="pb-[3rem]">
      {/* meter details */}
      <h1 className="py-6 font-extrabold">Meter</h1>
      {/* meter detail skeleton loader */}
      {!meterDetails && <MeterDetailsLoader />}
      <>
        {meterDetails && (
          // meter details
          <div>
            <section className="flex justify-between  bg-white p-6 rounded-xl">
              {/* device columns header */}
              <div className="space-y-6 font-semibold">
                <h1 className="h-6">Name</h1>
                <h1 className="h-6">Address</h1>
                <h1 className="h-6">Email</h1>
                <h1 className="h-6">Phone Number</h1>
                <h1 className="h-6">Branch Name</h1>
                <h1 className="h-6">Band Name</h1>
                <h1 className="h-6">Meter Number</h1>
                <h1 className="h-6">Meter Type</h1>
                <h1 className="h-6">Status</h1>
                {meterDetails?.on_bonus && <h1 className="h-6">Bonus</h1>}
              </div>

              {/* device body values */}
              <div className="space-y-6">
                <h1 className="h-6">{meterDetails?.user_name}</h1>
                <h1 className="h-6">{meterDetails?.user_address}</h1>
                <h1 className="h-6">{meterDetails?.user_email}</h1>
                <h1 className="h-6">{meterDetails?.user_phone_no}</h1>
                <h1 className="h-6">{meterDetails?.branch_name}</h1>
                <h1 className="h-6">{meterDetails?.band_name}</h1>
                <h1 className="h-6">{meterDetails?.meter_no}</h1>
                <h1 className="h-6">{meterDetails?.type}</h1>
                <h1 className="h-6">{meterDetails?.status}</h1>
                {meterDetails?.on_bonus && (
                  <h1 className="h-6">{meterDetails?.bonus}</h1>
                )}
              </div>
            </section>
          </div>
        )}

        {/* usage trends */}
        <div>
          <h1 className="py-6 font-extrabold">Usage Trend</h1>

          <div className="grid grid-cols-5 gap-x-6 h-[65vh] ">
            {/* consumption history */}
            <div className="col-span-3  h-fit">
              {!consumptionHistory ? (
                <BarchartLoader />
              ) : (
                <div className="w-full overflow-x-auto sidebar bg-white rounded-xl pt-6">
                  <BarCharts data={consumptionData} />
                </div>
              )}
            </div>

            {/* payment history */}
            <div className="col-span-2  h-[65vh]">
              {!paymentHistory ? (
                <div className=" space-y-6">
                  <PaymentHistoryLoader />
                  <PaymentHistoryLoader />
                </div>
              ) : (
                <div className=" sm:h-full h-auto space-y-4 overflow-y-auto sidebar mt-9 sm:mt-0 pr-3">
                  {paymentData.map(
                    ({ consumptionMonth: month, value, trend }, index) => (
                      <div
                        className="flex justify-between bg-white py-6 px-6 rounded-xl "
                        key={index}
                      >
                        <div className="space-y-6">
                          <div className="text-xs">
                            <FontAwesomeIcon
                              icon={faCircle}
                              className="text-[#0F732B]"
                            />{" "}
                            <span className="font-semibold text-[#444444]">
                              {month}
                            </span>
                          </div>

                          <div
                            className="text-2xl"
                            style={{ fontWeight: "900" }}
                          >
                            <FontAwesomeIcon icon={faNairaSign} />
                            {value}
                          </div>
                        </div>
                        <div>
                          {trend === "normal" ? (
                            <MoveRight className="w-5 h-5" />
                          ) : trend === "up" ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </section>
  );

  async function handleGetMeterDetails(id) {
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/manage/devices/${id}/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
        }
      );

      console.log(data, status, "the devices");
      if (status === 200) {
        setMeterDetails(data);
        console.log(data, "the meters");

        //  return { msg: data.results, success: true };
      }
    } catch (error) {
      console.log(error, "this is the error");
      //  return { msg: "error.response.data.detail", success: false };
    }
  }

  // handle the consumption history of the meter
  async function handleGetMeterConsumptionHistory(id) {
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/manage/devices/${id}/consumption_history/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
        }
      );

      console.log(data, status, "the consumption history");
      if (status === 200) {
        setConsumptionHistory(data);
        console.log(data, "the consumption history");

        //  return { msg: data.results, success: true };
      }
    } catch (error) {
      console.log(error, "this is the error");
      //  return { msg: "error.response.data.detail", success: false };
    }
  }

  // handle the payment history of the meter
  async function handleGetMeterPaymentHistory(id) {
    try {
      const { headers, accounts } = await handleRouteAuthorization();

      // make request
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/manage/devices/${id}/payment_history/?account=${accounts[0]["id"]}`,
        {
          headers: headers,
        }
      );

      console.log(data, status, "the payment history");
      if (status === 200) {
        const month = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const result = data.map((value, index) => {
          const previousValue = index > 0 ? data[index - 1] : null;
          const consumptionMonth = month[index];
          // const nextValue = index < month.length - 1 ? month[index + 1] : null;

          const trend =
            previousValue === null || value === previousValue
              ? "normal"
              : value < previousValue
              ? "down"
              : "up";
          return { consumptionMonth, value, trend };
        });
        setPaymentHistory(result);
        console.log(result, "the payment history");

        //  return { msg: data.results, success: true };
      }
    } catch (error) {
      console.log(error, "this is the error");
      //  return { msg: "error.response.data.detail", success: false };
    }
  }
};

export default MeterDetails;
