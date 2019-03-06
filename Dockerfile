FROM node:10
ENV HOST=0.0.0.0
ENV PORT=80

WORKDIR /usr/src/www
RUN apt-get update
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

COPY . .
RUN yarn install

EXPOSE 80
ENTRYPOINT ["npm", "start"]
