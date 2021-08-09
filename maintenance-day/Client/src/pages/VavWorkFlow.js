import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Vavlist } from '../components/VavList'

import { QUERY_VAVS } from '../../utils/queries'

const VavWorkFlow = ({ thoughts, title }) => {
const vavPath = useParams()
  const { loading, data } = useQuery(QUERY_VAVS, {
    // pass URL parameter
    variables: { path: vavPath },
  });
  const vavs = data?.name || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {(loading ? (
            <div>Loading...</div>
          ) : (
            <VavList
              vavs={vavs}
              title="Choose VAV to start task on"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default VavWorkFlow;
