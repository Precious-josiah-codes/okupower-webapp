"use client";

import BarCharts from "@/components/custom/charts/BarChart";
import MeterDetailsLoader from "@/components/custom/lazy loaders/MeterDetailLoader";
import { handleRouteAuthorization } from "@/lib/auth";
import {
  faArrowTrendUp,
  faCircle,
  faNairaSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MeterDetails = () => {
  const [meterDetails, setMeterDetails] = useState(null);
  const params = useParams();

  useEffect(() => {
    handleGetMeterDetails(params.id);
  }, []);
  useEffect(() => {
    console.log(meterDetails, "this is the meter details");
  }, [meterDetails]);
  return (
    <section>
      {/* meter details */}
      <h1 className="py-6 font-extrabold">Meter</h1>
      {/* meter detail skeleton loader */}
      {!meterDetails && <MeterDetailsLoader />}
      {meterDetails && (
        <>
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

          <div className="rounded-xl">
            <h1 className="py-6 font-extrabold">Usage Trend</h1>
            <div className="sm:flex justify-between rounded-xl bg-white p-6 sm:space-x-6 h-fit">
              <div className="sm:flex-1 rounded-xl pt-2 w-[100%] h-fit overflow-x-auto sidebar">
                <BarCharts />
              </div>

              {/* trends */}
              <div className="sm:h-[23.5rem] h-auto sm:w-[17.5rem] w-full space-y-4 overflow-y-auto sidebar mt-9 sm:mt-0">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((trend, index) => (
                  <div
                    className="flex justify-between bg-[#F2F2F2]  sm:w-[16rem] w-full py-6 px-6 rounded-xl "
                    key={index}
                  >
                    <div className="space-y-6">
                      <div className="text-xs">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-[#0F732B]"
                        />{" "}
                        <span className="font-semibold text-[#444444]">
                          October
                        </span>
                      </div>

                      <div className="text-2xl" style={{ fontWeight: "900" }}>
                        <FontAwesomeIcon icon={faNairaSign} />
                        12000
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faArrowTrendUp} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
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
};

export default MeterDetails;
