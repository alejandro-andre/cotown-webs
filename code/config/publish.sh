#!/bin/bash
find code/.cache -type f -mmin +120 -exec rm {} \;
export DEBUG="Eleventy*"
npx @11ty/eleventy --config=config/.$1.js
rsync -rcni /app/sites/$1-publish/ /app/sites/$1/ | cut -d" " -f2 | while read -r line; do
  echo /app/sites/$1-publish/$line
  rsync -ai /app/sites/$1-publish/$line /app/sites/$1/$line
done
echo 'Done!'