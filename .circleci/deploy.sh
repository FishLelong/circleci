#!/usr/bin/env sh

# 终止一个错误
set -e

git config --global user.email "619248643@qq.com"
git config --global user.name "FishLelong"


# 构建
npm run build

# 进入生成的构建文件夹
# cd cep/build

# 如果你是要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

echo "before push"
git pull
# 如果你想要部署到 https://<USERNAME>.github.io
git remote add prod ssh://root@106.14.41.251/root/cep/circle.git
git push prod master
# git push ssh://root@106.14.41.251/root/cep/circle.git
echo "after push"
# cd -

# 检查git remote是否有对应的部署地址,没有则添加. 用来部署项目时使用
#!/bin/sh
#要部署的项目服务器目录地址,包含生产环境项目地址和预演环境地址
# server_paths=(
# /root/cep
# )
# #要部署的服务器地址
# servers=(
# ssh://root@106.14.41.251:22
# )
# remotes=$(/usr/bin/git remote)
# echo $remotes
# i=0
# for server in ${servers[@]}
# do
#     #echo ${server}
#     #部署到指定的server_paths
#     for server_path in ${server_paths[@]}
#     do
#         temp_remote=${server}${server_path}
#         echo ${temp_remote}
#         remote_name=$(echo -n ${temp_remote} | md5sum | awk '{print $1}')
#         echo ${remote_name}
#         remote_names[i]=${remote_name}
#         i=`expr $i + 1`
#         if [[ $remotes == *${remote_name}* ]]
#         then
#         echo "readd"
#         git remote remove ${remote_name}
#         git remote add ${remote_name} ${temp_remote}
#         else
#         echo "first add"
#         git remote add ${remote_name} ${temp_remote}
#         fi
#     done
# done
# git fetch --unshallow
# for remote_name_item in ${remote_names[@]}
# do
# git push -f  ${remote_name_item} master
# done
