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
        vavs.map((vav) => (
          !questions ? 
          (<div key={vav.name} className="card mb-3">
            <h3>{vav.name}</h3>
            <h4>Temp {vav.value}</h4>
            <h4>Setpoint {vav.setpoint}</h4>
            <h4>Terminal Load {vav.damper}</h4>
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
