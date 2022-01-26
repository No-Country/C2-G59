import React from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';

export default function AddPurchases() {
  return <div className='m-5 wrapperBranches'>
      <h2>Add Purchase</h2>
      <hr className="mt-4" />

      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Sale Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Name Client</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Row>

        <Button variant="primary" className="mb-3" >
          Add
        </Button>
        <hr />
        <Row>
          <Form.Group controlId="formGridZip">
            <h3>Total: </h3>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
  </div>;
}
