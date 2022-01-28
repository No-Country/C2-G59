import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Logo from '../../assets/images/Fintech-Readme.svg';

const Help = () => {
  const breadcrumbItems = [
    { title: 'Fintech', link: '/' },
    { title: 'Help', link: '#d' },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Help" breadcrumbItems={breadcrumbItems} />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div>

                  <div className='d-flex justify-content-center'>
                    <a href="https://github.com/No-Country/C2-G59">
                      <img alt="Fintech Logo" width="600" height="60" src={Logo} />
                    </a> <br></br>
                  </div>

                  <h3>Introduction</h3>
                  <hr />
                  <p>Create a dashboard that consumes data and has in the same database stored procedures with the different queries. The application should query directly to the database stored procedure and show the visualization. The data can be taken from any free API that you can choose, as long as it is related to the requested theme.</p>


                  <h3>Requirements</h3>
                  <hr />
                  <h4>Visualize business data through a dynamic dashboard</h4>
                  <ul>
                    <li>
                      To be able to export the data in excel format
                    </li>
                    <li>
                      To be able to send by mail the results Data storage
                    </li>
                    <li>
                      To create the queries in stored procedures (Sequalize)
                    </li>
                    <li>
                      To be able to pass some parameter
                    </li>
                  </ul>

                  <h3>Demo</h3>
                  <hr />
                  <ol>
                    <li>
                      <a href="https://fintech-dashboard.netlify.app)" className="link-primary">Demo</a>
                    </li>
                    <li>

                      <a href="https://github.com/No-Country/C2-G59)" className="link-primary">Repository</a>
                    </li>
                  </ol>

                  <h3>Technologies used</h3>
                  <hr />
                  <h4>Frontend</h4>
                  
                  <Table striped bordered hover size="sm">
                    <tbody>
                      <tr>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">React</a>
                        </td>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">React Router Dom</a>
                        </td>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">Redux</a>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">Chart Js</a>
                        </td>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">React-Table</a>
                        </td>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">React Bootstrap</a>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">Git</a>
                        </td>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">PWA</a>
                        </td>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">Axios</a>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <h4>Backend</h4>
                  <Table striped bordered hover size="sm">
                    <tbody>
                      <tr>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">Node</a>
                        </td>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">Mysql2</a>
                        </td>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">Sequelize</a>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">Moment</a>
                        </td>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">Express-validator</a>
                        </td>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">Bcryptjs</a>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">JWT</a>
                        </td>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">Express</a>
                        </td>
                        <td><a href="https://github.com/No-Country/C2-G59)" className="link-primary">Excel</a>
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  <h3>Install and use</h3>
                  <hr />
                  <h4>Get the project code:</h4>
                  <ol>
                    <li>Fork code: <a href="https://github.com/No-Country/C2-G59)" className="link-primary">https://github.com/No-Country/C2-G59</a>
                    </li>
                    <li>Installation dependencies: `npm install`</li>
                    <li>Run: `npm start`</li>
                  </ol>

                  <h3>Roles</h3>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>ROLE</th>
                        <th>EMAIL</th>
                        <th>PASSWORD</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>ADMIN</td>
                        <td>admin@mail.com </td>
                        <td>123456</td>
                      </tr>
                      <tr>
                        <td>CEO</td>
                        <td>ceo@mail.com</td>
                        <td> 123456</td>
                      </tr>
                      <tr>
                        <td>MANAGER</td>
                        <td>manager@mail.com</td>
                        <td>123456</td>
                      </tr>
                      <tr>
                        <td>USER</td>
                        <td>user@mail.com</td>
                        <td>123456</td>
                      </tr>
                    </tbody>
                  </Table>

                  <h3>Contributors</h3>
                  <hr />
                  <h4>BACKEND:</h4>
                  <ul>
                    <li>
                      <a href="https://github.com/ifreddy18" className="link-primary">Freddy Michelena (Team Leader)</a>
                    </li>
                    <li>
                      <a href="https://github.com/MauricioRaulFerreyra" className="link-primary">Mauricio Ferreyra</a>
                    </li>
                  </ul>

                  <h4>FRONTEND :</h4>
                  <ul>
                    <li>
                      <a href="https://github.com/markosmk" className="link-primary">Marcos Escobar (Team Leader)</a>
                    </li>
                    <li>
                      <a href="https://github.com/Alemapyapur" className="link-primary">Pamela Rupay</a>
                    </li>
                    <li>
                      <a href="https://github.com/RocioSulca" className="link-primary">Rocio Sulca</a>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Help;
