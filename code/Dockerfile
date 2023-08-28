FROM node:18
WORKDIR /app
ADD package.json /app
RUN apt update
RUN apt install -y rsync
RUN npm i
CMD ["tail", "-f", "/dev/null"]
