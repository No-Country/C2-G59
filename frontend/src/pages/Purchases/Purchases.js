import { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useSelector, useDispatch } from 'react-redux';
import { getPurchases } from '../../store/actions/purchaseActions';

const Purchases = () => {
  dayjs.extend(localizedFormat);

  const breadcrumbItems = [
    { title: 'Fintech', link: '/' },
    { title: 'All Purchase', link: '#d' },
  ];

  const dispatch = useDispatch();
  const purchaseData = useSelector(state => state.purchase);

  useEffect(() => {
    dispatch(getPurchases());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  


  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="All Purchase" breadcrumbItems={breadcrumbItems} />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div>
                  <div className="d-flex justify-content-between align-items-start">
                    <h1>Purchases</h1>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quo quasi pariatur alias
                    iusto laudantium vel suscipit quibusdam sint nulla? Quae eos nulla enim vitae, qui
                    veritatis nam corrupti architecto?
                  </p>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Supplier</th>
                      <th>Invoice</th>
                      <th>Total</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseData.items.map((item, index) => (
                      <tr key={item.id}>
                        <td>{item.control_number}</td>
                        <td>supplier</td>
                        <td>{item.invoice}</td>
                        <td>$ {item.amount}</td>
                        <td>{dayjs(item.pay_date).format('LLL')}</td>
                        <td>
                          <Link className="btn btn-primary btn-sm" to={`/purchases/${item.id}`}>
                            View
                          </Link>{' '}
                          <a className="btn btn-danger btn-sm" href="#2">
                            Delete
                          </a>
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

export default Purchases;
