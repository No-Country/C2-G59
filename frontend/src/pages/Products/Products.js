import { Table } from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { dataProjects } from '../../services/data';

const Products = () => {
  const data = dataProjects.map(item => {
    return (
      <tbody key={item.id}>
        <tr className="table-light">
          <td>{item.id}</td>
          <td>{item.product}</td>
          <td>{item.description}</td>
          <td>${item.price} </td>
          <td>{item.stock}</td>
          <td>{item.sales}</td>
        </tr>
      </tbody>
    );
  });

  return (
    <div>
      <h1>Products</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, quos excepturi. Expedita
        dolor non, saepe tempora soluta eveniet distinctio ut doloribus perferendis asperiores porro
        odio cumque blanditiis ad, aut deleniti.
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
      <Table striped bordered hover id="data table">
        <thead>
          <tr className="table-primary">
            <th>#</th>
            <th>Product</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Sales</th>
          </tr>
        </thead>
        {data}
      </Table>
    </div>
  );
};

export default Products;
