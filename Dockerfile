FROM node:lts-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
RUN npm run ts-build
CMD [ "node", "server.js" ]
