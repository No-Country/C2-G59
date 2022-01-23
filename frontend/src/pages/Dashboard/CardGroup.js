import React from 'react';

function CardGroup({ numberTitle, title, porcentText, iconImg }) {
  return (
    <div className="card-body">
      <div className="d-flex d-lg-flex d-md-block align-items-center justify-content-between">
        <div>
          <div className="d-inline-flex align-items-center justify-content-between">
            <h2 className="text-dark mb-1 font-weight-medium">{numberTitle}</h2>
            <span className="badge bg-primary font-12 text-white font-weight-medium badge-pill mr-4 d-lg-block d-md-none">{porcentText}</span>
          </div>
          <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">{title}</h6>
        </div>
        <div className="ml-auto mt-md-3 mt-lg-0" >
          <span className="opacity-7 text-muted">
            {iconImg}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CardGroup;
