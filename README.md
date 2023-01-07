# DM Helper

Tools to help a DM run their ttrpg campaign.

The initial goal is to make an app that helps a DM manage their game statistics all in one application. Key starting features will include an encounter tracker, where a DM can keep track of player initiative, pertinent stats like AC, HP, etc, and status effects.

Future tools could include character sheet management where DMs and players can share changes to character data (HP after taking damage, granting of loot) in a live session.

Ideas and contributions are welcome.

## Description

### Work in progress!

Currently, application features include:

- User creation and login
- Character creation and sheet visualization
- Encounter initiative display order

Data models are based on D&D 5e, with plans to expand to other systems.

## Requires

- Node v 18.12.0 or newer
- MongoDB
- _and/or_ Docker

## Installation

- Clone repo
- Run `npm i` from repo's root directory.
- Run `npm run installall` from repo's root directory to install server and client dependencies

- Add a .env file in the /server directory and add the following lines:
  ```
  ACCESS_TOKEN_SECRET=<your custom access token secret here>
  ```
  - A handy way to create secrets is by running the following in the terminal:
  ```
  node
  require('crypto').randomBytes(64).toString('hex')
  ```
- Connect to your MongoDB cluster OR
- Start a Docker container for MongoDB

```
docker run -d \
  -p 27017:27017 \
  --name test-mongo \
  -v data-vol:/data/db \
  mongo:latest
```

- (optional) Run `npm run seed` from repo's root directory to generate test users, characters, campaigns, encounters, etc.
- Run `npm run develop` from repo's root directory to start server and client via nodemon
- Search for all instances of **_*** UPDATE ME ***_** to begin customizing your app name

- Happy developing!

## Next Steps

- [x] Refactor to move data models to the back-end
- [ ] Make the data editable by the users
- [ ] Add visual style / de-uglify
- [ ] Add websockets so data can be live updated by DM and players during gameplay
