#!/bin/bash
cd /home/cotown/www/webs
git pull
docker restart web
docker exec web bash config/$1.sh $2
docker logs -f web