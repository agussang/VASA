#!/bin/sh
set -ex

git tag -a dev$2 -m "Deployment tag $1"
git push origin --tags

cd dist/
git init || true
git remote add origin git@git.imaniprima.co.id:pelindo3/vasa-webapp-release.git || true
git fetch origin
git reset --mixed origin/master
git add -A
git commit -m "Deployment update $1" --allow-empty
git tag -a dev$2 -m "Deployment tag $1"
git push origin --tags
git push origin master
cd ..
