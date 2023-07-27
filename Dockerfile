FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./index.js ./
COPY ./src ./src
COPY ./env ./env
COPY ./.sequelizerc ./.sequelizerc

RUN npm install

COPY ./main.sh /main.sh
RUN chmod +x /main.sh

CMD ["/main.sh"]
