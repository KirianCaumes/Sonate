FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm rebuild node-sass
RUN npm run build

FROM mhart/alpine-node
RUN npm -g add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]