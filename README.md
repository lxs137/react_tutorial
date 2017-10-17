##  ReactJS 教程

[TOC]


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
* 使用[Create-React-APP](https://github.com/facebookincubator/create-react-app)快速搭建React开发环境
```bash
npm install -g create-react-app
create-react-app my-app
cd my-app
```

* 使用Create-React-APP创建的React应用目录结构：
	* package.json存有该项目的依赖模块信息；
	* public/目录下为应用的静态资源文件；
	* src/目录下为应用的源代码；
	* src/index.js为应用入口；
	* src/App.js为应用的主界面；
	* src/registerServiceWorker.js提供在生产环境下进行资源缓存的功能：

![](https://raw.githubusercontent.com/lxs137/react_tutorial/master/front/md_resource/3.png)

* 使用预设命令自动开发，调试，打包JavaScript源码(webpack)
```bash
# 启动开发调试服务器(默认在http://localhost:3000)，对"/src"目录下的更改会实时反应到浏览器中
npm run start
# 打包后文件生成在"/build"目录下，入口为index.html
npm run build
```

* 查看package.json文件中的scripts项，发现"npm run start" 和 "npm run build"命令实质上是调用了模块react-scripts模块的相应预设命令：

![](https://raw.githubusercontent.com/lxs137/react_tutorial/master/front/md_resource/2.png)

* react-scripts模块中存有预设的webpack配置，如果想要修改默认的webpack配置文件，就比较麻烦，具体操作请参照[Customize Webpack Config In Create-React-APP](https://daveceddia.com/customize-create-react-app-webpack-without-ejecting/)或者使用[react-app-rewired](https://github.com/timarney/react-app-rewired)

### 1.3 Text editor
* Visual Studio Code
* Atom
* Sublime Text 3
* WebStorm

### 2. React基础特性
### 2.1 [JSX语法](https://reactjs.org/docs/introducing-jsx.html)
对Javascript语法的拓展，添加了对"React DOM"的描述的相关语法糖：
![](https://raw.githubusercontent.com/lxs137/react_tutorial/master/front/md_resource/4.png)

特点：
* 遇到 XML 标签 <...>，以 XML 规则解析；遇到代码块 {...}，就用 JavaScript 规则解析；
* 在JSX中，XML可以理解为是创建"React DOM"对象的语法糖；在编译之后呢，会被转化为 React.createElement() 函数的调用

![](https://raw.githubusercontent.com/lxs137/react_tutorial/master/front/md_resource/5.png)

* JSX使用"驼峰命名法"来定义属性的名称，而不是使用传统HTML的属性名称；如：class用 className代替
* "React DOM"在渲染之前默认会过滤所有传入的值。它可以确保应用不会被注入攻击

### 2.2 虚拟DOM
* 抽象性：将“前端JS如何根据业务逻辑组织页面”和“如何根据页面组织渲染出真正的可供展示的页面”分割开来。
![](https://raw.githubusercontent.com/lxs137/react_tutorial/master/front/md_resource/6.png)

* 高性能：当页面的状态变更时，用新生成的React对象树去和旧的React对象树进行对比，记录这两棵树差异。然后把这些差异应用，渲染在真正的 DOM 树上。

### 2.3 [Component](https://reactjs.org/docs/react-component.html)
* 组件是一个独立的，可重用的页面功能模块。接收输入(props)，渲染出React Element
* 每个组件的render函数被调用渲染时，也会触发子组件的render方法渲染子组件
* 组件render的返回值中，顶层标签只能有一个
* 组件的render允许返回null，此时该组件不会被渲染
```Javascript
class Welcome extends React.Component {
	constructor(props) {
    	super(props);
        // 设定state初始值
        this.state = { time: new Date() };
        // 每隔2000ms，更新一次state值，render函数被调用，组件重绘
        setInterval(() => {
        	this.setState({
            	time: new Date()
            })
        }, 2000);
    }
	render() {
    	return (
        	<div>
        		<h1>Hello, {this.props.name}!</h1>
        		<h2>It is {this.state.time.toLocaleTimeString()}.</h2>
      		</div>
        );
	}
}
```

### 2.4 [props和state](https://reactjs.org/docs/state-and-lifecycle.html)
* props是Component的输入参数，为只读，不允许在Component的代码中修改其props的值，一般是由上层Component传入。
* state一般也只能在Component的构造函数中设置初始化值，每当state的值发生变化，Component的render函数会被调用，重新渲染生成React element。
* state的值不能直接使用“=”更新，需要使用setState函数
```javascript
// 错误
this.state.time = new Date();
// 正确，如果state还有其他属性，此时不会受影响，只更新time属性
this.setState({
	time: new Date()
});
```
* state的更新是异步的，并且React可能会将多处state的更改合并，只调用一次render函数，以提高性能
```javascript
// 如果你需要state中的一个属性具有自增的特性
// 错误的做法
this.setState({
    counter: this.state.count + 1,
 });
// 正确的做法
this.setState((prevState) => ({
    counter: prevState.count + 1
 }));
```

### 2.5 [Component生命周期](https://reactjs.org/docs/react-component.html#the-component-lifecycle)
* 所有Component都有一系列可以被override的生命周期方法，这些方法会在一个Component的渲染进程中被反复依次调用。
* Component的生命周期主要分为Mount，Update，Unmount三个大的阶段
* Mount：Component第一次被创建，将组件相应React Element绘制到真正的DOM上
	*  constructor()
	*  componentWillMount()
	*  render()
	*  componentDidMount()
* Update：Component的props或者state更新时，组件重新绘制，DOM不会被移除
	*  componentWillReceiveProps()
	*  shouldComponentUpdate()
	*  componentWillUpdate()
	*  render()
	*  componentDidUpdate()
* Unmount：Component被从DOM上移除
	*  componentWillUnmount()
* 当渲染出现问题时，调用componentDidCatch()函数，进行错误处理

## 3 Todo Example
首先，使用create-react-app创建应用
### 3.1 依赖的第三方库
* [axios](https://github.com/axios/axios) (浏览器端的HTTP库，类似ajax中的$)
`npm install axios --save`

### 3.1 使用[Ant Design](https://ant.design/index-cn)

* Ant Design：UI设计框架，类似Bootstrap，但Ant Design与React结合的更好
* 如何在react中使用：参考官方的例子([在create-react-app中使用](https://ant.design/docs/react/use-with-create-react-app-cn))

1. 安装相应依赖
```bash
npm install antd react-app-rewired babel-plugin-import --save
```
2. 修改package.json
```javascript
"scripts": {
       "start": "react-app-rewired start",
       "build": "react-app-rewired build",
       "test": "react-app-rewired test --env=jsdom",
}
```
3. 在应用根目录创建config-overrides.js
```javascript
const { injectBabelPlugin } = require('react-app-rewired');
module.exports = function override(config, env) {
		config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config);
		return config;
};
```
4. 在需要的Component中import相应的Ant Design组件
`import { Button } from 'antd'`

3.2 