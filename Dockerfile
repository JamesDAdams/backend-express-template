# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app is running on
EXPOSE 3001

# Start your app when the container starts
CMD ["npm", "start"]
