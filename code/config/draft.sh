#!/bin/bash
rm -r .cache
npx @11ty/eleventy --config=config/.$1-draft.js
echo 'Done!'