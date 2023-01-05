const { User, Character, Campaign, Encounter } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
            { path: 'friends' },
          ]);

        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },

    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate([
          { path: 'campaigns', populate: { path: 'owner', model: 'User' } },
          {
            path: 'characters',
            populate: { path: 'campaign', model: 'Campaign' },
          },
          { path: 'friends' },
        ]);
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id })
        .select('-__v -password')
        .populate([
          { path: 'campaigns', populate: { path: 'owner', model: 'User' } },
          {
            path: 'characters',
            populate: { path: 'campaign', model: 'Campaign' },
          },
          { path: 'friends' },
        ]);
    },
    characters: async () => {
      return Character.find().select('-__v').populate('campaign');
    },
    character: async (parent, { _id }, context) => {
      return Character.findOne({ _id: _id }).select('-__v').populate('campaign').populate('user');
    },
    campaign: async (parent, { _id }, context) => {
      return Campaign.findOne({ _id: _id })
        .select('-__v')
        .populate({ path: 'players', populate: { path: 'characters' } })
        .populate({ path: 'characters', populate: { path: 'user' } })
        .populate('owner')
        .populate('encounters');
    },
    encounter: async (parent, { _id }, context) => {
      return (
        Encounter.findOne({ _id: _id })
          .select('-__v')
          .populate('characters')
          .populate(
            // {
            // path:
            'encounterLog.turns.character'
          )
          // ,
          // populate: { path: 'turns.character', model: 'Character' },
          // }
          .populate('encounterLog.turns.statuses.caster')
          .populate('encounterLog.turns.statuses.target')
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
    addCharacter: async (parent, { character: charInput }) => {
      const character = await Character.create(charInput);
      const user = await User.findOneAndUpdate({ _id: charInput.user }, { $addToSet: { characters: character } });

      return character;
    },
  },
};

module.exports = resolvers;
