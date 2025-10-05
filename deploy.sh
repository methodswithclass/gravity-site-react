#!/bin/bash
set -e 

echo "beginning build process"

ENV=$1

rm -rf build/*

env-cmd -f .env.$ENV npm run build
aws s3 sync ./build s3://$ENV-gravity-infra-frontend

if [ $ENV == "prod" ]; then
  CLOUDFRONT_DISTRIBUTION_ID="E339SDOL2JSFRM"
elif [ $ENV == "dev" ]; then
  CLOUDFRONT_DISTRIBUTION_ID="E3G0O3MPSSOYXF"
else
  echo "unknown environment: $ENV"
  exit 1
fi

aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

echo "done"