import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridRows, GridColumns } from '@vx/grid';

const background = '#fff';

const date = (obj) => new Date(obj.dt_txt).getHours();

const Chart = ({ data, width, height, margin }) => {
  if (width < 10) return null;
  const timeScale = scaleTime({
    domain: [Math.min(...data.map((d) => date(d))), Math.max(...data.map((d) => date(d)))],
  });
  const temperatureScale = scaleLinear({
    domain: [
      Math.min(...data.map(d => Math.min(d.main.temp_min))),
      Math.max(...data.map(d => Math.max(d.main.temp_max))),
    ],
    nice: true,
  });

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  timeScale.range([0, xMax]);
  temperatureScale.range([yMax, 0]);
  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <Group left={margin.left} top={margin.top}>
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
          <GridRows scale={temperatureScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <GridColumns scale={timeScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <AxisBottom top={yMax} scale={timeScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft scale={temperatureScale} />
          <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
            Temperature (°C)
          </text>
          <LinePath
            data={data.map((d) => ({y: d.main.temp, x: date(d)}))}
            curve={curveBasis}
            x={d => timeScale(d.x)}
            y={d => temperatureScale(d.y)}
            stroke="blue"
            strokeWidth={2}
          />
        </Group>
      </svg>
    </div>
  );
}

Chart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.object,
};

Chart.defaultProps = {
  data: [],
  width: 300,
  height: 400,
  margin: { top: 40, right: 30, bottom: 50, left: 40 },
};

export default Chart;
