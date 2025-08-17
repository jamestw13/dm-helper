# Dockerfile for React client

# Use Node.js as the base image
FROM node:22.8.0

# Set the working directory
WORKDIR /usr/src/app

# Copy local files to the app folder
COPY . .

# Install dependencies
RUN npm install

# Build the production files
RUN npm run build

# Expose the port used by vite preview (default: 4173)
EXPOSE 3000

# Serve the production build using vite preview
CMD ["npm", "run", "serve"]