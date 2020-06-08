FROM node:erbium-alpine

WORKDIR /opt/graphql-service/app

RUN npm i -g ts-node

EXPOSE 4000

CMD ["ts-node", "./src/main"]

