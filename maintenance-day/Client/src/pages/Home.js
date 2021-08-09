import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import ServerList from '../components/ServerList';


import { QUERY_SERVERS } from '../utils/queries';

const Home = () => {
  const  pathid  = "/Enterprise Server/Servers"
  const { loading, data } = useQuery(QUERY_SERVERS, {
    // pass URL parameter
    variables: { path: pathid },
  });
  const servers = data?.Id || [];

  return (
    <main>
      {Auth.loggedIn() ? (
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {(loading ? (
            <div>Loading...</div>
          ) : (
            <ServerList
              servers={servers}
              title="Which Equipment are you Maintaining?"
            />
          ))}
        </div>
      </div>):(
        <p>
        You need to be logged in to carry out maintenance. Please{' '}
        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
      </p>
      )}
    </main>
  );
};

export default Home;
