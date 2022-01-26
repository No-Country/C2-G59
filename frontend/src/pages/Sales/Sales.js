import { useState } from 'react';
import { Button, Table, Modal, Container } from 'react-bootstrap';
import Bill from '../Bill/Bill';

const Sales = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <div>
        <h1>Sales</h1>
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
            <th>N` Bill</th>
            <th>Total</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((item, index) => (
            <tr key={index}>
              <td>1</td>
              <td>435GSDf3F</td>
              <td>$54900,00</td>
              <td>12 of April, 2012</td>
              <td>
                <Button variant="primary" size="sm" onClick={handleShow}>
                  View
                </Button>{' '}
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Sale Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Detail of a sale</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque assumenda, doloribus,
            eaque possimus sequi porro, necessitatibus esse dolorem enim aperiam dolore dolorum non
            doloremque! Dolore error officia nostrum autem corrupti?
          </p>

          <Bill/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Sales;
