"use client"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  interface props{
    data:any,
    label:any
  }

const BarChart = ({data,label}:props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Uniswap Volume',
      },
    },
    scales: {
        x: {
          display: false, // Hide x-axis label
        },
        y: {
          display: false, // Hide y-axis label
        }
      }
  };
  
  
  const datas = {
    labels:label,
    datasets: [
      {
        label: 'Last one month',
        data: data,
        backgroundColor: '#fc72ff',
      },
    ],
  };
  
    return ( 
        <div className='h-full w-full'>
            <Bar options={options} data={datas} />
        </div>
     );
}
 
export default BarChart;