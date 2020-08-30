#!/bin/bash -e

echo "Latest version:  $LATEST_RELEASE"
echo "Current version: $CURRENT_RELEASE"

# Change to dir containing this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"
cd ..

if [[ "$LATEST_RELEASE" == "$CURRENT_RELEASE" ]]; then
  echo "Current release $CURRENT_RELEASE is the latest, proceed to publishing"
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
else
  echo "Current release $CURRENT_RELEASE is not the latest $LATEST_RELEASE, skip publishing"
fi
