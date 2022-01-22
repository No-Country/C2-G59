import React from 'react';
import { dataTable } from '../../services/dataTable';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Table, Button, Image } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

const PartTwo = () => {
  const data = {
    labels: ['Rubber', 'Volumizer', 'Jogger', 'Tasty ', 'Humidifier ', 'Eyelashes'],
    datasets: [
      {
        label: '# of products',
        data: [54, 43, 32, 29, 11, 8],
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

  const dataTables = dataTable.map(item => {
    return (
      <tbody className="table light" key={item.id}>
        <tr>
          <td>{item.id}</td>
          <td>{item.product}</td>
          <td>${item.price} </td>
          <td>{item.stock}</td>
          <td>{item.sales}</td>
        </tr>
      </tbody>
    );
  });

  return (
    <div>
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card shadow mb-2">
            <div className="card-body">
              <h4 className="card-title">
                Top Products
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      Productos mas vendidos en los ultimos 6 meses en nuestras sedes.
                    </Tooltip>
                  }
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
                        height={20}
                        width={20}
                      />
                    </Button>
                  )}
                </OverlayTrigger>
              </h4>
              <Line data={data} height={150} width={150} />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card shadow mb-2">
            <div className="card-body">
              <h4 className="card-title">Table</h4>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr className="table-dark">
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Sales</th>
                  </tr>
                </thead>
                {dataTables}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartTwo;
