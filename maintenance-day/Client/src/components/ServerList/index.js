import React from 'react';
import { Link } from 'react-router-dom';

const ServerList = ({ servers }) => {
  if (!servers.length) {
    return <h3>No Servers Yet</h3>;
  }

  return (
    <div>
      {servers &&
        servers.map((servers) => (
          <div key={servers} className="card mb-3">
            <h3>{servers}</h3>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`vav/${servers.Id}/BACnet Interface/IP Network`}
            >
              View VAVS.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ServerList;
