#!/bin/bash
find code/.cache -type f -mmin +120 -exec rm {} \;
export DEBUG="Eleventy*"
npx @11ty/eleventy --config=config/.$1-draft.js
echo 'Done!'