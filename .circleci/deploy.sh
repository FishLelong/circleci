#!/bin/sh
# 开头的这一句是为了标识我是一个shell脚本，按照shell进行执行
ssh $SSH_USER@$SSH_IP 
cd /root/cep/circleci;
git pull; 