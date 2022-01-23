import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Chart from 'chart.js/auto';
import CardGroup from './CardGroup';
import Graph from './Graph';

function Dashboard() {
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

      <div class="card-group mb-3">
        <div class="card border-right">
          <CardGroup title="New Clients" numberTitle="241" porcentText="234" iconImg={<i className="bi bi-person-plus-fill"></i>} />
        </div>
        <div class="card border-right">
          <CardGroup title="Earnings of Month" numberTitle="145" porcentText="64" iconImg={<i className="bi bi-coin"></i>} />
        </div>
        <div class="card border-right">
          <CardGroup title="New Projects" numberTitle="565" porcentText="34" iconImg={<i className="bi bi-apple"></i>} />
        </div>
        <div class="card border-right">
          <CardGroup title="Projects" numberTitle="61" porcentText="54" iconImg={<i className="bi bi-person-plus-fill"></i>} />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-6">
          <Graph data={data} type="line" title="New Clients" description="Ejemplo 1" />
        </div>
        <div className="col-lg-4 col-md-6">
          <Graph data={data} type="bar" title="Earnings of Month" description="Ejemplo 1" />
        </div>
        <div className="col-lg-4 col-md-6" >
          <Graph data={data} type="bar" title="New Projects" description="Ejemplo 1" />
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6">
            <Graph data={data} type="line" title="Titulo" description="Ejemplo 1" />
          </div>
          <div className="col-lg-6 col-md-6" >
            <Graph data={data} type="bar" title="Titulo" description="Ejemplo 1" />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-8">
            <Graph data={data} type="bar" title="Titulo" description="Ejemplo 1" />
          </div>
          <div className="col-lg-8 col-md-4">
            <Graph type="table" title="Titulo" description="Ejemplo 1" />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Graph type="table" title="Titulo" description="Ejemplo 1" />
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard;
