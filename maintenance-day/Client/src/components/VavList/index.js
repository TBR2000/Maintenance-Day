import React from 'react';
import { Link } from 'react-router-dom';

const VavList = ({ vavs }) => {
  if (!vavs.length) {
    return <h3>No Servers Yet</h3>;
  }

  return (
    <div>
      {vavs &&
        vavs.map((vavs) => (
          <div key={vavs.name} className="card mb-3">
            <h3>{vavs}</h3>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/Vavlist`}
            >
              View VAVS.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default VavList;
