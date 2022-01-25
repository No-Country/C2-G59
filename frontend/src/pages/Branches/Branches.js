import React from 'react';
import { Card, Col, Container, Row, } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import AvatarLetter from '../../components/common/AvatarLetter';
import Branch from './branches.json'

function Branches() {
  return (
    <Container>
      <div className="d-flex justify-content-between m-4">
        <h3> Branch </h3>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Branch</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Row xl={3} sm={6}>
        {Branch.map((item, key) =>
          <Col key={key}>
            <Card>
              <Card.Body className="m-2 p-3">
                <div className="text-center">
                  <AvatarLetter name={item.branch} radius="100" className="m-2 p-3" />

                  <div className="m-3" >
                    <Card.Link className="text-dark fs-4 text-decoration-none" href="#">{item.branch}</Card.Link>
                    <p className="text-muted m-2">
                      <i class="bi bi-person-badge"></i> {item.manager}
                    </p>
                  </div>
                </div>
                <hr className="my-4" />
                <Row className="text-center">
                  <Col xs={6}>
                    <Card.Subtitle className="text-muted mb-2">Products</Card.Subtitle>
                    <h6>Fruits</h6>
                  </Col>
                  <Col xs={6}>
                    <Card.Subtitle className="text-muted mb-2">Branch Sales</Card.Subtitle>
                    <h6>$ {item.sales}</h6>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        )
        }
      </Row>
    </Container>
  )
}

export default Branches;
