FROM node:14.15.0

COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install -g netlify-cli@2.60.0
COPY . .
