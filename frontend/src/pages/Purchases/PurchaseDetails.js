// import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../utils/dataProducts';
import { getPurchaseById } from '../../utils/dataPurchase';

const PurchaseDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const data = getPurchaseById(Number(params.id));
  const products = data.products.map(item => {
    const dataProduct = getProductById(item.ProductId);
    return { ...item, info: dataProduct };
  });

  return (
      <div className='m-5 wrapperBranches'>
        <div className="d-flex justify-content-between align-items-start">
          <h1>Purchase Details: {params.id}</h1>
          <Button variant="warning" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <hr />
        <h2>CLIENT: {data.name}</h2>
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
          {products.map(item => {
            return (
              <tbody className="table light" key={item.ProductId}>
                <tr>
                  <td>{item.info.title}</td>
                  <td>${item.info.price} </td>
                  <td>{item.amount}</td>
                  <td>{item.subTotal}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>

        <h2>
          TOTAL:{' '}
          {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(
            data.total,
          )}
        </h2>

        {/* <h2>Details:</h2>
        <Alert variant="success">
          <pre>{JSON.stringify(data, null, ' ')}</pre>
        </Alert> */}
      </div>
    
  );
};

export default PurchaseDetails;
