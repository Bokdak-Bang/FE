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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = () => {
  const data = {
    labels: ['양천구', '서초구', '종로구', '강서구', '서대문구', '강남구'],
    datasets: [
      {
        label: '미세먼지 농도',
        data: [37, 28, 22, 23, 19, 12],
        backgroundColor: 'rgba(157, 215, 215, 0.8)',
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
        ticks: {
          stepSize: 10,
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
