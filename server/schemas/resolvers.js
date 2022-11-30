const { User, Character, Campaign } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { GraphQLJSONObject } = require('graphql-type-json');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate([
            { path: 'campaigns', populate: { path: 'owner', model: 'User' } },
            {
              path: 'characters',
              populate: { path: 'campaign', model: 'Campaign' },
            },
          ]);

        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },

    users: async () => {
      return User.find().select('-__v -password').populate('campaigns');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).select('-__v -password');
    },
    characters: async () => {
      return Character.find().select('-__v').populate('campaign');
    },
    character: async (parent, { _id }, context) => {
      return Character.findOne({ _id: _id })
        .select('-__v')
        .populate('campaign')
        .populate('user');
    },
    campaign: async (parent, { _id }, context) => {
      return (
        Campaign.findOne({ _id: _id })
          .select('-__v')
          .populate('characters')
          .populate('owner')
          // .populate('encounters')
          .populate({ path: 'encounters', populate: { path: 'characters' } })
      );
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { user, token };
    },
  },
  EncounterLog: GraphQLJSONObject,
};

module.exports = resolvers;
