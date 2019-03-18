# About

本项目新闻主要以网易新闻的接口为主，涉及到功能主要有 登录、注册、新闻curd、用户curd、推荐、用户中心

_注： 因为数据接口来源于相关网站，该项目纯个人练手为主，不作任何商业用途_
 
# 说明

> news_server 接口文档：[接口文档地址](https://github.com/nbh520/news-server/blob/master/API.md)

> 如果您对此项目有兴趣，可以点个Star支持一下，感谢！

> 开发环境： node:v8.11.2 MongoDB 4.0.3

> 部署环境 阿里云 CentOS 7.4 64位

## 技术栈

nodejs + MongoDB + Express + mongoose + es6/7 + nodemon

## 项目运行

```
项目运行前，请确保安装以下应用
1、node(6.0 及以上)
2、MongoDB(确认开启状态)
3、nodemon (npm install -g nodemon)
```

```

git clone https://github.com/nbh520/news-server.git

cd news-server

npm install

nodemon index

```

## 演示效果

#### （可在后台管理系统添加新闻，视频等数据，并在前端地址查看效果）

### 前端地址
[前端网址戳这里](http://nibohan.xin/news)（请用chrome手机模式预览）

###### 移动端扫描下方二维码

<img src="https://github.com/nbh520/news-server/blob/master/news.png" width="250" height="250"/>

### 后台管理系统地址
> 暂未开始写

## 目标功能

- [x] 获取首页新闻 -- 完成
- [x] 获取新闻 ---完成
- [ ] 获取评论
- [ ] 获取视频
- [ ] 添加新闻
- [ ] 修改新闻
- [ ] 添加新闻
- [ ] 登录注册