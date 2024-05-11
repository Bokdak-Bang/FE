/* eslint-disable @typescript-eslint/no-unused-vars */
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
import useAreaStore from 'context/useDetailStroe';

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
  const { areaData } = useAreaStore();

  const scores = areaData
    ? areaData.areaBoardScoreResponse.map((score) => score.score)
    : [0, 0, 0, 0, 0, 0, 0];
  const dataOrder = [
    '자연',
    '주택',
    '지역인구',
    '안전',
    '생활편의교통',
    '교육',
    '복지문화',
  ];

  const categoryMap: { [key: string]: string } = {
    자연: 'nature',
    주택: 'residence',
    지역인구: 'population',
    안전: 'security',
    생활편의교통: 'life',
    교육: 'education',
    복지문화: 'welfare',
  };

  const orderedData = dataOrder.map((label) => {
    const category = categoryMap[label];
    const foundScore = areaData?.areaBoardScoreResponse.find(
      (score) => score.categoryName === category,
    );
    //버그
    return foundScore ? foundScore.score : 50;
  });

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
    labels: dataOrder,
    datasets: [
      {
        label: '구별 지표',
        data: orderedData,
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

  const getOrderedData = () => {
    return dataOrder.map((label) => {
      const category = categoryMap[label];
      const foundScore = areaData?.areaBoardScoreResponse.find(
        (score) => score.categoryName === category,
      );
      return foundScore ? foundScore.score : 50;
    });
  };

  useEffect(() => {
    if (chartRef.current && areaData) {
      const chartInstance = chartRef.current;
      chartInstance.data.datasets[0].data = getOrderedData();
      chartInstance.update();

      // Label positions update
      const centerPoint = {
        x:
          (chartInstance.chartArea.left + chartInstance.chartArea.right) / 2 -
          25,
        y:
          (chartInstance.chartArea.top + chartInstance.chartArea.bottom) / 2 -
          55,
      };
      const radialScale = chartInstance.scales.r as RadialLinearScale;
      const maxRadius = radialScale.max + 110;
      const dataValues = chartInstance.data.datasets[0].data;
      const labelCount = chartInstance.data.labels?.length ?? 0;
      const newLabelPositions = (chartInstance.data.labels ?? []).map(
        (label, index) => {
          const angle = (2 * Math.PI * index) / labelCount - Math.PI / 2;
          const x = centerPoint.x + maxRadius * Math.cos(angle);
          const y = centerPoint.y + maxRadius * Math.sin(angle);
          return {
            x,
            y,
            label,
            score: dataValues[index],
            icon: [
              Nature,
              House,
              Population,
              Safety,
              Traffic,
              Education,
              Welfare,
            ][index],
          };
        },
      );
      setLabelPositions(newLabelPositions);
    }
  }, [areaData, chartRef]);

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
