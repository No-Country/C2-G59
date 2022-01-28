import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { axiosWithOutToken } from '../../services/axios';

const options = { responsive: true };
const colors = ['#4258E3', '#EAA435', '#DDDDE1'];

export function BarChartSales() {
  const {
    user: { branch_id, role },
  } = useSelector(state => state.auth);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axiosWithOutToken('/charts/branches-profit?months=3&cashflow=true').then(({ data }) => {
      setChartData({
        labels: data.labels,
        datasets: data.data.map((item, idx) => {
          if (role === 'MANAGER_ROLE' && branch_id !== null) {
            if (branch_id === item.branch_id)
              return {
                label: item.branch_name,
                data: item.data.map(item => item.profit),
                backgroundColor: colors[idx],
              };
          }
          return {
            label: item.branch_name,
            data: item.data.map(item => item.profit),
            backgroundColor: colors[idx],
          };
        }),
      });
    });
  }, []);

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between flex-wrap">
          <h4 className="card-title mb-4 d-flex align-items-center">Investment to suppliers</h4>
          {/* <div className="float-end">
            <select>
              <option value="">Last Month</option>
              <option value="">Last Month</option>
              <option value="">Last Month</option>
            </select>
          </div> */}
        </div>
        {chartData && <Bar options={options} data={chartData} />}
      </CardBody>
    </Card>
  );
}
