import React from 'react';
import './App.css';
import posed from 'react-pose';

import { Query } from 'react-apollo';
import { GET_ALL_COOKIES } from '../queries';

import CookieItem from "./Cookie/CookieItem";
import Spinner from './Spinner';

const CookieList = posed.ul({
  shown: {
    x: '0%',
    staggerChildren: 100
  },
  hidden: {
    x: '-100%'
  }
});

class App extends React.Component {
  state = {
    on: false
  }

  componentDidMount() {
    setTimeout(this.slideIn, 200);
  }

  slideIn = () => {
    this.setState({ on: !this.state.on});
  }

  render() {

    return (
      <div className="App">
        <h1 className="main-title">
          Listen To The <strong>Cookies</strong>
        </h1>
        <Query query={GET_ALL_COOKIES}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>
            // console.log(data)
            const { on } = this.state;
            return (
              <CookieList 
                pose={on ? 'shown' : 'hidden'}
                className="cards"
              >
                {
                  data.getAllCookies.map(cookie => (
                    <CookieItem key={cookie._id} {...cookie} />
                  ))
                }
              </CookieList>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default App;
