import { faArrowTurnUp, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleSlash, CornerLeftDown, CornerLeftUp } from "lucide-react";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/framerVariants";

const MetricCard = ({
  icon,
  iconBg,
  title,
  value,
  statistics,
  statisticsBg,
  arrowDirection,
}) => {
  console.log(arrowDirection, "hams");
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="bg-white sm:flex-1 sm:min-w-0 min-w-[70%] p-3 space-y-9 rounded-xl"
    >
      {/* icon */}
      <div className={`${iconBg} w-fit p-3 text-white rounded-lg`}>{icon}</div>

      <div>
        <h1 className="text-sm mb-3">{title}</h1>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-semibold">{value}</h1>
          <div
            className={`flex items-center ${statisticsBg} rounded-full p-2 text-[#0F732B] space-x-1`}
          >
            {arrowDirection === "NONE" ? (
              <CircleSlash className="w-5 h-5" />
            ) : arrowDirection === "UP" ? (
              <CornerLeftUp className="w-5 h-5" />
            ) : (
              <CornerLeftDown className="w-5 h-5" />
            )}
            <h1 className="text-xs font-semibold truncate">
              {statistics?.toFixed(2)}%
            </h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
