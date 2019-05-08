FROM node:9.9.0-alpine
RUN apk update && \
    apk add --update git

USER node

# Create app directory
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Install app dependencies
COPY --chown=node:node package.json /home/node/app/
RUN npm install

RUN npm install serve
# Bundle app source
COPY --chown=node:node . /home/node/app

#Environment Variables
ARG REACT_APP_AUTH_API
ARG REACT_APP_DRIVE_API

# Build
RUN npm run build

EXPOSE 5000

ENTRYPOINT ["./node_modules/.bin/serve", "-s", "build"]
