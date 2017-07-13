FROM node:6.9.5

# Install app dependencies
COPY ./src/faifa-node-fake-api/package.json /www/package.json
RUN cd /www; npm install --production

# Copy app source
COPY ./src/faifa-node-fake-api/fakedb.json /www/fakedb.json
COPY ./src/faifa-node-fake-api/server.js /www/server.js

# Set work directory to /www
WORKDIR /www

# start command as per package.json
CMD ["npm", "start"]