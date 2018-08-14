FROM node:9
WORKDIR /app

COPY . /app

RUN npm install -g nodemon

EXPOSE 5555

CMD [“node”, “app/server.js”]
