import BarCharts from "@/components/custom/charts/BarChart";
import {
  faArrowTrendUp,
  faCircle,
  faNairaSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Device_Details = () => {
  return (
    <section>
      {/* device details */}
      <div>
        <h1 className="py-6 font-extrabold">Device</h1>

        <section className="flex justify-between  bg-white p-6 rounded-xl">
          {/* device columns header */}
          <div className="space-y-6 font-semibold">
            <h1>Name</h1>
            <h1>ID Number</h1>
            <h1>Meter Type</h1>
            <h1>Status</h1>
            <h1>Location</h1>
            <h1>Current Billing</h1>
            <h1>Tariff Plan</h1>
          </div>

          {/* device body values */}
          <div className="space-y-6">
            <h1>joy austine</h1>
            <h1>#4509812</h1>
            <h1>3 phase</h1>
            <h1>active</h1>
            <h1>woji</h1>
            <h1>02/10/23 - 02/11/23</h1>
            <h1>2000kwh</h1>
          </div>
        </section>
      </div>

      {/* usage trend */}
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
    </section>
  );
};

export default Device_Details;
