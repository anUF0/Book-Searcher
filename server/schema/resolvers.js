const { User } = require('../models');
const { signToken, AuthenitcationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('books');

        return userData;
      }
      throw AuthenitcationError;
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw AuthenitcationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

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
    saveBook: async (_, { bookData }, context) => {
      if (!context.user) {
        throw AuthenitcationError;
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: { book: bookData } } },
        { new: true }
      ).populate('books');

      return updatedUser;
    },
    removeBook: async (_, { bookId }, context) => {
      if (!context.user) {
        throw AuthenitcationError;
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user_id },
        { $pull: { savedBooks: bookId } },
        { new: true }
      ).populate('books');

      return updatedUser;
    },
  },
};

module.exports = resolvers;
