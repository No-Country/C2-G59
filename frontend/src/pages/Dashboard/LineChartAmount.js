import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';

import { axiosWithOutToken } from '../../services/axios';

const options = { responsive: true };
const colors = ['#3BB97A', '#4258E3', '#DDDDE1'];

export function LineChartAmount() {
  const {
    user: { branch_id, role },
  } = useSelector(state => state.auth);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axiosWithOutToken('/charts/branches-compare-data?show_by=weeks&cashflow=true&periods=8').then(
      ({ data }) => {
        setChartData({
          labels: data.labels,
          datasets: data.data.map((item, idx) => {
            if (role === 'MANAGER_ROLE' && branch_id !== null) {
              if (branch_id === item.branch_id)
                return {
                  label: item.branch_name,
                  data: item.data.map(item => item.amountSales),
                  borderColor: colors[idx],
                  backgroundColor: colors[idx],
                };
            }
            return {
              label: item.branch_name,
              data: item.data.map(item => item.amountSales),
              borderColor: colors[idx],
              backgroundColor: colors[idx],
            };
          }),
        });
      },
    );
  }, []);

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between flex-wrap">
          <h4 className="card-title mb-4 d-flex align-items-center">Sales by Monthly Periods</h4>
          {/* <div className="float-end">
            <select>
              <option value="0">Jan-03 to Jan-09</option>
              <option value="1">Jan-10 to Jan-16</option>
              <option value="2">Jan-17 to Jan-23</option>
              <option value="3">Jan-24 to Jan-30</option>
            </select>
          </div> */}
        </div>
        {chartData && <Line options={options} data={chartData} />}
      </CardBody>
    </Card>
  );
}
