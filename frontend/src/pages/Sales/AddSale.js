import React from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';

export default function AddSale() {
  return <div className='m-5 wrapperBranches'>
      <h2>Add Sales</h2>
      <hr className="mt-4" />

      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Invoice Number</Form.Label>
            <Form.Control type="number" placeholder="Ingrese numero de factura" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Branch</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>Buenos Aires</option>
              <option>Cordoba</option>
              <option>Caba</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Purchase Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Payment Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Row>

        <hr/>

        <Button variant="primary" className="mb-3">
          Add
        </Button>
      </Form>
  </div>;
}
