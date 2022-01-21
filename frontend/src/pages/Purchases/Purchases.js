import { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// data example
import { getAllPurchases } from '../../utils/dataPurchase';
import { getAllProductsBack, getProductBackById } from '../../utils/dataProductsBack';

const dataPurchases = getAllPurchases();
const dataProducts = getAllProductsBack();

const initialList = [
  // {
  //   id: '1',
  //   name: 'Product 2',
  //   ProductId: 3,
  //   amount: 44,
  //   price: 133,
  //   subTotal: 43553,
  // },
  // {
  //   id: '2',
  //   name: 'Product 4',
  //   ProductId: 5,
  //   amount: 3,
  //   price: 33444,
  //   subTotal: 103422,
  // },
];

const Purchases = () => {
  dayjs.extend(localizedFormat);

  const [listProducts, setListProducts] = useState(initialList);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    let sum = 0;

    for (let i = 0; i < listProducts.length; i++) {
      sum += listProducts[i].subTotal;
    }
    setTotal(sum);
    console.log(listProducts);
  }, [listProducts]);

  const handleAddProduct = () => {
    setListProducts([
      ...listProducts,
      {
        id: Math.random(),
        name: '',
        ProductId: 0,
        amount: 1,
        price: 0,
        subTotal: 0,
      },
    ]);
  };

  return (
    <Container>
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
            <th>Client</th>
            <th>Total</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataPurchases.map(item => (
            <tr key={item.id}>
              <td>1</td>
              <td>{item.name}</td>
              <td>
                {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(
                  item.price,
                )}
              </td>
              <td>{dayjs(item.date).format('LLL')}</td>
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
        {listProducts.map(item => (
          <ItemProduct key={item.id} values={item} />
        ))}

        <Button variant="primary" className="mb-3" onClick={handleAddProduct}>
          Add
        </Button>
        <hr />
        <Row>
          <Form.Group controlId="formGridZip">
            <h3>Total: {formatMoney(total)}</h3>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const formatMoney = num => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(num);
};

const ItemProduct = ({ values: data }) => {
  const [form, setForm] = useState({ ProductId: 2, amount: 1, price: 0, subTotal: 0 });
  const [subTotal, setSubtotal] = useState('0');
  const [priceUnit, setPriceUnit] = useState('0');

  useEffect(() => {
    // Update Price Product
    const searchPriceUnit = getProductBackById(Number(form.ProductId)).price;
    // const priceUnitUpdated = ;
    setPriceUnit(searchPriceUnit);
    // setForm({
    //   ...form,
    //   price: searchPriceUnit
    // })
    // Calc Subtotal
    const newSubTotal = Number(form.amount) * Number(searchPriceUnit);
    const final = formatMoney(newSubTotal);
    setSubtotal(final);
  }, [form, priceUnit]);

  const handleForm = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);
  return (
    <>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Name</Form.Label>

          <Form.Select value={form.ProductId} onChange={handleForm} name="ProductId">
            {/* <option>Choose...</option> */}
            {dataProducts.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleForm}
            min="1"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="text"
            value={formatMoney(priceUnit)}
            onChange={handleForm}
            min="0"
            disabled
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>SubTotal</Form.Label>
          <Form.Control name="subTotal" type="text" value={subTotal} disabled />
        </Form.Group>
      </Row>
    </>
  );
};

export default Purchases;
