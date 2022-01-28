import { Container, Row, Col, CardBody, Card } from 'reactstrap';
import DouChart from '../../components/charts/DouChart';
import LineChart from '../../components/charts/LineChart';

import Breadcrumbs from '../../components/common/Breadcrumbs';
import { BarChartSales } from './BarChartSales';
import FourMiniChart from './components/FourMiniChart';
import TableInfo from './components/TableInfo';
import Graph from './Graph';
import { LineChartAmount } from './LineChartAmount';

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
          <Col xl={8}>
            <LineChart />
          </Col>

          <Col xl={4}>
            <DouChart />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <LineChartAmount />
          </Col>
          <Col md={6}>
            <BarChartSales />
          </Col>
        </Row>

        {/* <Row>
          <Col lg={4} md={12}>
            <Graph data={data} type="pie" title="Titulo  Bar GRaph" description="Ejemplo 1" />
          </Col>
          <Col lg={8} md={12}>
            <TableInfo type="table" title="Titulo" description="Ejemplo 1" />
          </Col>
        </Row> */}
      </Container>
    </div>
  );
}

export default Dashboard;
