FROM node
WORKDIR /browserlessBackend
COPY package.json .
RUN npm install
COPY Browserless-Backend /browserlessBackend/app
CMD ["node", "./app/main.js"]