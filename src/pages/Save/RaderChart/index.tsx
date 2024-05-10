import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface AreaScore {
  categoryName: string;
  score: number;
}

interface RadarChartProps {
  areaData: AreaScore[];
}

const chartOptions = {
  aspectRatio: 1.7,
  elements: {
    line: {
      borderWidth: 2,
    },
  },
  scales: {
    r: {
      angleLines: {
        display: true,
      },
      ticks: {
        stepSize: 20,
        suggestedMin: 0,
        min: 0,
        max: 100,
        display: false,
      },
      grid: {
        circular: true,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  animation: {
    duration: 0,
  },
};

const RadarChart = ({ areaData }: RadarChartProps) => {
  console.log('areaData:', areaData);
  const categories = [
    '자연',
    '주택',
    '지역인구',
    '안전',
    '생활편의교통',
    '교육',
    '복지문화',
  ];
  const categoryMap: { [key: string]: string } = {
    nature: '자연',
    residence: '주택',
    population: '지역인구',
    security: '안전',
    life: '생활편의교통',
    education: '교육',
    welfare: '복지문화',
  };

  // 카테고리 순서대로 점수를 매핑
  const scores = categories.map((category) =>
    category === '지역인구'
      ? 50
      : areaData.find((data) => categoryMap[data.categoryName] === category)
          ?.score || 0,
  );

  console.log('Mapped scores:', scores);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Scores',
        data: scores,
        backgroundColor: 'rgba(157, 215, 215, 0.8)',
        borderColor: '#0B9B9B',
        borderWidth: 1,
      },
    ],
  };

  return <Radar data={chartData} options={chartOptions} />;
};

export default RadarChart;
