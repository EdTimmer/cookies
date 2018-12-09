import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.css";

import App from "./components/App.js";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import withSession from "./components/withSession";
// import Navbar from "./components/Navbar";
// import Search from "./components/Recipe/Search";
// import RecipePage from "./components/Recipe/RecipePage";
// import Profile from "./components/Profile/Profile";
import AddCookie from "./components/Cookie/AddCookie";

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";

// Required for 2.0

import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from 'apollo-link-context';

// Connect front-end to back-end (using Apollo 2.0)

const httpLink = createHttpLink({
  //For Development
  uri: "http://localhost:4444/graphql",
  //For Deployment
  // uri: "https://recipes-react-graphql.herokuapp.com/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  onError: ({ networkError }) => {
    if (networkError) {
      localStorage.setItem('token', '');
    }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      {/*<Navbar session={session} />*/}
      <Switch>
        <Route path="/" exact component={App} />
        {/*<Route path="/search" exact component={Search} />*/}
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/cookie/add" render={() => <AddCookie session={session} />} />
        {/*<Route path="/recipes/:_id" component={RecipePage} />
<Route path="/profile" render={() => <Profile session={session} /> } />*/}
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

// Wrap app with ApolloProvider (Apollo 1.0)

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);