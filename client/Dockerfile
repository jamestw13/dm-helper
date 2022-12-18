# Dockerfile for React client

# Build react client
FROM node:18.12.1

# Working directory be app
WORKDIR /usr/src/app

# copy local files to app folder
COPY . .

###  Installing dependencies
RUN npm install

EXPOSE 3000

CMD ["npm","run","start"]