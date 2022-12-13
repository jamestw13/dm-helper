const { seed, randUser, randAvatar } = require('@ngneat/falso');

module.exports = async function generateUsers(numUsers) {
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
