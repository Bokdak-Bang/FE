import React, { useRef, useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import styles from './RaderChart.module.scss';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Chart,
} from 'chart.js';
import ChartLabel from './ChartLabel';
import {
  Nature,
  House,
  Population,
  Safety,
  Traffic,
  Education,
  Welfare,
} from 'assets';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface LabelPosition {
  x: number;
  y: number;
  label: string;
  score: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface RadarChartProps {
  setSelected: (selected: string) => void;
  selected: string;
}

const RadarChart = ({ setSelected, selected }: RadarChartProps) => {
  const chartRef = useRef<Chart<'radar', number[], string> | null>(null);
  const [labelPositions, setLabelPositions] = useState<LabelPosition[]>([]);

  const icons = [
    Nature,
    House,
    Population,
    Safety,
    Traffic,
    Education,
    Welfare,
  ];

  const chartData = {
    labels: [
      '자연',
      '주택',
      '지역인구',
      '안전',
      '생활편의교통',
      '교육',
      '복지문화',
    ],
    datasets: [
      {
        label: '구별 지표',
        data: [0, 10, 40, 60, 100, 50, 70],
        backgroundColor: 'rgba(157, 215, 215, 0.8)',
        borderColor: '#0B9B9B',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
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
          stepSize: 10,
          suggestedMin: 0,
          min: 0,
          max: 100,
          display: false,
        },
        grid: {
          circular: true,
        },
        pointLabels: {
          display: false,
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

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;
      const centerPoint = {
        x:
          (chartInstance.chartArea.left + chartInstance.chartArea.right) / 2 -
          25,
        y:
          (chartInstance.chartArea.top + chartInstance.chartArea.bottom) / 2 -
          55,
      };
      const radialScale = chartInstance.scales.r as RadialLinearScale;
      const maxRadius = radialScale.max + 95;
      const dataValues = chartInstance.data.datasets[0].data;

      if (chartInstance.data && chartInstance.data.labels) {
        const labelCount = chartInstance.data.labels.length;

        const newLabelPositions = chartInstance.data.labels.map(
          (label, index) => {
            const angle = (2 * Math.PI * index) / labelCount - Math.PI / 2;
            const x = centerPoint.x + maxRadius * Math.cos(angle);
            const y = centerPoint.y + maxRadius * Math.sin(angle);
            const score = dataValues[index];

            return {
              x: x,
              y: y,
              label: label,
              score: score,
              icon: icons[index],
            };
          },
        );

        setLabelPositions(newLabelPositions);
      }
    }
  }, [chartRef]);

  return (
    <div className={styles.wrapper}>
      <Radar ref={chartRef} data={chartData} options={chartOptions} />
      {labelPositions.map((pos, index) => (
        <ChartLabel
          key={index}
          icon={pos.icon}
          label={pos.label}
          score={pos.score}
          style={{
            position: 'absolute',
            left: `${pos.x - 20}px`,
            top: `${pos.y - 10}px`,
            cursor: 'pointer',
          }}
          onClick={() => setSelected(pos.label)}
          selected={selected}
        />
      ))}
    </div>
  );
};

export default RadarChart;
