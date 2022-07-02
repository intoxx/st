#!/usr/bin/env sh
set -ex
cd "$(dirname "$0")"

NAME=st
PORT=3000
BASE_IMAGE=docker.io/node:18.3.0-alpine3.16

CNTR=`buildah from $BASE_IMAGE`

buildah config --author "Lucas Pruvost" --workingdir /usr/app $CNTR
buildah config --port $PORT $CNTR
buildah config --label name=$NAME $CNTR
buildah config --cmd "npm run dev" $CNTR

buildah add $CNTR ../app/package*.json .
buildah run $CNTR npm ci

buildah commit $CNTR $NAME
buildah rm $CNTR
