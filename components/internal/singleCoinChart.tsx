import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  scales,
} from "chart.js";
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SingleCoinChart = ({ historicalData, days,handleDaysClick }) => {
  return (
    <div className="w-full h-full px-4 max-lg:px-0">
      <Line
        data={{
          labels: historicalData?.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              data: historicalData?.map((coin) => coin[1]),
              label: `Price (Past ${days} Days) in USD`,
              borderColor: "#fc72ff",
            },
          ],
        }}
        options={{
            elements:{
                point:{
                    radius:1
                }
            }
        }}
      />
      <div className="border rounded-full p-1 gap-1 inline-flex">
        <div onClick={()=>{handleDaysClick(1)}} className={cn("text-gray-500 px-2 py-1 cursor-pointer rounded-3xl font-bold",days === 1 ? "bg-gray-100 text-black" : "")}>1D</div>
        <div onClick={()=>{handleDaysClick(7)}} className={cn("text-gray-500 px-2 py-1 cursor-pointer rounded-3xl font-bold",days === 7 ? "bg-gray-100 text-black" : "")}>1W</div>
        <div onClick={()=>{handleDaysClick(30)}} className={cn("text-gray-500 px-2 py-1 cursor-pointer rounded-3xl font-bold",days === 30 ? "bg-gray-100 text-black" : "")}>1M</div>
        <div onClick={()=>{handleDaysClick(365)}} className={cn("text-gray-500 px-2 py-1 cursor-pointer rounded-3xl font-bold",days === 365 ? "bg-gray-100 text-black" : "")}>1Y</div>
      </div>
    </div>
  );
};

export default SingleCoinChart;
