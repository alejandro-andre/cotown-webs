FROM node:18
WORKDIR /app
ADD package.json /app
ADD start.sh /app
RUN npm i
CMD ["/bin/bash", "./start.sh"]
