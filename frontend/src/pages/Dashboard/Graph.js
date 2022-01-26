import 'chart.js/auto';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Button, Image } from 'react-bootstrap';
// import { useAxios } from '../../hooks/useAxios';

function Graph({ data, type, title, description }) {
  let GraphDiv;

  // const [response, error, loading] = useAxios(
  //   '/charts/branches-profit?branch_id=2&months=3&cashflow=true',
  // );

  // console.log(response);

  if (type === 'line') {
    GraphDiv = <Line data={data} />;
    // GraphDiv = <Line data={database} />;
  } else if (type === 'bar') {
    GraphDiv = <Bar data={data} />;
  } else if (type === 'pie') {
    GraphDiv = <Pie data={data} />;
  } else if (type === 'doughnut') {
    GraphDiv = <Doughnut data={data} />;
  }

  return (
    <div>
      <div className="card shadow mb-2" style={{ height: '100%' }}>
        <div className="card-body">
          <h5 className="card-title">
            {title}

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="button-tooltip-2">{description}</Tooltip>}
            >
              {({ ref, ...triggerHandler }) => (
                <Button
                  variant="white"
                  {...triggerHandler}
                  className="d-inline-flex align-items-center"
                >
                  <Image
                    ref={ref}
                    roundedCircle
                    src="https://img.icons8.com/fluency/48/000000/info.png"
                    height={15}
                    width={15}
                  />
                </Button>
              )}
            </OverlayTrigger>
          </h5>
          <div>{GraphDiv}</div>
        </div>
      </div>
    </div>
  );
}

export default Graph;
