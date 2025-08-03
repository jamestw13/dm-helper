import { User, Character, Campaign, Encounter } from '../models/index.js';
import { GraphQLError } from 'graphql';
import { signToken } from '../utils/auth.js';

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
            { path: 'requestedFriends', select: '-__v' },
            { path: 'friendRequests', select: '-__v' },
          ]);

        return userData;
      }
      throw new GraphQLError('Not logged in', { extensions: { code: 'UNAUTHENTICATED' } });
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
      return await Encounter.findOne({ _id: _id })
        .select('-__v')
        .populate('characters.character')
        .populate('effects.caster')
        .populate('effects.target');
    },
    friendSearch: async (parent, { searchTerm }, context) => {
      const result = await User.find({
        $or: [
          { username: { $regex: searchTerm } },
          { firstname: { $regex: searchTerm } },
          { lastname: { $regex: searchTerm } },
        ],
      });

      return result;
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
        throw new GraphQLError('Incorrect credentials', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new GraphQLError('Incorrect credentials', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      const token = signToken(user);
      return { user, token };
    },
    addCharacter: async (parent, { character: charInput }) => {
      const character = await Character.create(charInput);
      const user = await User.findOneAndUpdate({ _id: charInput.user }, { $addToSet: { characters: character } });

      return character;
    },
    addNote: async (parent, { note }) => {
      const { encounter, target, ...effect } = note;
      console.log(encounter, effect);
      if (target) {
        target.forEach(
          async t =>
            await Encounter.findOneAndUpdate(
              { _id: note.encounter },
              { $addToSet: { effects: { ...effect, target: t } } }
            )
        );
      } else {
        await Encounter.findOneAndUpdate({ _id: note.encounter }, { $addToSet: { effects: effect } });
      }
      return true;
    },

    addFriendRequest: async (parent, { friendIdentifier }, context) => {
      console.log({ friendIdentifier, user: { name: context.user.username, id: context.user._id } });
      try {
        let indentifierType;
        let friend;
        if (friendIdentifier === context.user.username) {
          throw new GraphQLError('You cannot add yourself as a friend', { extensions: { code: 'BAD_USER_INPUT' } });
        }
        if (friendIdentifier.length < 3) {
          throw new GraphQLError('Friend identifier has too few characters', {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }
        // Check if the identifier is an email
        indentifierType = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(friendIdentifier) ? 'email' : 'username';
        console.log({ indentifierType });

        if (indentifierType === 'username') {
          console.log('Searching by username');
          friend = await User.findOneAndUpdate(
            { username: friendIdentifier },
            { $addToSet: { friendRequests: context.user._id } }
          );
        } else {
          friend = await User.findOneAndUpdate(
            { email: friendIdentifier },
            { $addToSet: { friendRequests: context.user._id } }
          );
        }

        await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { requestedFriends: friend._id } });

        console.log(friend);
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    createCampaign: async (parent, { owner, name }) => {
      const campaign = await Campaign.create({ owner, name });
      await User.findOneAndUpdate({ _id: owner }, { $addToSet: { campaigns: campaign }, owner: owner });
      return true;
    },
  },
};

export default resolvers;
