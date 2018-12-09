import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const CookieItem = posed.li({
  shown: { opacity: 1 },
  hidden: { opacity: 0 }
});

export default ({ _id, text, restaurantname }) => (
  <CookieItem
   
    className="card"
  >
    <span>{restaurantname}</span>
    <div className="card-text">
      <Link to={`/cookies/${_id}`}><h4>{text}</h4></Link>
    </div> 
    
  </CookieItem>
);
