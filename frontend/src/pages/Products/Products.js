import { Col, Container, Row } from 'reactstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import Breadcrumbs from '../../components/common/Breadcrumbs';
import { BasicTable } from './BasicTable';

const Products = () => {
  const breadcrumbItems = [
    { title: 'Fintech', link: '/' },
    { title: 'Products', link: '#d' },
  ];

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
            <BasicTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Products;
