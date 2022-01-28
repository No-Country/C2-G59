import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup, Card, CardBody } from 'reactstrap';

import { axiosWithOutToken } from '../../services/axios';

const initialState = {
  labels: [],
  datasets: [
    {
      label: 'Profit',
      data: [],
    },
    {
      label: 'Amount Sales',
      data: [],
    },
    {
      label: 'Purchases Analytics',
      data: [],
    },
  ],
};

const LineChart = () => {
  const {
    user: { branch_id, role },
  } = useSelector(state => state.auth);
  const [dataChart, setDataChart] = useState(initialState);
  const [branch, setBranch] = useState({ id: 1, name: 'Buenos Aires', month: 10 });
  const [loading, setLoading] = useState(true);

  const dataFinal = {
    labels: dataChart?.labels,
    datasets: [
      {
        label: 'Profits',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(19, 233, 158, 0.2)',
        borderColor: '#13e99e',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#13e99e',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#13e99e',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataChart?.datasets[0].data,
      },
      {
        label: 'Sales Analytics',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(85, 110, 230, 0.2)',
        borderColor: '#556ee6',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#556ee6',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#556ee6',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataChart?.datasets[1].data,
      },
      {
        label: 'Purchases Analytics',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(235, 239, 242, 0.2)',
        borderColor: '#ebeff2',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#ebeff2',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#ebeff2',
        pointHoverBorderColor: '#eef0f2',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataChart?.datasets[2].data,
      },
    ],
  };

  useEffect(() => {
    setLoading(true);
    axiosWithOutToken(
      `/charts/branches-profit?branch_id=${branch.id}&months=${branch.month}&cashflow=true`,
    )
      .then(({ data }) => {
        setLoading(false);
        setDataChart({
          labels: data.labels,
          datasets: [
            {
              label: 'Profit',
              data: data.data[0].data.map(item => item.profit),
            },
            {
              label: 'Amount Sales',
              data: data.data[0].data.map(item => item.amountSales),
            },
            {
              label: 'Purchases Analytics',
              data: data.data[0].data.map(item => item.amountPurchase),
            },
          ],
        });
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
              Sales / Earnings in Branch
            </h4>
            <div className="d-none d-lg-block">
              <select
                className="form-select form-select-sm d-inline w-auto"
                value={branch.month}
                onChange={handleMonth}
                style={{ verticalAlign: 'top' }}
              >
                <option value="8">Last 8 Months</option>
                <option value="6">Last 6 Months</option>
                <option value="12">Last 12 Months</option>
              </select>
              <ButtonGroup className="mb-2">
                {(role === 'ADMIN_ROLE' || (role === 'MANAGER_ROLE' && branch_id === 1)) && (
                  <Button
                    size="sm"
                    color="secondary"
                    active={branch.id === 1}
                    type="button"
                    onClick={() => handleBranches(1, 'Buenos Aires')}
                  >
                    Buenos Aires
                  </Button>
                )}

                {role === 'MANAGER_ROLE' && branch_id === 2 && (
                  <Button
                    size="sm"
                    color="secondary"
                    active={branch.id === 2}
                    type="button"
                    onClick={() => handleBranches(2, 'Cordoba')}
                  >
                    Cordoba
                  </Button>
                )}

                {role === 'MANAGER_ROLE' && branch_id === 3 && (
                  <Button
                    size="sm"
                    color="secondary"
                    active={branch.id === 3}
                    type="button"
                    onClick={() => handleBranches(3, 'Mendoza')}
                  >
                    Mendoza
                  </Button>
                )}
              </ButtonGroup>
            </div>
          </div>

          {/* {loading ? (
            <div
              className="d-flex align-items-center justify-content-center h-100"
              style={{ maxHeight: '300px' }}
            >
              <Spinner color="primary" type="grow" />
            </div>
          ) : ( */}
          <>
            <div>
              <Line width={474} height={300} data={dataFinal} />
            </div>
          </>
          {/* )} */}
        </CardBody>
      </Card>
    </>
  );
};

export default LineChart;
