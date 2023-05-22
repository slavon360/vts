FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

# RUN npm install -g nodemon

CMD npm run build:script-dev js/modules/checkout watch;