FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./index.js ./
COPY ./src ./src
COPY ./env ./env

RUN npm install

CMD ["npm","start"]
