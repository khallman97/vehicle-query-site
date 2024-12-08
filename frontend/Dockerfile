# Use the Node.js image as the base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the package files
COPY package*.json ./frontend/

# Navigate to the frontend directory
WORKDIR /app/frontend

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build 

# Use a lightweight production image for the final stage
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Set environment variable to disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Copy the build output and required files from the builder stage
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/package.json ./package.json

# Install only production dependencies
RUN npm install --production

# Expose the application port
EXPOSE 3000

# Start the Next.js server
CMD ["npm",  "start"]
