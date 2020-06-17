# 用户配置/查看

    git config --global user.name "name"  / git config user.name
    git config --global user.email "name" / git config user.email

# 1 .创建仓库 master

```
change file ...
git add . / xxx.xxx
git commit  / commit -m 'xxx'
git push
```

# 2.分支

```
git checkout -b name / git branch name => git checkout name
change file ...
git add . / xxx.xxx
git commit  / commit -m 'xxx'
(git push 可直接创建远程分支更新代码 )


```

# 3.合并

```
git checkout master
git merge name(分支名称)
git push
```

# 4.拉取

```
master拉取
git clone htpp://xxxxxx.git

远程分支拉取
git fetch origin name(分支名称)
```

# 5.删除

```
删除远程分支
git push origin --delete name

删除本地分支
git branch -d name
```

# 6.连接

```
连接创库
git remote add  origin(自己定义的名称)  https://xxxxx
关联仓库
git push--set-upstream-to origin master


```
