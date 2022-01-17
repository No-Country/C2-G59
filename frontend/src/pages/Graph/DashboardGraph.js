import React from 'react'
import Graph from './Graph'
import Breadcrumb from 'react-bootstrap/Breadcrumb'


function DashboardGraph() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: '# of sales',
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



  return (
    <>
      <div className="d-flex justify-content-between m-4">
        <h3> Analytics </h3>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="row">
        <div className="col-3">
          <Graph data={data} type="line" title="Titulo" description="Ejemplo 1" />
        </div>
        <div className="col-3">
          <Graph data={data} type="doughnut" title="Titulo" description="Ejemplo 1" />
        </div>
        <div className="col-3">
          <Graph data={data} type="bar" title="Titulo" description="Ejemplo 1" />
        </div>
        <div className="col-3">
          <Graph data={data} type="doughnut" title="Titulo" description="Ejemplo 1" />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Graph data={data} type="line" title="Titulo" description="Ejemplo 1" />
        </div>
        <div className="col-8">
          <Graph data={data} type="bar" title="Titulo" description="Ejemplo 1" />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Graph data={data} type="bar" title="Titulo" description="Ejemplo 1" />
        </div>
        <div className="col-8">
        <Graph type="table" title="Titulo" description="Ejemplo 1" />
        </div>
      </div>

    </>
  )
}

export default DashboardGraph
