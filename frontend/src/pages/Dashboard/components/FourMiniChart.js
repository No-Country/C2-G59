import { Col, Row } from 'reactstrap';
import CardWidget from './CardWidget';

const FourMiniChart = props => {
  // {{url}}/api/charts/branches-profit-total?cashflow=true&months=2
  // const {information} = props
  const information = [
    {
      title: 'Sales Last 2 Months',
      numberTitle: 158610,
      porcentText: 5, // FIXME colocado aleatorio
      iconImg: 'bi bi-person-plus-fill',
    },
    {
      title: 'Earnings Last 2 Months',
      numberTitle: 56533,
      porcentText: 2, // FIXME colocado aleatorio
      iconImg: 'bi bi-coin',
    },
    {
      title: 'Investment Last 2 Months',
      numberTitle: 102076,
      porcentText: 12, // FIXME colocado aleatorio
      iconImg: 'bi bi-apple',
    },
    {
      title: 'Branch: Cordoba',
      numberTitle: 76256,
      porcentText: 134,
      iconImg: 'bi bi-person-plus-fill',
    },
  ];

  return (
    <Row>
      {information &&
        information.map((item, idx) => (
          <Col lg={3} md={6} key={idx}>
            <CardWidget
              title={item.title}
              numberTitle={item.numberTitle}
              porcentText={item.porcentText}
              iconImg={item.iconImg}
            />
          </Col>
        ))}
    </Row>
  );
};

export default FourMiniChart;
