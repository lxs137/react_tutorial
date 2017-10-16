##  ReactJS 教程
### 1. 环境配置
### 1.1 安装Node与npm
Node：https://nodejs.org/en/download/
Node安装完成之后自带npm

npm国内访问速度较慢，使用[npm淘宝源](https://npm.taobao.org/)，加快访问速度
```bash
# 方法1，安装cnpm代替npm
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 方法2，手动在npm命令使用中添加参数切换源
npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"
```
### 1.2 安装React
使用[Create-React-APP](https://github.com/facebookincubator/create-react-app)快速搭建React开发环境
```bash
npm install -g create-react-app
create-react-app my-app
cd my-app
```

### 2. 
