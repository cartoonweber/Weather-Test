import React from "react";
import moment from "moment";

import { weatherbitIcons } from "../helpers/getIcon";

const DailyInfoCard = ({ data, isCelcius }: any) => {
  const day: any = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT",
  };

  return <div className="forecast"></div>;
};

export default DailyInfoCard;
