exports.typeDefs = `

  type Cookie {
    _id: ID
    text: String!    
    createdDate: String 
    username: String
    restaurantname: String!
    likes: Int
  }

  type User {
    _id: ID
    username: String! @unique
    password: String! 
    email: String!
    joinDate: String
    favorites: [Cookie]
  }

  type Restaurant {
    _id: ID
    restaurantname: String!
    location: String!
  }

  type Query {
    getAllCookies: [Cookie]
    getCookie(_id: ID!): Cookie
    searchCookies(searchTerm: String): [Cookie]

    getCurrentUser: User
    getUserCookies(username: String!): [Cookie]
    getRestaurantCookies(restaurantname: String!): [Cookie]
  }

  type Token {
    token: String!
  }

  type Mutation {
    addCookie(
      text: String!,
      username: String!,
      restaurantname: String
    ): Cookie

    deleteUserCookie(_id: ID): Cookie

    updateUserCookie(
      _id: ID!, 
      name: String!, 
      restaurantname: String
    ): Cookie

    likeCookie(_id: ID!, username: String!): Cookie

    unlikeCookie(_id: ID!, username: String!): Cookie

    signinUser(
      username: String!, 
      password: String!
    ): Token

    signupUser(
      username: String!, 
      email: String!, 
      password: String!
    ) : Token
  }

`;