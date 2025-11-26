FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "start"]
