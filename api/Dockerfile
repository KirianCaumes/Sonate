FROM node:11.15-alpine
  
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "./index.js"]