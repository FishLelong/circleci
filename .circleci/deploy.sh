# #!/usr/bin/env sh

# # 终止一个错误
# set -e

# git config --global user.email "619248643@qq.com"
# git config --global user.name "FishLelong"


# # 构建
# npm run build

# # 进入生成的构建文件夹
# # cd cep/build

# # 如果你是要部署到自定义域名
# # echo 'www.example.com' > CNAME

# git init
# git add -A
# git commit -m 'deploy'

# echo "before push"
# git pull
# # 如果你想要部署到 https://<USERNAME>.github.io
# git remote add prod ssh://root@106.14.41.251/root/cep/circleci/.git
# git push prod master
# # git push ssh://root@106.14.41.251/root/cep/circle.git
# echo "after push"
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


#!/bin/sh
# 开头的这一句是为了标识我是一个shell脚本，按照shell进行执行
# 出现非0错误 终止脚本 
set -e
# 打印当前的工作路径
pwd
# 查看当前目录下的文件信息
ls -la
# 定义远程仓库地址变量
remote=$(ssh://root@106.14.41.251/root/cep/circleci/.git)
echo 'remote address is: '$remote

# 新建一个发布项目的目录
mkdir git-pages-rp
cd git-pages-rp

# 创建的一个新的仓库
# 设置发布的用户名与邮箱 这里的邮箱和用户名都是取自上面设置的环境变量
git config --global user.email "$GH_EMAIL" >/dev/null 2>&1 # 这里的处理是为了不让其输出信息到控制台
git config --global user.name "$GH_NAME" >/dev/null 2>&1 # 这里的处理是为了不让其输出信息到控制台
# 初始化一个临时的git仓库
git init
# 和远程仓库建立关联
git remote add --fetch origin "$remote" #这里的remote是上面定义的变量

# 切换gh-pages分支
# 验证git 是否存在gh-pages分支 如果存在则切换 不存在则创建一个空历史分支
if git rev-parse --verify origin/gh-pages >/dev/null 2>&1; then
  # 检出此分支
  git checkout gh-pages
  # 删除掉旧的文件内容
  git rm -rf .
else
  git checkout --orphan gh-pages
fi

# 把构建好的文件目录给拷贝进来
cp -a "../${STATIC_SOURCE}/." .
# 查看拷贝的文件
ls -la

# 把所有的文件添加到git
git add -A
# 添加一条提交内容
git commit --allow-empty -m "Deploy to GitHub pages [ci skip]" # 【ci skip】是为了跳过ci的构建
# 推送文件
git push --force --quiet origin gh-pages
# 资源回收，删除临时分支与目录
cd ..
rm -rf git-pages-rp

echo "Delpoy Sucessful"