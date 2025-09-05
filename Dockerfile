# Use Node.js LTS version
FROM node:18-alpine

# VULNERABILITY: Running as root user
# VULNERABILITY: No user creation for security

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
# VULNERABILITY: Using npm install without security flags
RUN npm install

# Copy source code
COPY . .

# VULNERABILITY: No .dockerignore file to exclude sensitive files
# VULNERABILITY: Copying all files including potential secrets

# Create non-root user (security improvement)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["npm", "start"]
