npx @11ty/eleventy --config=config/.$1.js
rsync -av --checksum /app/sites/$1-publish/ /app/sites/$1/