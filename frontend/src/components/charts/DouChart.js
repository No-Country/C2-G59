import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { axiosWithOutToken } from '../../services/axios';

const initialState = {
  labels: ['Sales', 'Purchases'],
  data: [],
};

const DouChart = () => {
  const [dataChart, setDataChart] = useState(initialState);
  const [branch, setBranch] = useState({ id: 1, name: 'Buenos Aires', month: 10 });
  const [loading, setLoading] = useState(true);

  const dataFinal = {
    labels: ['Buenos Aires', 'Cordoba', 'Mendoza'],
    datasets: [
      {
        data: [89091, 226619, 347716],
        backgroundColor: ['#556ee6', '#1cbb8c', '#fcb92c'],
        hoverBackgroundColor: ['#556ee6', '#1cbb8c', '#fcb92c'],
        hoverBorderColor: '#fff',
      },
    ],
  };

  useEffect(() => {
    setLoading(true);
    axiosWithOutToken(`/charts/branches-profit-total?cashflow=true&months=24`)
      .then(({ data }) => {
        // setTimeout(() => {
        setLoading(false);
        setDataChart({
          // labels: data.labels,
          data: data.data[0].data.map(item => Math.abs(item.profit)),
        });
        // }, 30000);
      })
      .catch(err => console.log(err.message));
  }, [branch]);

  const handleBranches = (branchId, branchName) => {
    setBranch({
      ...branch,
      id: branchId,
      name: branchName,
    });
  };

  const handleMonth = e => {
    setBranch({
      ...branch,
      month: e.target.value,
    });
  };

  return (
    <>
      <Card style={{ height: 'calc(100% - 25px)' }}>
        <CardBody>
          <div className="d-flex justify-content-between flex-wrap">
            <h4 className="card-title mb-4 d-flex align-items-center">
              Percentage of sales: {branch.name}
            </h4>
            <div className="float-end">
              <select name="" id="" onChange={handleMonth}>
                <option value="">Last Month</option>
                <option value="">Last Month</option>
                <option value="">Last Month</option>
              </select>
            </div>
          </div>
          <Row className="text-center">
            <Col xs={4}>
              <h5 className="mb-0">$ 2541</h5>
              <p className="text-muted text-truncate">Profits</p>
            </Col>
            <Col xs={4}>
              <h5 className="mb-0">$ 84845</h5>
              <p className="text-muted text-truncate">Sales</p>
            </Col>
            <Col xs={4}>
              <h5 className="mb-0">$ 12001</h5>
              <p className="text-muted text-truncate">Purchases</p>
            </Col>
          </Row>
          <Doughnut width={474} height={260} data={dataFinal} />
        </CardBody>
      </Card>
    </>
  );
};

export default DouChart;
