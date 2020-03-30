# build environment
FROM node:alpine

WORKDIR /app

# Install PM2 globally
RUN npm install --global pm2

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json


# Install dependencies
RUN npm install --production

RUN npm install react-scripts -g --silent

COPY . /app

RUN npm run build


# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
USER node

# Launch app with PM2
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]

