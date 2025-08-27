#!/usr/bin/env sh

# 忽略错误
set -e

dist_path=docs/.vuepress/dist # 打包生成的文件夹路径
# 构建
npm run build

# 进入待发布的目录
cd docs/.vuepress

# 压缩dist目录
zip -r dist.zip dist

# 上传到服务器
scp -r dist.zip root@1.116.36.35:/data/web/blog

# 登录服务器
ssh root@1.116.36.35
