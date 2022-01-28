import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useSelector, useDispatch } from 'react-redux';
import { getSales } from '../../store/actions/saleActions';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Link } from 'react-router-dom';

const Sales = () => {
  dayjs.extend(localizedFormat);
  const dispatch = useDispatch();
  const saleData = useSelector(state => state.sale);

  useEffect(() => {
    dispatch(getSales());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const breadcrumbItems = [
    { title: 'Fintech', link: '/' },
    { title: 'All Sale', link: '#d' },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="All Sale" breadcrumbItems={breadcrumbItems} />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div>
                  <h1>Sales</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quo quasi pariatur
                    alias iusto laudantium vel suscipit quibusdam sint nulla? Quae eos nulla enim
                    vitae, qui veritatis nam corrupti architecto?
                  </p>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>N` Bill</th>
                      <th>Total</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {saleData.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.invoice}</td>
                        <td>$ {item.amount}</td>
                        <td>{dayjs(item.sale_date).format('LLL')}</td>
                        <td>
                          <Link className="btn btn-primary btn-sm" to={`/sales/${item.id}`}>
                            View
                          </Link>
                          <Button variant="danger" size="sm">
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sales;
