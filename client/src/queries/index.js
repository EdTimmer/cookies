import { gql } from 'apollo-boost';

/* Cookies Queries */

export const GET_ALL_COOKIES = gql`
  query {
    getAllCookies {
      _id
      text
    }
  }
`;

export const GET_COOKIE = gql`
  query($_id: ID!) {
    getCookie(_id: $_id) {
      _id
      text
      username
      restaurantname
      createdDate
      likes
    }
  }
`;

export const SEARCH_COOKIES = gql`
  query($searchTerm: String) {
    searchCookies(searchTerm: $searchTerm) {
      _id
      text
      likes
    }
  }
`;

/* Cookies Mutations */

export const ADD_COOKIE = gql`
  mutation(
    $text: String!,
    $username: String!,
    $restaurantname: String
  ) {
    addCookie(
      text: $text,
      username: $username,
      restaurantname: $restaurantname
    ) {
      _id
      text
      username
      restaurantname
      createdDate
      likes
    }
  }
`;

export const LIKE_COOKIE = gql`
  mutation($_id: ID!, $username: String!) {
    likeCookie(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

export const UNLIKE_COOKIE = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeCookie(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

export const DELETE_USER_COOKIE = gql`
  mutation($_id: ID!) {
    deleteUserCookie(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_USER_COOKIE = gql`
  mutation($_id: ID!, $text: String!, $restaurantname: String!) {
    updateUserCookie(_id: $_id, text: $text, restaurantname: $restaurantname) {
      _id
      text
      restaurantname
      likes
    }
  }
`;

/* User Queries */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites {
        _id
        text
      }
    }
  }
`;

export const GET_USER_COOKIES = gql`
  query($username: String!) {
    getUserCookies(username: $username) {
      _id
      text
      restaurantname
      likes
    }
  }
`;

/* User Mutations */

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;