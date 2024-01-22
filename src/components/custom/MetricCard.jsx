import { faArrowTurnUp, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MetricCard = ({
  icon,
  iconBg,
  title,
  value,
  statistics,
  statisticsBg,
  width,
}) => {
  return (
    <div className={`bg-white ${width}  p-3 space-y-9 rounded-xl`}>
      {/* icon */}
      <div className={`${iconBg} w-fit p-3 text-white rounded-lg`}>{icon}</div>

      <div>
        <h1 className="text-sm mb-3">{title}</h1>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-semibold">{value}</h1>
          <div
            className={`flex items-center ${statisticsBg} rounded-full p-2 text-[#0F732B] space-x-1`}
          >
            <FontAwesomeIcon
              icon={faArrowTurnUp}
              style={{ transform: "scaleX(-1)" }}
            />
            <h1 className="text-xs font-semibold">{statistics}%</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
