#!/bin/bash
find .cache -type f -mmin +120 -exec rm {} \;
npx @11ty/eleventy --config=config/.$1-draft.js
echo 'Done!'