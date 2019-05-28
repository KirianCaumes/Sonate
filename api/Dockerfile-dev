FROM node:11.15-stretch

WORKDIR /app/api

COPY package.json /app/api/package.json

RUN npm install
RUN npm install -g nodemon

EXPOSE 5000

CMD ["nodemon", "-L", "./index.js"]