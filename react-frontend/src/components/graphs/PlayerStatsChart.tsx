import React, { useState } from 'react';


const SIZE = 200;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 30;
const SIDES = 6;


interface ChartProps {
  labels: string[];
  data: number[];
}

interface ActiveSlice {
  value: number;
  x: number;
  y: number;
}

const PlayerStatsSVGChart: React.FC<ChartProps> = ({ labels, data }) => {
  const [activeSlice, setActiveSlice] = useState<ActiveSlice | null>(null);

  const toXY = (angle: number, distance: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: CENTER + distance * Math.cos(rad),
      y: CENTER + distance * Math.sin(rad),
    };
  };

  const visualLayout = [
    { label: 'Criação', rotation: 30 }, { label: 'Aéreo', rotation: 91 },
    { label: 'Defensivo', rotation: -30 }, { label: 'Gols', rotation: 30 },
    { label: 'Chutes', rotation: -91 }, { label: 'Toques', rotation: -30 },
  ];

  const orderedData = visualLayout.map(layoutItem => {
    const dataIndex = labels.indexOf(layoutItem.label);
    return dataIndex !== -1 ? data[dataIndex] : 0;
  });



  const Grid = () => {
    const hexagonVertices = Array.from({ length: SIDES }).map((_, i) =>
      toXY(-90 + (360 / SIDES) * i, RADIUS)
    );
    const mainHexagonPath = hexagonVertices.map(p => `${p.x},${p.y}`).join(' ');

    return (
      <g id="grid">
        {hexagonVertices.map((point, index) => (
          <line key={index} x1={CENTER} y1={CENTER} x2={point.x} y2={point.y} stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" />
        ))}
        <polygon points={mainHexagonPath} fill="none" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" />
      </g>
    );
  };

  const DataSlices = () => {
    const sliceWidthAngle = 30;

    return (
      <g id="data-slices">
        {orderedData.map((value, i) => {
          const mainAngle = -60 + (360 / SIDES) * i;
          const distance = (value / 100) * RADIUS;

          const centerPoint = `${CENTER},${CENTER}`;
          const leftPoint = toXY(mainAngle - sliceWidthAngle, distance);
          const rightPoint = toXY(mainAngle + sliceWidthAngle, distance);
          
          const pathData = `M ${centerPoint} L ${leftPoint.x},${leftPoint.y} L ${rightPoint.x},${rightPoint.y} Z`;
          
          const tooltipPosition = toXY(mainAngle, distance * 0.7);

         
          const minOpacity = 0.3;
          const maxOpacity = 0.9; 
          const opacity = minOpacity + (value / 100) * (maxOpacity - minOpacity);
          const fillColor = `rgba(234, 88, 12, ${opacity.toFixed(2)})`;
         

          return (
            <path
              key={i}
              d={pathData}
              fill={fillColor}
              onMouseEnter={() => setActiveSlice({ value, x: tooltipPosition.x, y: tooltipPosition.y })}
              onMouseLeave={() => setActiveSlice(null)}
              style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
             
              className="hover:fill-orange-400"
            />
          );
        })}
      </g>
    );
  };

  const Labels = () => (
    <g id="labels">
      {visualLayout.map((item, i) => {
        const positionAngle = -60 + (360 / SIDES) * i;
        const point = toXY(positionAngle, RADIUS + 15);
        return (
          <text
            key={item.label}
            x={point.x}
            y={point.y}
            fill="#CABDB3"
            fontSize="16"
            fontWeight="normal"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${item.rotation} ${point.x} ${point.y})`}
          >
            {item.label}
          </text>
        );
      })}
    </g>
  );
  
  const Tooltip = () => {
    if (!activeSlice) return null;
    return (
      <text
        x={activeSlice.x}
        y={activeSlice.y}
        fill="#CABDB3"
        fontSize="18"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ pointerEvents: 'none' }}
      >
        {`${activeSlice.value}%`}
      </text>
    );
  };

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} xmlns="http://www.w3.org/2000/svg">
      <Grid />
      <DataSlices />
      <Labels />
      <Tooltip />
    </svg>
  );
};

export default PlayerStatsSVGChart;