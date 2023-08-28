FROM node:18
WORKDIR /app
ADD package.json /app
RUN apt install rsync
RUN npm i
CMD ["tail", "-f", "/dev/null"]
