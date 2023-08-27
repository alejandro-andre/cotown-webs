#!/bin/bash
cd /home/cotown/www/webs
git pull
#docker restart web
docker exec web bash config/publish.sh vanguard
docker logs -f web