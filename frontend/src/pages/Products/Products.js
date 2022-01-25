import { Col, Container, Row } from 'reactstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useSelector, useDispatch } from 'react-redux';

import Breadcrumbs from '../../components/common/Breadcrumbs';
import { BasicTable } from './BasicTable';
import { useEffect } from 'react';
import { getProducts } from '../../store/actions/productsActions';

const Products = () => {
  const { items, loading, error } = useSelector(state => state.products);
  const dispatch = useDispatch();

  const breadcrumbItems = [
    { title: 'Fintech', link: '/' },
    { title: 'Products', link: '#d' },
  ];

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Products" breadcrumbItems={breadcrumbItems} />
        <Row>
          <Col>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, quos excepturi.
              Expedita dolor non, saepe tempora soluta
            </p>
            <div className="d-flex justify-content-end">
              <ReactHTMLTableToExcel
                className="btn btn-primary mb-3 "
                table="data table"
                filename="Product - Table"
                sheet="tablexls"
                buttonText="Export to Excel"
              />
            </div>

            {error && (
              <>
                <h3>Errors: {JSON.stringify(error, null, ' ')}</h3>
              </>
            )}

            {loading ? (
              <>
                <h3>Cargando...</h3>
              </>
            ) : (
              <>
                <BasicTable data={items} />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Products;
