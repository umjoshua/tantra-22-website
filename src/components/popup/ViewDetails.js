import Popup from 'reactjs-popup';
import './Popup.css'

const ViewDetails = ({ data }) => {
  return (
    <Popup trigger={<button>View Details</button>} position="right center">
      {
        close => (<div>
          <div className="popup overflow-scroll">
            <div className="popup_header ">
              <h1 className="popup_title">{data.name}</h1>
              <h1 className="popupclose_btn" onClick={close}>&times;</h1>
            </div>
            <div className="details">
              <div className='font-bold'>Description :</div>
              <div className='pl-2 '>{data.description}</div>
              <div className='font-bold'>Prize : <span className='font-normal'>{data.prize ? 'Yes' : 'No'}</span></div>
              <div className='font-bold'>Event type : <span className='font-normal'>{data.group ? 'Group' : 'Individual'}</span></div>
              <div className='font-bold'>Venue :</div>
              <div className='pl-2'>{data.venue}</div>
              <div className='font-bold'>Time : <span className='font-normal'>{data.time}</span></div>
              <div className='font-bold'>Student Coordinators :</div>
              <div className='pl-2'>{data.student1} , {data.student2}</div>
              <div className='font-bold'>Contact</div>
              <div className='pl-2' ><a className='text-blue-500' href={`tel://${data.s1_phone}`}>{data.s1_phone}</a> , <a className='text-blue-500' href={`tel://${data.s2_phone}`}>{data.s2_phone}</a></div>
              <div className='font-bold'>Staff Coordinators :</div>
              <div className='pl=2'>{data.staff}</div>
            </div>
          </div>
        </div >)
      }
    </Popup >
  )
}

export default ViewDetails