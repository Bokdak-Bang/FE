/* eslint-disable @typescript-eslint/no-unused-vars */
import { Bar } from 'react-chartjs-2';
import styles from './BarChart.module.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import chartDataSets from 'models/chartDataSets.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BarChartProps {
  data: {
    label: string;
    value: number;
  }[];
  selectedSub: string;
  selected: string;
  area: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  selectedSub,
  selected,
  area,
}) => {
  const Bardata = {
    labels: data.map((item) => item.label),

    datasets: [
      {
        label: selectedSub,
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) =>
          item.label === area ? '#3CAFAF' : 'rgba(157, 215, 215, 0.8)',
        ),
        borderColor: 'rgba(157, 215, 215, 1)',
        borderWidth: 0,
        barThickness: 20,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.wrapper}>
      <Bar data={Bardata} options={options} />
    </div>
  );
};

export default BarChart;
