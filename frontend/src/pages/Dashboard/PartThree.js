import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { Button, Image } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2'

const PartThree = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of sales',
        data: [12, 19, 3, 5, 2, 3],
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
        <div className="col-4">
          <div className="card shadow mb-2">
            <div className="card-body">
              <h4 className="card-title">Top Products
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
                        height={20} width={20}
                      />
                    </Button>
                  )}
                </OverlayTrigger>
              </h4>
              <Doughnut data={data} height={150} width={150} />
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card shadow mb-2">
            <div className="card-body">
              <h4 className="card-title">Notification</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartThree
