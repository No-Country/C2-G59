import 'chart.js/auto';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import { Card, CardBody, Tooltip } from 'reactstrap';
import { useState } from 'react';
// import { useAxios } from '../../hooks/useAxios';

function Graph({ data, type, title, description }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  let GraphDiv;

  // const [response, error, loading] = useAxios(
  //   '/charts/branches-profit?branch_id=2&months=3&cashflow=true',
  // );

  // console.log(response);

  if (type === 'line') {
    GraphDiv = <Line data={data} />;
  } else if (type === 'bar') {
    GraphDiv = <Bar data={data} />;
  } else if (type === 'pie') {
    GraphDiv = <Pie data={data} />;
  } else if (type === 'doughnut') {
    GraphDiv = <Doughnut data={data} />;
  }
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
