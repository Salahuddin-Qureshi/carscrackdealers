import React from 'react';
import '../styles/SimpleChart.css';

const SimpleChart = ({ data, type = 'bar', title, height = 200 }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  const renderBarChart = () => (
    <div className="chart-container">
      <div className="chart-bars">
        {data.map((item, index) => (
          <div key={index} className="chart-bar-container">
            <div 
              className="chart-bar"
              style={{ 
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || '#d01818'
              }}
              title={`${item.label}: ${item.value}`}
            />
            <div className="chart-label">{item.label}</div>
            <div className="chart-value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLineChart = () => (
    <div className="chart-container">
      <svg className="line-chart" viewBox="0 0 300 200">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d01818" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#d01818" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y, index) => (
          <line
            key={index}
            x1="40"
            y1={40 + (y / 100) * 120}
            x2="280"
            y2={40 + (y / 100) * 120}
            stroke="#e0e0e0"
            strokeWidth="1"
          />
        ))}
        
        {/* Data line */}
        <polyline
          fill="none"
          stroke="#d01818"
          strokeWidth="3"
          points={data.map((item, index) => 
            `${40 + (index * 240) / (data.length - 1)},${160 - (item.value / maxValue) * 120}`
          ).join(' ')}
        />
        
        {/* Area fill */}
        <polygon
          fill="url(#lineGradient)"
          points={`40,160 ${data.map((item, index) => 
            `${40 + (index * 240) / (data.length - 1)},${160 - (item.value / maxValue) * 120}`
          ).join(' ')} 280,160`}
        />
        
        {/* Data points */}
        {data.map((item, index) => (
          <circle
            key={index}
            cx={40 + (index * 240) / (data.length - 1)}
            cy={160 - (item.value / maxValue) * 120}
            r="4"
            fill="#d01818"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}
        
        {/* Labels */}
        {data.map((item, index) => (
          <text
            key={index}
            x={40 + (index * 240) / (data.length - 1)}
            y="190"
            textAnchor="middle"
            fontSize="10"
            fill="#666"
          >
            {item.label}
          </text>
        ))}
      </svg>
    </div>
  );

  const renderPieChart = () => {
    let cumulativePercentage = 0;
    const radius = 60;
    const centerX = 150;
    const centerY = 100;

    return (
      <div className="chart-container">
        <svg className="pie-chart" viewBox="0 0 300 200">
          {data.map((item, index) => {
            const percentage = (item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100;
            const startAngle = (cumulativePercentage / 100) * 360;
            const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
            
            const startAngleRad = (startAngle - 90) * (Math.PI / 180);
            const endAngleRad = (endAngle - 90) * (Math.PI / 180);
            
            const x1 = centerX + radius * Math.cos(startAngleRad);
            const y1 = centerY + radius * Math.sin(startAngleRad);
            const x2 = centerX + radius * Math.cos(endAngleRad);
            const y2 = centerY + radius * Math.sin(endAngleRad);
            
            const largeArcFlag = percentage > 50 ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            cumulativePercentage += percentage;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color || `hsl(${index * 60}, 70%, 50%)`}
                stroke="#fff"
                strokeWidth="2"
              />
            );
          })}
          
          {/* Legend */}
          {data.map((item, index) => (
            <g key={index}>
              <rect
                x="200"
                y={20 + index * 20}
                width="12"
                height="12"
                fill={item.color || `hsl(${index * 60}, 70%, 50%)`}
              />
              <text
                x="220"
                y={30 + index * 20}
                fontSize="12"
                fill="#333"
              >
                {item.label} ({item.value})
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'pie':
        return renderPieChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <div className="simple-chart" style={{ height: `${height}px` }}>
      {title && <h4 className="chart-title">{title}</h4>}
      {renderChart()}
    </div>
  );
};

export default SimpleChart;
