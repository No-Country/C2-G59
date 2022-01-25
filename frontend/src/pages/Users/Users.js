import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
import Breadcrumbs from '../../components/common/Breadcrumbs';

const Users = () => {
  const breadcrumbItems = [
    { title: 'Tables', link: '#' },
    { title: 'Users', link: '#' },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Users" breadcrumbItems={breadcrumbItems} />

        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <h4 className="card-title">List All Users</h4>
                <p className="card-title-desc">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde saepe aperiam
                  tenetur ad natus officia iste assumenda totam dignissimos doloremque beatae
                  incidunt, qui nostrum sint quis dolore ratione nobis recusandae!
                </p>

                <div className="table-responsive">
                  <Table className="mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Users;
