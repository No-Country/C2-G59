import { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Table, Modal, Container } from 'react-bootstrap';
// import { useAxios } from '../../hooks/useAxios';

// data example
import { getAllProducts, getProductById } from '../../utils/dataProducts';
import Bill from '../Bill/Bill';

const listProductsInit = [
  {
    id: Math.random(),
    name: 'Nombre de Producto',
    price: 3243.2,
  },
];

const listProducts = getAllProducts();

const Sales = () => {
  const [listItems, setListItems] = useState(listProductsInit);

  // useEffect(() => {}, [listItems]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddItem = () => {
    setListItems([
      ...listItems,
      {
        id: Math.random(),
        name: 'Nombre de Producto 2',
        price: 3232.32,
      },
    ]);
  };

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

      <h2>Add Sales</h2>
      <hr className="mt-4" />

      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>N°. Factura</Form.Label>
            <Form.Control type="number" placeholder="Ingrese numero de factura" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Sucursal</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>Buenos Aires</option>
              <option>Cordoba</option>
              <option>Caba</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Metodo de compra</Form.Label>
            <Form.Check type="checkbox" label="Credito" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Fecha de compra</Form.Label>
            <Form.Control type="date" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Fecha de pago</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Row>

        <hr />

        {listItems && listItems.map(item => <AddProduct key={item.id} data={item} />)}

        <Button variant="primary" className="mb-3" onClick={handleAddItem}>
          Add
        </Button>
        <hr />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

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

const AddProduct = data => {
  const [form, setForm] = useState({ productId: 0, amount: 1, price: 0, subTotal: 0 });
  const [total, setTotal] = useState('0');

  // useEffect(() => {
  //   // const subTotal = Number(cant * data.price);
  //   // setTotal(subTotal);
  //   const getPrice = getProductById(form.productId);
  //   setForm({ ...form, price: getPrice?.price });
  // }, []);

  const handleForm = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // console.log('total', cant * parseInt(data.price));

  return (
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Product</Form.Label>
        <Form.Select value={data.productId} name="productId" onChange={handleForm}>
          <option>Choose...</option>
          {listProducts &&
            listProducts.map(item => (
              <option key={item.id} value={item.id}>
                {item.title} - {item.price}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          min="1"
          max="10"
          name="amount"
          value={form.cant}
          onChange={handleForm}
        />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>Price</Form.Label>
        <Form.Control name="price" type="text" value={form.price} disabled />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>SubTotal</Form.Label>
        <Form.Control name="subTotal" type="text" value={total} disabled />
      </Form.Group>
    </Row>
  );
};
