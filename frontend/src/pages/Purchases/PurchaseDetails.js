// import { useEffect } from 'react';
import { Alert, Container, Button } from 'react-bootstrap';
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
    <Container>
      <div>
        <div className="d-flex justify-content-between align-items-start">
          <h1>Purchase Details: {params.id}</h1>
          <Button variant="warning" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <hr />
        <h2>Client: {data.name}</h2>
        <h2>
          Total:{' '}
          {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(
            data.total,
          )}
        </h2>
        <h2>List Products:</h2>

        <Alert variant="primary">
          <ul style={{ margin: 0 }}>
            {products.map(item => {
              return (
                <li key={item.ProductId}>
                  {' '}
                  {item.info.title} - ${item.info.price} - cant: {item.amount} - subtotal: $
                  {item.subTotal}
                </li>
              );
            })}
          </ul>
        </Alert>

        <h2>Details:</h2>
        <Alert variant="success">
          <pre>{JSON.stringify(data, null, ' ')}</pre>
        </Alert>
      </div>
    </Container>
  );
};

export default PurchaseDetails;
