import React from 'react';
import { withRouter } from 'react-router-dom';
import CKEditor from 'react-ckeditor-component';

import { Mutation } from 'react-apollo';
import { ADD_COOKIE, GET_ALL_COOKIES, GET_USER_COOKIES } from '../../queries';
import Error from '../Error';
import withAuth from '../withAuth';

const initialState = {
  text: '',
  restaurantname: '',
  username: ''
}

class AddCookie extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  }

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  // handleEditorChange = event => {
  //   const newContent = event.editor.getData();
  //   this.setState({ instructions: newContent });
  // }

  handleSubmit = (event, addCookie) => {
    event.preventDefault();
    addCookie().then(({ data }) => {
      // console.log(data);
      this.clearState();
      this.props.history.push("/");

    });
  }

  validateForm = () => {
    const { text, restaurantname } = this.state;
    const isInvalid = !text || !restaurantname;
    return isInvalid;
  }

  updateCache = (cache, { data: { addCookie } }) => {
    const { getAllCookies } = cache.readQuery({ query: GET_ALL_COOKIES });

    cache.writeQuery({
      query: GET_ALL_COOKIES,
      data: {
        getAllCookies: [addCookie, ...getAllCookies]
      }
    })
  }

  render() {
    const { text, restaurantname, username } = this.state;

    return (
      <Mutation
        mutation={ADD_COOKIE}
        variables={{ text, restaurantname, username }}
        refetchQueries={() => [
          { query: GET_USER_COOKIES, variables: { username } }
        ]}
        update={this.updateCache}
      >
        {
          (addCookie, { data, loading, error }) => {
            return (
              <div className="App">
                <h2 className="App">Add Cookie</h2>

                <form className="form" onSubmit={event => this.handleSubmit(event, addCookie)}>

                  <input
                    type="text"
                    name="text"
                    placeholder="Cookie Text"
                    onChange={this.handleChange}
                    value={text}
                  />

                  <input
                    type="text"
                    name="restaurantname"
                    placeholder="Restaurant"
                    onChange={this.handleChange}
                    value={restaurantname}
                  />

                  <button
                    disabled={loading || this.validateForm()}
                    type="submit" className="botton-primary"
                  >
                    Submit
                </button>
                  {error && <Error error={error} />}
                </form>
              </div>
            )
          }
        }
      </Mutation>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddCookie));
