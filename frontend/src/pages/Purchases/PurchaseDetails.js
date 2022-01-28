import { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row, Table, Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosWithOutToken } from '../../services/axios';
import Breadcrumbs from '../../components/common/Breadcrumbs';

const PurchaseDetails = () => {
  const breadcrumbItems = [
    { title: 'Fintech', link: '/' },
    { title: 'All Purchase', link: '#d' },
  ];

  const navigate = useNavigate();
  const params = useParams();
  const [purchase, setPurchase] = useState({});
  console.log(params);
  // para obtener los datos del form
  useEffect(() => {
    axiosWithOutToken('/purchase/' + params.id)
      .then(({ data }) => {
        setPurchase(data);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let acumulador = 0;
  purchase.products &&
    purchase.products.forEach(item => {
      const multipl = item.cost * item.count;
      acumulador += multipl;
    });

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Purchase Details" breadcrumbItems={breadcrumbItems} />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div className="m-5 wrapperBranches">
                  <div className="d-flex justify-content-between align-items-start">
                    <h1>Purchase Details: {params.id}</h1>
                    <Button variant="warning" onClick={() => navigate(-1)}>
                      Back
                    </Button>
                  </div>
                  <hr />
                  <h2>List of products:</h2>

                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr className="thead-dark">
                        <th>Product</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    {purchase.products &&
                      purchase.products.map((item, index) => {
                        return (
                          <tbody className="table light" key={item.ProductId}>
                            <tr key={index}>
                              <td>{item.product_name}</td>
                              <td>${item.cost} </td>
                              <td>{item.count}</td>
                              <td>$ {Math.round(item.cost * item.count)}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </Table>
                  <h2>Total $ {Math.round(acumulador)}</h2>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PurchaseDetails;
