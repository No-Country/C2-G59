import React from 'react'
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { Button, Image } from 'react-bootstrap';

const PartOne = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: '# de ventas',
        data: [12, 19, 3, 5, 12, 3, 15],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataPo = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: '# Ventas',
        data: ['15', '20', '15', '20', '25', '5'],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div>
      <div className="row m-3">
        <div className="col">
          <div className="card shadow mb-2" >
            <div className="card-body">
              <h5 className="card-title">Venta Semestral
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Productos mas vendidos en los ultimos 6 meses en nuestras sedes.</Tooltip>}
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
                        height={15} width={15}
                      />
                    </Button>
                  )}
                </OverlayTrigger>
              </h5>
              <Line data={data}
                height={150} width={150}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow mb-2">
            <div className="card-body">
              <h5 className="card-title">Ventas Mensual
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Productos mas vendidos en los ultimos 6 meses en nuestras sedes.</Tooltip>}
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
                        height={15} width={15}
                      />
                    </Button>
                  )}
                </OverlayTrigger>
              </h5>
              <Pie data={dataPo}
                height={150} width={150}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow mb-2">
            <div className="card-body">
              <h5 className="card-title">Top vendidos
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Productos mas vendidos en los ultimos 6 meses en nuestras sedes.</Tooltip>}
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
                        height={15} width={15}
                      />
                    </Button>
                  )}
                </OverlayTrigger>
              </h5>
              <Bar data={data}
                height={150} width={150}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow mb-2">
            <div className="card-body">
              <h5 className="card-title">Porcentajes
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Productos mas vendidos en los ultimos 6 meses en nuestras sedes.</Tooltip>}
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
                        height={15} width={15}
                      />
                    </Button>
                  )}
                </OverlayTrigger>
              </h5>
              <Doughnut data={dataPo}
                height={150} width={150}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartOne
