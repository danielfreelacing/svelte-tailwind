
# Use this image as the platform to build the app
FROM node:20.9.0-alpine AS portal-webapp

# A small line inside the image to show who made it
LABEL Developers="Soren Gannik"

# The WORKDIR instruction sets the working directory for everything that will happen next
WORKDIR /deployment

# Copy all local files into the image
COPY . .

# Clean install all node modules
RUN npm ci

# Build SvelteKit app
RUN npm run build

# Delete source code files that were used to build the app that are no longer needed
RUN rm -rf src/ static/ docker-compose.yml

# The USER instruction sets the user name to use as the default user for the remainder of the current stage
USER node:node

ENV ORIGIN=https://dev-portal.nsuna.com
# ENV ORIGIN=http://51.20.89.233:3000
# ENV ORIGIN=http://127.0.0.1:3000

# This is the command that will be run inside the image when you tell Docker to start the container
CMD ["node","-r","dotenv/config","build"]