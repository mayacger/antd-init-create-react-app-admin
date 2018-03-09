## 说明

+ 基于 Ant Design 
+ 参考 ant-design-pro
- 但是 ant-design-pro 使用了阿里开发 dva、roadhog等工具，对初学者难度增大。
- 所以默认采用了 create-react-app，关于ant-design在create-react-app一些配置请参考 [使用文档](https://ant.design/docs/react/use-with-create-react-app-cn)。
- 没有采用redux-saga，也是便于初学redux简单些。

## 已知问题
— 没有实现less 做为对象引入，即 import style from './index.less' 模式，目前暂时使用 import './index.less'，因此有可能污染全局css，请注意css命名。


## proxy
在package.json添加

```
	"proxy": "http://api.yoursite.com",
```
特定配置
```
	"proxy": {
    "/api": {
      "target": "http://api.yoursite.com",
      "changeOrigin": true,
      "secure": false
    },
    "/api2": {
      "target": "http://api.yoursite.com",
      "changeOrigin": true,
      "secure": false
    }
  },
```


## 使用

```bash
$ git clone 
$ cd 
$ npm i or yarn
$ yarn start        
```
## 兼容性

现代浏览器及 IE11。


## thanks
	ant-design-pro

