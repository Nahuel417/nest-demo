FROM node:18

WORKDIR /ecommerce-nahuel417

COPY ./ecommerce-nahuel417/package.json ./ecommerce-nahuel417/package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
