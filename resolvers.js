const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn })
};

exports.resolvers = {
  Query: {

    getAllCookies: async (root, args, { Cookie }) => {
      const allCookies = await Cookie.find().sort({createdDate: "desc"});
      return allCookies;
    },

    getCookie: async (root, { _id }, { Cookie }) => {
      const cookie = await Cookie.findOne({ _id });
      return cookie;
    },

    searchCookies: async (root, { searchTerm }, { Cookie }) => {
      if (searchTerm) {
        const searchResults = await Cookie.find({
          $text: { $search: searchTerm }
        }, {
          score: { $meta: "textScore" }
        }).sort({
          score: { $meta: "textScore" }
        });
        return searchResults;
      }
      else {
        const cookies = await Cookie.find().sort({ likes: 'desc', createdDate: 'desc' });
        return cookies;
      }
    },

    getUserCookies: async (root, { username }, { Cookie }) => {
      const userCookies = await Cookie.find({ username }).sort({ createdDate: 'desc' });
      return userCookies;
    },

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({ username: currentUser.username })
        .populate({
          path: 'favorites',
          model: 'Cookie'
        });
      return user;
    }
  },

  Mutation: {

    addCookie: async (root, { text, restaurantname, username }, { Cookie }) => {
      const newCookie = await new Cookie({
        text,
        restaurantname,
        username
      }).save();
      return newCookie;
    },

    likeCookie: async (root, { _id, username }, { Cookie, User }) => {
      const cookie = await Cookie.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
      const user = await User.findOneAndUpdate({ username }, { $addToSet: { favorites: _id }});
      return cookie;
    },

    unlikeCookie: async (root, { _id, username }, { Cookie, User }) => {
      const cookie = await Cookie.findOneAndUpdate({ _id }, { $inc: { likes: -1 } });
      const user = await User.findOneAndUpdate({ username }, { $pull: { favorites: _id }});
      return cookie;
    },

    deleteUserCookie: async (root, { _id }, { Cookie }) => {
      const cookie = await Cookie.findOneAndRemove({ _id });
      return cookie;
    },

    updateUserCookie: async (root, { _id, text, restaurantname }, { Cookie }) => {
      const updatedRecipe = await Cookie.findOneAndUpdate(
        { _id },
        { $set: { text, restaurantname }},
        { new: true }
      );
      return updatedCookie;
    },

    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if(!user) {
        throw new Error('User not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      return { token: createToken(user, process.env.SECRET, '1hr')}

    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, '1hr')}
    }
  }
};