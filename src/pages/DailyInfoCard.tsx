import React from "react";
import moment from "moment";
import styled from "styled-components";

const DailyInfoCard = ({ data, isCelcius, index, setIndex }: any) => {
  const day: any = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sats",
  };

  return (
    <div className="flex justify-between w-full max-w-[800px]">
      {data.map((data: any, index: any) => {
        const dayCode = moment(data.date).day();
        return (
          index !== 0 && (
            <StyledItem
              className="flex items-center flex-col cursor-pointer transition"
              key={data.ts}
              onClick={() => setIndex(index)}
            >
              <h5 className="forecast-date">{day[dayCode]}</h5>
              <img src={data.day.condition.icon} alt={""} />
              {/* <img src={"/climate.webp"} alt={""} /> */}
              <h2 className="forecast-temp">
                {isCelcius ? data.day.avgtemp_c : Math.round(data.day.avgtemp_c * (9 / 5) + 32)}
                <span>°</span>
              </h2>
            </StyledItem>
          )
        );
      })}
    </div>
  );
};

const StyledItem = styled.div`
  padding: 5px 20px;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media screen and (max-width: 450px) {
    padding: 5px 10px;
    font-size: 12px;
  }
`;

export default DailyInfoCard;
