import React from 'react';
import { withRouter } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_COOKIE } from '../../queries';
// import LikeCookie from './LikeCookie';
import Spinner from '../Spinner';


const CookiePage = ({ match }) => {
  const { _id } = match.params;  
  
  return (
    <Query query={GET_COOKIE} variables={{ _id }}>
      {
        ({ data, loading, error }) => {

          if (loading) return <Spinner />
          if (error) return <div>Error</div>
          // console.log(data);
          return (
            <div className="App">
              <div 
                
                className="recipe-image">              
              </div>

              <div className="recipe">
                <div className="recipe-header">
                  <h2 className="recipe-name">
                    <strong>{data.getCookie.text}</strong>
                  </h2>
                  <h5><strong>
                    {data.getCookie.restaurantname}
                  </strong></h5>
                  <p>
                    Created by <strong>{data.getCookie.username}</strong>
                  </p>
                  <p>
                    <span style={{fontSize: '30px'}}>{data.getCookie.likes}</span> <span className="heart" role="img" aria-label="heart">❤️️</span>
                  </p>

                </div>

                {/*<LikeCookie _id={_id} />*/}
              </div>
              
            </div>
          )
        }
      }
    </Query>
  )
};

export default withRouter(CookiePage);
