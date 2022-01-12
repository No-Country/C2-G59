import { Table } from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Products = () => {
  return (
    <div>
      <h1>Products</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, quos excepturi. Expedita
        dolor non, saepe tempora soluta eveniet distinctio ut doloribus perferendis asperiores porro
        odio cumque blanditiis ad, aut deleniti.
      </p>
      <Table striped bordered hover id="data table">
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Sales</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Gorgeous Rubber Gloves</td>
            <td>$ 165</td>
            <td>+32</td>
            <td>65</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Gorgeous Plastic Tuna</td>
            <td>$ 432</td>
            <td>-3</td>
            <td>145</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Tasty Concrete Hat</td>
            <td>$ 334</td>
            <td>98</td>
            <td>33</td>
          </tr>
        </tbody>
      </Table>

      <ReactHTMLTableToExcel
        className="btn btn-info"
        table="data table"
        filename="Product - Table"
        sheet="tablexls"
        buttonText="Export to Excel"
      />

    </div>
  );
};

export default Products;
