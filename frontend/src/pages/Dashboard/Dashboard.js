import { Container, Row, Col } from 'reactstrap';

import Breadcrumbs from '../../components/common/Breadcrumbs';
import FourMiniChart from './components/FourMiniChart';
import TableInfo from './components/TableInfo';
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

  const breadcrumbItems = [
    { title: 'Fintech', link: '/' },
    { title: 'Dashboard', link: '#d' },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbItems} />

        <FourMiniChart />

        <Row>
          <Col lg={8} md={6}>
            <Graph data={data} type="line" title="Sales / Earnings" description="Ejemplo 1" />
          </Col>
          <Col lg={4} md={6}>
            <Graph data={data} type="doughnut" title="Earnings of Month" description="Ejemplo 1" />
          </Col>
        </Row>

        <Row>
          <Col lg={4} md={6}>
            <Graph data={data} type="line" title="Titulo 3" description="Ejemplo 1" />{' '}
          </Col>
          <Col lg={4} md={6}>
            <Graph data={data} type="bar" title="Titulo 2" description="Ejemplo 1" />{' '}
          </Col>
          <Col lg={4} md={2}>
            <Graph data={data} type="bar" title="New Projects" description="Ejemplo 1" />
          </Col>
        </Row>

        <Row>
          <Col lg={4} md={8}>
            <Graph data={data} type="bar" title="Titulo" description="Ejemplo 1" />
          </Col>
          <Col lg={8} md={4}>
            <TableInfo type="table" title="Titulo" description="Ejemplo 1" />
          </Col>
        </Row>

        <Row>
          <Col>
            <TableInfo type="table" title="Titulo" description="Ejemplo 1" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
