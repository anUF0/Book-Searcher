const { User } = require('../models');
const { signToken, AuthenitcationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, { user }) => {
      const foundUser = await User.findOne({
        $or: [
          { _id: user ? user._id : params.id },
          { username: params.username },
        ],
      });
      if (!foundUser) {
        throw AuthenitcationError;
      }
      res.json(foundUser);
    },
  },

  Mutations: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw AuthenitcationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { $or: [username, email], password }) => {
      const user = await User.findOne({ $or: [username, email] });

      if (!user) {
        throw AuthenitcationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenitcationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { book }) => {},
    removeBook: async (_, { user }) => {},
  },
};

module.exports = resolvers;
