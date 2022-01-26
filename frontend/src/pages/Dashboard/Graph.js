import React from 'react';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Table, Button, Image } from 'react-bootstrap';
import { dataTable } from '../../services/dataTable';

function Graph({ data, type, title, description }) {

  const dataTables = dataTable.map(item => {
    return (
      <>
        <tbody className="table light" key={item.id}>
          <tr>
            <td>{item.id}</td>
            <td>{item.product}</td>
            <td>${item.price} </td>
            <td>{item.stock}</td>
            <td>{item.sales}</td>
          </tr>
        </tbody>
      </>
    );
  });

  let GraphDiv;

  if (type === "line") {
    GraphDiv = <Line data={data} />
  } else if (type === "bar") {
    GraphDiv = <Bar data={data} />
  } else if (type === "pie") {
    GraphDiv = <Pie data={data} />
  } else if (type === "doughnut") {
    GraphDiv = <Doughnut data={data} />
  } else if (type === "table") {
    GraphDiv = <Table striped bordered hover size="sm">
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
  }

  return (
    <div >
      <div className="card shadow mb-2" style={{ height: "100%" }}>
        <div className="card-body">
          <h5 className="card-title">{title}
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
                    height={15} width={15}
                  />
                </Button>
              )}
            </OverlayTrigger>
          </h5>
          <div>
            {GraphDiv}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Graph;
