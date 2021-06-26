FROM node
WORKDIR /browserlseeBackend
COPY package.json .
RUN npm install
COPY Browserless-Backend ./
CMD ["node","main.js"]