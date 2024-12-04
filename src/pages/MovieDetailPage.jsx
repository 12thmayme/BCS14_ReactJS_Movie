import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Detail from '../Components/Detail';


const MovieDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the movie ID from the URL params

  const handleGetTicket = () => {
    navigate(`/booking/${id}`); // Navigate to the booking page with the movie ID
  };

  return (
    <div className='movie-detail-page'>
      <div className='col-12'>
        <Detail />
      </div>
      <div className='get-ticket-container'>
        <button className="get-ticket" onClick={handleGetTicket}>
          Get Ticket
        </button>
      </div>
    </div>
  );
};

export default MovieDetailPage;
