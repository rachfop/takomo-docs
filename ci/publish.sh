#!/bin/bash -e

# Change to dir containing this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"
cd ..

aws s3 sync \
  --delete \
  --cache-control "public, max-age=60" \
  --exclude "*" \
  --include "*.html" \
  build s3://takomo-website/

aws s3 sync \
  --delete \
  --cache-control "public, max-age=604800" \
  --exclude "*.html" \
  build s3://takomo-website/
