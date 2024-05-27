"use client"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  interface props{
    data:any,
    label:any
  }

const LineChart = ({data,label}:props) => {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
            // display:false
          },
          title: {
            display: true,
            text: 'Uniswap TVL',
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
            fill: true,
            label: 'Last one month',
            data: data,
            borderColor: '#fc72ff',
            backgroundColor: '#fedcfe',
            lineTension: 1
          },
          
        ],
        
      };

    return ( 
        <div className='h-full w-full'>
      {data.length > 0 && (
        <Line options={options} data={datas} />
      )}
        </div>
     );
}
 
export default LineChart;