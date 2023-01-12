/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import Chart from "react-apexcharts";

const PerformanceChart = ({ data }: { data: any }) => {
  const priceChange = data[data.length - 1] - data[0];

  const chartData: any = {
    series: [
      {
        name: "Price",
        data: data,
      },
    ],
    options: {
      colors: [priceChange >= 0 ? "#2FD35D" : "#ea3943"],
      fill: {
        gradient: {
          type: "vertical",
          shadeIntensity: 0.5,
          inverseColors: true,

          stops: [0, 100],
          colorStops:
            priceChange >= 0
              ? [
                  {
                    offset: 0,
                    color: "rgb(110, 220, 181)",
                    opacity: 0.4,
                  },
                  {
                    offset: 100,
                    color: "rgb(110, 220, 181)",
                    opacity: 0,
                  },
                ]
              : [
                  {
                    offset: 0,
                    color: "#ea3943",
                    opacity: 0.4,
                  },
                  {
                    offset: 100,
                    color: "#ea3943",
                    opacity: 0,
                  },
                ],
        },
      },
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        y: {
          format: "",
          formatter: (value: any) => {
            return Number(value).toFixed(1) + "°";
          },
        },
      },
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
    },
  };

  return (
    <StyledContainer down={(priceChange < 0).toString()}>
      <Chart options={chartData.options} series={chartData.series} type="area" height={220} />
    </StyledContainer>
  );
};

export default PerformanceChart;

const StyledContainer = styled.div<{ down: String }>`
  .apexcharts-tooltip {
    color: white;
  }
  .apexcharts-tooltip.apexcharts-theme-light {
    background: ${({ down }) =>
      down === "true" ? "rgba(234, 57, 67, 0.5)" : "rgba(110, 220, 181, 0.5)"};
  }
  .apexcharts-tooltip-title {
    display: none;
  }
  .apexcharts-xaxistooltip {
    display: none;
  }
  .apexcharts-tooltip.apexcharts-theme-light {
    border: none;
  }
  .apexcharts-tooltip-text-y-label {
    display: none;
  }
  .apexcharts-tooltip-marker {
    margin-right: 0;
  }
  .apexcharts-tooltip-text-y-value {
    font-size: 16px;
  }
`;
