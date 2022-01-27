import 'chart.js/auto';
// import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import { Card, CardBody, Tooltip } from 'reactstrap';
import { useState } from 'react';
// import { useAxios } from '../../hooks/useAxios';

// components Charts
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import DouChart from '../../components/charts/DouChart';
import PieChart from '../../components/charts/PieChart';
import RadarChart from '../../components/charts/RadarChart';

function Graph({ data, type, title, description }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // const [response, error, loading] = useAxios(
  //   '/charts/branches-profit?branch_id=2&months=3&cashflow=true',
  // );

  // console.log(response);
  /*
  if (type === 'line') {
    const dataLine = {
      labels: [
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Profits',
          fill: true,
          lineTension: 0.5,
          backgroundColor: 'rgba(19, 233, 158, 0.2)',
          borderColor: '#13e99e',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#13e99e',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#13e99e',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [
            45954, 12696.96, 6824.8, 25907.04, 60165.76, 53000.84, 6205.28, 21656, 18278, 57978,
          ],
        },
        {
          label: 'Sales',
          fill: true,
          lineTension: 0.5,
          backgroundColor: 'rgba(85, 110, 230, 0.2)',
          borderColor: '#556ee6',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#556ee6',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#556ee6',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [45954, 39711, 50875, 67152, 29174, 50722, 72860, 21656, 18278, 57978],
        },
        {
          label: 'Investment',
          fill: true,
          lineTension: 0.5,
          backgroundColor: 'rgba(235, 239, 242, 0.8)',
          borderColor: '#ebeff2',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#ebeff2',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#ebeff2',
          pointHoverBorderColor: '#eef0f2',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0, 27014.04, 44050.2, 41244.96, 89339.76, 103722.84, 66654.72, 0, 0, 0],
        },
      ],
    };
    GraphDiv = <Line data={dataLine} />;
  } else if (type === 'line2') {
    GraphDiv = <LineChart data={data} />;
  } else if (type === 'bar') {
    GraphDiv = <BarChart data={data} />;
  } else if (type === 'pie') {
    GraphDiv = <PieChart data={data} />;
  } else if (type === 'doughnut') {
    GraphDiv = <DouChart data={data} />;
  }else if (type === 'doughnut') {
    GraphDiv = <DouChart data={data} />;
  } else {
    GraphDiv = <LineChart data={data} />;
  }
  */

  // defino todos los tipos 'type' posibles
  const allTypes = {
    line: <LineChart data={data} />,
    bar: <BarChart data={data} />,
    doughnut: <DouChart data={data} />,
    pie: <PieChart data={data} />,
    radar: <RadarChart data={data} />,
  };
  // busco en el objeto anterior el type recibido como props
  // sino se recibe muestro uno como default
  const GraphDiv = allTypes[type] || <LineChart data={data} />;

  // coloco como id del tooltip la primera palabra del titulo
  const idRandTooltip = title.split(' ')[0];

  return (
    <Card style={{ height: 'calc(100% - 25px)' }}>
      <CardBody>
        <h4 className="card-title d-flex align-items-center">
          {title}
          {description && (
            <>
              <span id={idRandTooltip} className="ms-2">
                <i className="ri-information-line"></i>
              </span>
              <Tooltip
                isOpen={tooltipOpen}
                autohide={false}
                target={idRandTooltip}
                toggle={() => {
                  setTooltipOpen(!tooltipOpen);
                }}
              >
                {description}
              </Tooltip>
            </>
          )}
        </h4>

        <div>{GraphDiv}</div>
      </CardBody>
    </Card>
  );
}

export default Graph;
