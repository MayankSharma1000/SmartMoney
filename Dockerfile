FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /app/server

EXPOSE 5500

CMD ["node", "server.js"]