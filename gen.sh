#!/bin/bash
cd /home/cotown/www/webs
git pull
docker start web
docker logs -f web