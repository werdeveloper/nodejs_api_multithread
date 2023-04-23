FROM node:16.16.0-alpine
WORKDIR /backend-api/build
COPY config /backend-api/build/config
COPY controllers /backend-api/build/controllers
COPY models /backend-api/build/models
COPY routes /backend-api/build/routes
COPY services /backend-api/build/services
COPY app.js /backend-api/build/
COPY config.env /backend-api/build/
COPY index.js /backend-api/build/
COPY index_send_bulk_mail.js /backend-api/build/
COPY package.json /backend-api/build/
COPY Dockerfile /backend-api/build/

RUN npm install
EXPOSE 5001

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
# COPY . .
CMD [ "npm", "start" ]