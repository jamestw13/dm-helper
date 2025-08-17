# Dockerfile for Node Express / Apollo Server

# Use Node.js as the base image
FROM node:22.8.0

# Set the working directory (automatically creates the directory)
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (to leverage Docker cache)
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 4000
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start"]