const { seed, randUser, randAvatar } = require('@ngneat/falso');
const { User } = require('../models');

const generateUsers = async numUsers => {
  // seed('Stat Block');
  let userData = [];

  for (let i = 0; i < numUsers; i += 1) {
    const userStats = randUser();

    const user = {
      username: userStats.username,
      email: userStats.email,
      firstname: userStats.firstName,
      lastname: userStats.lastName,
      password: 11111111,
      avatar: '',
    };

    userData.push(user);
  }

  return userData;
};

const linkFriends = async (friend1, friend2) => {
  try {
    friend1 = await User.findOneAndUpdate(
      { _id: friend1._id },
      { $addToSet: { friends: friend2._id } }
    );

    friend2 = await User.findOneAndUpdate(
      { _id: friend2._id },
      { $addToSet: { friends: friend1._id } }
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = { generateUsers, linkFriends };
