import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import PartOne from './PartOne'
import PartTwo from './PartTwo'
import PartThree from './PartThree'

function Dashboard() {
  return (
    <div>
      <div className="d-flex justify-content-between m-4">
        <h3> Analytics </h3>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            Library
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <PartOne />
      <PartTwo />
      <PartThree />

    </div>
  )
}

export default Dashboard
