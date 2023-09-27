#!/bin/bash
cd /home/cotown/www/webs
git checkout ${3:-"master"}
git pull
docker restart webgen
docker exec webgen bash config/$1.sh $2
docker logs -f webgen