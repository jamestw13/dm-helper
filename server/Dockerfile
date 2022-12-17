#  Dockerfile for Node Express Backend

FROM node:18.12.1-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy app source code
COPY . .

RUN npm install

# Exports
EXPOSE 4000

CMD ["npm","start"]