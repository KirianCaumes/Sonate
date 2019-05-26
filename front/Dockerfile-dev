FROM node:11.15.0-alpine

WORKDIR /app/front

ENV PATH /app/front/node_modules/.bin:$PATH

COPY package.json /app/front/package.json
RUN npm install --silent
RUN npm rebuild node-sass

CMD ["npm", "start"]