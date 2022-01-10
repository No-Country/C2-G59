import React from 'react'
import { Doughnut } from 'react-chartjs-2'

function PartThree() {
  return (
    <div>
      <div className="row m-3">
        <div className="col-5">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Pie Chart</h4>
              <Doughnut data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                  {
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  }],
              }}
                height={150} width={150}
              />
            </div>
          </div>
        </div>
        <div className="col-7">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Notification</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartThree
