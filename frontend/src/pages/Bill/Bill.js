import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import logoBlack from '../../assets/images/logoBlack.svg';
// data example;
import { useParams, useNavigate } from 'react-router-dom';
import { axiosWithOutToken } from '../../services/axios';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

function Bill() {
  const params = useParams();
  const [sale, setSale] = useState({});
  const navigate = useNavigate();
  const breadcrumbItems = [
    { title: 'Fintech', link: '/' },
    { title: 'Bill', link: '#d' },
  ];

  dayjs.extend(localizedFormat);

  // para obtener los datos del form
  useEffect(() => {
    axiosWithOutToken('/sales/' + params.id)
      .then(({ data }) => {
        setSale(data);
      })
      .catch(err => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let acumulador = 0;
  sale.products &&
    sale.products.forEach(item => {
      const multipl = item.price * item.count;
      acumulador += multipl;
    });

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Bill" breadcrumbItems={breadcrumbItems} />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div className="row m-3 shadow">
                  <div className="row p-3 bg-white">
                    <div className="col-12">
                      <div className="d-flex justify-content-end">
                        <Button variant="warning" onClick={() => navigate(-1)}>
                          Back
                        </Button>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <img src={logoBlack} alt="" className="w-25" />

                        <Table bordered size="sm" className="text-center m-7 w-25">
                          <tbody>
                            <tr>
                              <th>INVOICE</th>
                            </tr>
                            <tr>
                              <th>{dayjs(sale.pay_date).format('LL')}</th>
                            </tr>
                            <tr>
                              <th>{sale.invoice}</th>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <Table bordered size="sm" className="text-center">
                        <thead>
                          <tr>
                            <th>Reference</th>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sale.products &&
                            sale.products.map(item => (
                              <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.product_name}</td>
                                <td>{item.price}</td>
                                <td>{item.count}</td>
                                <td>$ {Math.round(item.price * item.count)}</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                      <Table bordered size="sm" className="text-center ms-auto w-50">
                        <tbody>
                          <tr>
                            <th>Products Total</th>
                            <td>$ {acumulador}</td>
                          </tr>
                          <tr>
                            <th>Shipping Cost</th>
                            <td>Free delivery</td>
                          </tr>
                          <tr>
                            <th>Total (IVA excl.)</th>
                            <td>{acumulador * 0.1}</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>{acumulador - acumulador * 0.1}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Bill;
