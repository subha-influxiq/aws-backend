#!/bin/sh

ng build --prod

cd dist/

aws --profile default s3 sync browser s3://testbedpece.influxiq.com --acl public-read  --cache-control max-age=0