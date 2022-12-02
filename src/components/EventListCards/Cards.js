import React from 'react'
import './style.css';
import ViewDetails from '../popup/ViewDetails';
import { useNavigate } from "react-router-dom";

function Cards(props) {
  let navigate = useNavigate();
  let eventData = props.data;
  return (
    <div>
      <div className="mech_card">
        <div className="mech_content">
          <h3>{props.data.name}</h3>
          <h1>{props.data.event_type}</h1>
          <h1>{props.data.fee !== '' ? `Reg Fee: ${props.data.fee}` : '‎ '}</h1>
          <div className='mech_button m-auto'>
            <a><ViewDetails data={eventData} /></a>
            {
              eventData.reg ?
                <a>
                  <button
                    className="btn"
                    onClick={() =>
                      navigate('/register', { state: eventData })}>
                    Register Event
                  </button>
                </a>
                : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards