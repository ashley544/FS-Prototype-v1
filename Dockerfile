# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose port 3000 (React development server default)
EXPOSE 3000

# Default command to start development server
CMD ["npm", "start"]

# Alternative production build:
# Uncomment the lines below and comment out the CMD above for production build
# RUN npm run build
# RUN npm install -g serve
# CMD ["serve", "-s", "build", "-l", "3000"] 