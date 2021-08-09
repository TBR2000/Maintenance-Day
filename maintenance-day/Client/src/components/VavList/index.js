import React from 'react';
import { Link } from 'react-router-dom';
import QuestionForm from '../QuestionForm'

let questions = false

const VavList = ({ vavs }) => { 
  if (!vavs.length) {                                                                                                  
    return <h3>No Vavs Yet</h3>;
  }

  return (
    <div>
      {vavs &&
        vavs.map((vavs) => (
          !questions ? 
          (<div key={vavs.name} className="card mb-3">
            <h3>{vavs.name}</h3>
            <h4>Temp {vavs.value}</h4>
            <h4>Setpoint {vavs.setpoint}</h4>
            <h4>Terminal Load {vavs.damper}</h4>
            <button 
              onClick={ questions = true }
              className="btn btn-primary"
              type="button">
              Move to Item checklist.
            </button>
          </div>) : (
            <QuestionForm/>
            )
        ))}
    </div>
  );
};

export default VavList;
