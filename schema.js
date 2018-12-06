exports.typeDefs = `

  type Cookie {
    _id: ID
    name: String!
    restaurant: String!
    createdDate: String
    likes: Int 
    username: String
  }

  type User {
    _id: ID
    username: String! @unique
    password: String! 
    email: String!
    joinDate: String
    favorites: [Recipe]
  }

  type Query {
    getAllRecipes: [Recipe]
    getRecipe(_id: ID!): Recipe
    searchRecipes(searchTerm: String): [Recipe]

    getCurrentUser: User
    getUserRecipes(username: String!): [Recipe]
  }

  type Token {
    token: String!
  }

  type Mutation {
    addRecipe(
      name: String!, 
      description: String!, 
      imageUrl: String!,
      category: String!, 
      instructions: String!, 
      username: String
    ): Recipe

    deleteUserRecipe(_id: ID): Recipe

    updateUserRecipe(
      _id: ID!, 
      name: String!, 
      description: String!, 
      imageUrl: String!,
      category: String! 
    ): Recipe

    likeRecipe(_id: ID!, username: String!): Recipe

    unlikeRecipe(_id: ID!, username: String!): Recipe

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