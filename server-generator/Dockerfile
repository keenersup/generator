FROM node:latest
COPY package*.json /server/
RUN cd /server; npm install -y \
    && npm audit fix
COPY . /server

WORKDIR /server

ENV SERVER_PORT=8081
EXPOSE 8081

CMD ["npm","run","serve"]