#!/usr/bin/env sh

# 忽略错误
set -e

dist_path=docs/.vuepress/dist # 打包生成的文件夹路径
# 构建
npm run build

# 进入待发布的目录
cd docs/.vuepress/dist

# 发布到自定义域名
echo 'shenshuai89.github.io' > CNAME

git config --global user.email "shenshuai89@qq.com"
git config --global user.name "shenshuai89"

git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
git push -f git@github.com:shenshuai89/shenshuai89.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
rm -rf $dist_path