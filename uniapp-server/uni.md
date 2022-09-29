

# Uniapp开发环境搭建

1.下载开发工具HbuilderX

2.创建uni-app项目

3.运行uni-app

4.发布uni-app



# 介绍项目目录和文件作用

- **pages：**所有页面存放目录
- **static**： 存放应用引用的本地静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
- **components：**符合vue组件规范的uni-app组件目录
- **main.js**   ：Vue初始化入口文件
-  **App.vue**：应用配置，用来配置App全局样式以及监听 应用生命周期
-  **manifest.json**：配置应用名称、appid、logo、版本等打包信息，详见
-  **pages.json**：配置页面路由、导航条、选项卡等页面类信息，详见
-  **uni.scss**：这里是uni-app内置的常用样式变量 
-  **unpackage**：非工程代码，一般存放运行或发行的编译结果


`uni-app`约定了如下开发规范：

- 页面文件遵循Vue单文件组件（SFC）规范
- 组件标签靠近小程序规范，详见uni-app组件规范
- 接口能力（JS API）靠近微信小程序规范，但需将浅醉`wx`替换为uni，
- 数据绑定及事件处理我那个Vue.jd规范，同时补充了App及页面的生命周期
- 为兼容多端运行，建议使用flex布局进行开发



# 全局文件

### pages.json 页面路由

​	`pages.json`文件用来对uni-app进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar等。

**配置项列表：**

| 属性            | 类型         | 必填 | 描述                   |
| --------------- | ------------ | ---- | ---------------------- |
| **globalStyle** | Object       | 否   | 设置默认窗口的表现     |
| **pages**       | Object Array | 是   | 设置页面路径及窗口表现 |
| **easycom**     | Object       | 否   | 组件自动引入规则       |
| **tablBar**     | Object       | 否   | 设置底部tab的表现      |
| **condition**   | Object       | 否   | 启动模式配置           |
| **subPackages** | Object Array | 否   | 分包加载配置           |
| **preloadRule** | Object       | 否   | 分包预下载规则         |
| **workers**     | String       | 否   | `Worker`代码放置的目录 |
| **leftWindow**  | Object       | 否   | 大屏左侧窗口           |
| **topWindow**   | Object       | 否   | 大屏顶部窗口           |
| **rightWindow** | Object       | 否   | 大屏右侧窗口           |
| **unildRouter** | Object       | 否   | 自动跳转相关配置       |



#### globalStyle	全局配置

​	用于设置应用的状态栏、导航条、标题、窗口背景色等

| 属性                         | 类型     | 默认值   | 描述                                                         |
| ---------------------------- | -------- | -------- | ------------------------------------------------------------ |
| navigationBarBackgroundColor | hexColor | #F7F7F7  | 导航栏背景色（同状态栏背景色）                               |
| navigationBarTextStyle       | String   | white    | 导航栏标题颜色及状态栏前景颜色，仅black和white               |
| navigationBarTitleText       | String   |          | 导航栏标题文字内容                                           |
| navigationStyle              | String   | default  | 导航栏样式，仅default和custome，custome即取消默认的原生状态栏 |
| backgroundColor              | hexColor | #ffffff  | 下拉显示出来的背景色                                         |
| backgroundTextStyle          | String   | dark     | 下拉loading的样式，仅支持dark/light                          |
| enablePullDownRefresh        | Boolean  | false    | 是否开启下拉刷新                                             |
| onReachBottomDistance        | Number   | 50       | 页面上拉触底事件触发时距页面底部距离，单位只支持px           |
| pageOrientation              | String   | portrait | 横屏设置，屏幕旋转设置，仅支持auto/portrait/landscape        |
| mp-weixin                    | Object   |          | 设置编译到 mp-weixin 平台的特定样式                          |
| usingComponents              | Object   |          | 引用小程序组件                                               |
| renderingMode                | String   |          | 同层渲染，webrtc(实时音视频) /无法正常时尝试配置 seperated 强制关掉同层 |

注意：

- `globalStyle`中设置的`titleImage`也会覆盖`pages`->`style`内设置的文字标题



#### **pages** 页面路径

`uni-app`通过pages节点配置应用由哪些页面组成，pages节点接收一个数组，数组每个项都是一个对象，其属性值如下：

| 属性  | 类型   | 描述                           |
| ----- | ------ | ------------------------------ |
| path  | String | 配置页面路径（不要写绝对路径） |
| style | Object | 配置页面窗口表现               |

注意：

- pages节点的第一项为应用入口页（即首页）
- **应用中新增/减少页面**，都需要对 pages 数组进行修改
- 文件名**不需要写后缀**，框架会自动寻找路径下的页面资源

##### **style**

​	用于设置每个页面的状态栏、导航条、标题、窗口背景色等。页面中配置项会覆盖 [globalStyle](https://uniapp.dcloud.net.cn/collocation/pages#globalstyle) 中相同的配置项（globalStyle有的style大多数可以使用）

| 属性            | 类型     | 默认值  | 描述                                                         |
| --------------- | -------- | ------- | ------------------------------------------------------------ |
| disableScroll   | Boolean  | false   | 设置为true则页面整体不能上下滚动（bounce效果），只要在页面配置中有效，在globalStyle中无效 |
| backgroundColor | HexColor | #ffffff | 窗口的背景色                                                 |

```js
{
  "pages": [{
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页",//设置页面标题文字
        "enablePullDownRefresh":true//开启下拉刷新
      }
    },
    ...
  ]
}
```



#### tabBar 导航栏

如果应用是一个多tab应用，可以通过tabBar配置项指定一级导航栏，以及tab切换时显示的对应的页。

在pages.json中提供了tabBar配置，不仅仅是为了方便开发导航，更重要的是在App和小程序端提供性能。在这两个平台，底层原生引擎在启动时无需等待js引擎初始化，即可直接读取pages.json中配置的tabBar信息，渲染原生tab。

注意：

- 当设置position为top时，不会显示icon
- tabBar中**list**是一个数组，只能配置最少两个、最多5getab，tab俺属猪的顺序排序
- tabbar切换第一次加载时可能渲染不及时，可以在每个tabbar页面的onLoad声明周期里先弹出一个等待雪花
- tabbar的页面展示过一次后就保留在内存中，再次切换tabbar页面，只会触发每个页面的onShow，不会再触发onLoad
- 顶部的tabbar目前仅微信小程序上支持。需要用到顶部选项卡的话，建议不使用tabbar的顶部设置，而是自己做顶部选项卡

**属性说明**

| 属性               | 类型   | 描述                                                         | 平台差异 |
| ------------------ | ------ | ------------------------------------------------------------ | -------- |
| color(*)           |        | tab上的文字摸摸人颜色                                        |          |
| selectColor(*)     |        | tab上的文字选中时的颜色                                      |          |
| backgroundColor(*) |        | tab的背景色                                                  |          |
| borderStyle        | style  | tabbar上边框的颜色，可选值black(默认值)/white，也支持其他颜色值 |          |
| list               | Array  | tab列表，最少两个、最多5个tab                                |          |
| position           | String | 可选值bottom、top                                            | 微信     |
| fontSize           | String | 文字默认大小                                                 |          |
| iconWidth          | String | 图标默认宽度（高度等比缩放）                                 | App、H5  |
| spacing            | String | 图标和文字的间距                                             | App、H5  |
| height             | String | tabBar默认高度(50px)                                         | App、H5  |
| midButton          | Object | 中间按钮 进在list项为偶数是有效                              | App、H5  |

**list**：接收一个数组，数组中的每个项都是一个对象，其属性值如下：

| 属性             |                                                              |
| ---------------- | ------------------------------------------------------------ |
| pagePath(*)      | 页面路径，必须在pages中先定义                                |
| text(*)          | tab上按钮文字，在App和H5中非必填                             |
| iconPath         | 图片路径，icon大小限制为40kb，建议尺寸为81px*81px，不支持网络图片，不支持字体图标 |
| selectedIconPath | 选中时的图片路径                                             |
| visible          | 该项是否显示，默认显示（Boolean）                            |
| iconfont         | 字体图标，优先级高于iconPath                                 |

**midButton**

| 属性            | 默认值 | 描述                                                 |
| --------------- | ------ | ---------------------------------------------------- |
| width           | 80px   | 中间按钮的宽度                                       |
| height          | 50px   | 中间按钮的高度，可大于tabBar高度，达到中间凸起的效果 |
| text            |        | 中间按钮的文字                                       |
| iconWidth       | 24px   | 图片狂赌（高度等比例缩放）                           |
| backgroundImage |        | 中间南牛的背景图片路径                               |
| iconfont        |        | 字体图标，优先级高于iconPath                         |

midButton没有pagePath，需监听点击事件，字型处理点击行为逻辑。监听点击事件为调用API：uni.onTabBarMidButtonTap

**iconfont参数说明：**

| 属性          | 类型   | 说明                  |
| :------------ | :----- | :-------------------- |
| text          | String | 字库 Unicode 码       |
| selectedText  | String | 选中后字库 Unicode 码 |
| fontSize      | String | 字体图标字号(px)      |
| color         | String | 字体图标颜色          |
| selectedColor | String | 字体图标选中颜色      |

**自定义tabbar**

处理H5端，自定义tabBar的性能体验会低于原生tabBar。App和小程序端非必要不要自定义

```json
"tabBar": {
	"color": "#7A7E83",
	"selectedColor": "#3cc51f",
	"borderStyle": "black",
	"backgroundColor": "#ffffff",
	"list": [{
		"pagePath": "pages/component/index",
		"iconPath": "static/image/icon_component.png",
		"selectedIconPath": "static/image/icon_component_HL.png",
		"text": "组件"
	}, {
		"pagePath": "pages/API/index",
		"iconPath": "static/image/icon_API.png",
		"selectedIconPath": "static/image/icon_API_HL.png",
		"text": "接口"
	}]
}
```



### manifest.json 应用配置

`manifest.json`文件是应用的配置文件，用于指定应用的名称、图标、权限等。

简介：uni-app项目中，一个页面就是符合一个Vue SFC规范的`.vue`文件或`.nvue`文件

HbuilderX创建的工程此文件在根目录，cli创建的工程此文件在src目录

#### 配置项列表

| 属性           | 默认值                      | 描述                 |
| -------------- | --------------------------- | -------------------- |
| name           |                             | 应用名称（String）   |
| appid          | 新建uni-app项目时，云端分配 | 应用标识             |
| description    |                             | 应用描述             |
| networkTimeout | 60秒                        | 各类网络请求超时时间 |
| uniStartistics |                             | uni统计配置项        |

更多详情见官网



### uni.scss

 `uni.scss`文件的用途是为了方便整体控制应用的风格。比如按钮颜色、边框风格，`uni.scss`文件里预置了一批scss变量预置。 

 `uni.scss`是一个特殊文件，在代码中无需 import 这个文件即可在scss代码中使用这里的样式变量。 

 如果开发者想要less、stylus的全局使用，需要在vue.config.js中自行配置webpack策略。 

**注意：**

1. 如要使用这些常用变量，需要在 HBuilderX 里面安装 scss 插件；
2. 使用时需要在 style 节点上加上 `lang="scss"`。

```html
<style lang="scss">
</style>
```

3. pages.json不支持scss，原生导航栏和tabbar的动态修改只能使用js api

** **以下是 uni.scss 的相关变量：** **

```css
/* 颜色变量 */

/* 行为相关颜色 */
$uni-color-primary: #007aff;
$uni-color-success: #4cd964;
$uni-color-warning: #f0ad4e;
$uni-color-error: #dd524d;

/* 文字基本颜色 */
$uni-text-color:#333;//基本色
$uni-text-color-inverse:#fff;//反色
$uni-text-color-grey:#999;//辅助灰色，如加载更多的提示信息
$uni-text-color-placeholder: #808080;
$uni-text-color-disable:#c0c0c0;

/* 背景颜色 */
$uni-bg-color:#ffffff;
$uni-bg-color-grey:#f8f8f8;
$uni-bg-color-hover:#f1f1f1;//点击状态颜色
$uni-bg-color-mask:rgba(0, 0, 0, 0.4);//遮罩颜色

/* 边框颜色 */
$uni-border-color:#c8c7cc;

/* 尺寸变量 */

/* 文字尺寸 */
$uni-font-size-sm:24rpx;
$uni-font-size-base:28rpx;
$uni-font-size-lg:32rpx;

/* 图片尺寸 */
$uni-img-size-sm:40rpx;
$uni-img-size-base:52rpx;
$uni-img-size-lg:80rpx;

/* Border Radius */
$uni-border-radius-sm: 4rpx;
$uni-border-radius-base: 6rpx;
$uni-border-radius-lg: 12rpx;
$uni-border-radius-circle: 50%;

/* 水平间距 */
$uni-spacing-row-sm: 10px;
$uni-spacing-row-base: 20rpx;
$uni-spacing-row-lg: 30rpx;

/* 垂直间距 */
$uni-spacing-col-sm: 8rpx;
$uni-spacing-col-base: 16rpx;
$uni-spacing-col-lg: 24rpx;

/* 透明度 */
$uni-opacity-disabled: 0.3; // 组件禁用态的透明度

/* 文章场景相关 */
$uni-color-title: #2C405A; // 文章标题颜色
$uni-font-size-title:40rpx;
$uni-color-subtitle: #555555; // 二级标题颜色
$uni-font-size-subtitle:36rpx;
$uni-color-paragraph: #3F536E; // 文章段落颜色
$uni-font-size-paragraph:30rpx;
```





### App.vue

是`uni-app`的主组件，所有页面都是在`App.vue`下进行切换的，是页面入口文件。但`App.vue`本身不是页面，这里不能编写视图元素，也就是没有` <template> `

这个文件的作用包括：调用应用声明周期函数、配置全局样式、配置全局的存储globalData

应用生命周期仅在`App.vue`中监听，在页面监听无效。

#### 应用生命周期

`uni-app` 支持如下应用生命周期函数：

| 函数名               | 说明                                                         |
| :------------------- | :----------------------------------------------------------- |
| onLaunch             | 当`uni-app` 初始化完成时触发（全局只触发一次）               |
| onShow               | 当 `uni-app` 启动，或从后台进入前台显示                      |
| onHide               | 当 `uni-app` 从前台进入后台                                  |
| onError              | 当 `uni-app` 报错时触发                                      |
| onUniNViewMessage    | 对 `nvue` 页面发送的数据进行监听，可参考 [nvue 向 vue 通讯(opens new window)](https://uniapp.dcloud.io/tutorial/nvue-api?id=communication) |
| onUnhandledRejection | 对未处理的 Promise 拒绝事件监听函数（2.8.1+）                |
| onPageNotFound       | 页面不存在监听函数                                           |
| onThemeChange        | 监听系统主题变化                                             |

**示例代码**

```html
<script>
	// 只能在App.vue里监听应用的生命周期
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
```

#### globalData

 小程序有globalData，这是一种简单的全局变量机制。这套机制在uni-app里也可以使用，并且全端通用。 

```html
<script>  
    export default {  
        globalData: {  
            text: 'text'  
        }
    }  
</script>  
```

js中操作globalData的方式如下

`getApp().globalData.text = 'test'`

-  在应用**onLaunch**时，getApp对象还未获取，暂时可以使用`this.globalData`获取globalData。 

-  globalData是简单的全局变量，如果使用状态管理，请使用`vuex`（main.js中定义） 

#### 全局样式

 在`App.vue`中，可以定义一些全局通用样式，例如需要加一个通用的背景色，首屏页面渲染的动画等都可以写在App.vue中。 



### main.js

 `main.js`是 uni-app 的入口文件，主要作用是初始化`vue`实例、定义全局组件、使用需要的插件如 vuex。 

1.  首先引入了`Vue`库和`App.vue`，创建了一个`vue`实例，并且挂载`vue`实例。 

   ```js
   import App from './App'
   import {createSSRApp} from 'vue'
   export function createApp(){
       const app = createSSRApp(app)
       return {
           app
       }
   }
   ```

2.  使用`Vue.use`引用插件；使用`Vue.prototype`添加全局变量；使用`Vue.component`注册全局组件。  可以引用`vuex`，因涉及多个文件 

3.  无法使用`vue-router`，路由须在`pages.json`中进行配置。 



# 组件

- 组件是视觉层的基本组成单位。
- 组件是一个单独且可复用的功能模块的封装。

每个组件，包括如下几个部分：以组件名称为标记的**开始标签和结束标签、组件内容、组件属性、组件属性值**

```html
<component-name property1="value" property2="value">
	content
</component-name>
```

- 按照vue单文件组件规范，每个vue文件的根节点必须为`<template>`，且这个`<template>`下只能且必须有一个根`<view>`组件

案例：在一个vue页面的根`<view>`组件下插入一个`<button>`组件。

```html
<template>
	<view>
		<button size="mini">按钮</button>
	</view>
</template>
```



#### 公共属性列表

每个组件都有各自定义的属性，当所有uni-app的组件，都有如下属性：

| 属性名 | 类型         | 描述                | 注解                                               |
| ------ | ------------ | ------------------- | -------------------------------------------------- |
| id     | String       | 组件的唯一标识      | 一般用于获取组件上下文对象，需要保持整个页面的位移 |
| ref    | String       | vue中组件的唯一标识 | 用来给子组件注册引用信息                           |
| class  | String       | 组件的样式类        | 在对应的css 中定义的样式类                         |
| style  | string       | 组件的内联样式      | 可以动态设置的内联样式                             |
| hidden | Boolean      | 组件是否隐藏        | 所有组件都是默认显示的                             |
| data-* | Any          | 自定义属性          | 组件上触发事件时，会发送给事件处理函数             |
| @*     | EventHandler | 组件的事件          |                                                    |

还有一类特殊属性以`v-`开头，称之为vue指令，如v-if、v-else、v-for、v-medol。



#### 在组件中使用js变量

组件中可以使用script的data中定义的js变量，但组件的属性中使用和内容区使用的用法不一样

- 在内容区使用时，使用两个花括号`{{data}}`来包裹
- 在属性中使用时，属性名的前面要加冒号前缀

```html
<template>
	<view>
		<button size="mini" :disabled="buttondisble" hover-start-time=20 >{{buttonText}}</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				"buttonText":"按钮",
				"buttondisble":false
			}
		}
	}
</script>
```

#### 组件的事件

每个组件都有“事件”。事件就是在指定条件下触发某个js方法。

- 事件也是组件的属性，只不过这类属性以`@`为前缀

- 事件的属性值，指向一个在script的methods里定义过的js方法，还可以给方法传参数。

```html
<template>
	<view>
		<button size="mini" @click="goto('/pages/about/about')">按钮</button>
	</view>
</template>
<script>
    export default {
        methods: {
            goto(url) {
                console.log("按钮被点击了，且传入的参数是：" + url)
            }
        }
    }
</script>
```



#### 基础组件

uni-app的组件：

- 基础组件

  ​	基础组件在un-app框架中已经内置，无需将内置组件的文件导入项目，也无需注册组件内置组件，随时可以直接使用

- 扩展组件

  ​	除了基础组件外，都成为扩展组件。扩展组件需要将组件导入项目中才可以使用

##### **基础组件列表**

**视图容器**

**视图容器（View Container）：**

| 组件名                                                       | 说明                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [view](https://uniapp.dcloud.net.cn/component/view)          | 视图容器，类似于HTML中的div                                  |
| [scroll-view](https://uniapp.dcloud.net.cn/component/scroll-view) | 可滚动视图容器                                               |
| [swiper](https://uniapp.dcloud.net.cn/component/swiper)      | 滑块视图容器，比如用于轮播banner                             |
| [match-media](https://uniapp.dcloud.net.cn/component/match-media) | 屏幕动态适配组件，比如窄屏上不显示某些内容                   |
| [movable-area](https://uniapp.dcloud.net.cn/component/movable-view#movable-area) | 可拖动区域                                                   |
| [movable-view](https://uniapp.dcloud.net.cn/component/movable-view#movable-view) | 可移动的视图容器，在页面中可以拖拽滑动或双指缩放。movable-view必须在movable-area组件中 |
| [cover-view](https://uniapp.dcloud.net.cn/component/cover-view#cover-view) | 可覆盖在原生组件的上的文本组件                               |
| [cover-image](https://uniapp.dcloud.net.cn/component/cover-view#cover-image) | 可覆盖在原生组件的上的图片组件                               |

**基础内容**

| 组件名                                                       | 说明           |
| :----------------------------------------------------------- | :------------- |
| [icon](https://uniapp.dcloud.net.cn/component/icon)          | 图标           |
| [text](https://uniapp.dcloud.net.cn/component/text)          | 文字           |
| [rich-text](https://uniapp.dcloud.net.cn/component/rich-text) | 富文本显示组件 |
| [progress](https://uniapp.dcloud.net.cn/component/progress)  | 进度条         |

**表单组件**

| 标签名                                                       | 说明                 |
| :----------------------------------------------------------- | :------------------- |
| [button](https://uniapp.dcloud.net.cn/component/button)      | 按钮                 |
| [checkbox](https://uniapp.dcloud.net.cn/component/checkbox)  | 多项选择器           |
| [editor](https://uniapp.dcloud.net.cn/component/editor)      | 富文本输入框         |
| [form](https://uniapp.dcloud.net.cn/component/form)          | 表单                 |
| [input](https://uniapp.dcloud.net.cn/component/input)        | 输入框               |
| [label](https://uniapp.dcloud.net.cn/component/label)        | 标签                 |
| [picker](https://uniapp.dcloud.net.cn/component/picker)      | 弹出式列表选择器     |
| [picker-view](https://uniapp.dcloud.net.cn/component/picker-view) | 窗体内嵌式列表选择器 |
| [radio](https://uniapp.dcloud.net.cn/component/radio)        | 单项选择器           |
| [slider](https://uniapp.dcloud.net.cn/component/slider)      | 滑动选择器           |
| [switch](https://uniapp.dcloud.net.cn/component/switch)      | 开关选择器           |
| [textarea](https://uniapp.dcloud.net.cn/component/textarea)  | 多行文本输入框       |

**路由与页面跳转（Navigation）：**

| 组件名                                                       | 说明                          |
| :----------------------------------------------------------- | :---------------------------- |
| [navigator](https://uniapp.dcloud.net.cn/component/navigator) | 页面链接。类似于HTML中的a标签 |

**媒体组件（Media）：**

| 组件名                                                       | 说明                         |
| :----------------------------------------------------------- | :--------------------------- |
| [audio](https://uniapp.dcloud.net.cn/component/audio)        | 音频                         |
| [camera](https://uniapp.dcloud.net.cn/component/camera)      | 相机                         |
| [image](https://uniapp.dcloud.net.cn/component/image)        | 图片                         |
| [video](https://uniapp.dcloud.net.cn/component/video)        | 视频                         |
| [live-player](https://uniapp.dcloud.net.cn/component/live-player) | 直播播放                     |
| [live-pusher](https://uniapp.dcloud.net.cn/component/live-pusher) | 实时音视频录制，也称直播推流 |

**地图（Map）：**

| 组件名                                            | 说明 |
| :------------------------------------------------ | :--- |
| [map](https://uniapp.dcloud.net.cn/component/map) | 地图 |

**画布（Canvas）：**

| 组件名                                                  | 说明 |
| :------------------------------------------------------ | :--- |
| [canvas](https://uniapp.dcloud.net.cn/component/canvas) | 画布 |

**页面属性配置**

| 组件名                                                       | 说明                 |
| :----------------------------------------------------------- | :------------------- |
| [custom-tab-bar](https://uniapp.dcloud.net.cn/component/custom-tab-bar) | 底部tabbar自定义组件 |
| [navigation-bar](https://uniapp.dcloud.net.cn/component/navigation-bar) | 页面顶部导航         |
| [page-meta](https://uniapp.dcloud.net.cn/component/page-meta) | 页面属性配置节点     |

**uniCloud**

| 组件名                                                       | 说明                         |
| :----------------------------------------------------------- | :--------------------------- |
| [unicloud-db组件](https://uniapp.dcloud.net.cn/uniCloud/unicloud-db) | uniCloud数据库访问和操作组件 |

#### 扩展组件的意义

 虽然所有的业务需求都可以通过基础组件满足，但仅有基础组件是低效的，实际开发中会有很多封装的组件。 

封装扩展组件的优势：

- 可以将组件进行任意次数的复用。
- 合理的划分组件，有助于提高应用性能。
- 代码更加方便组织和管理，并且扩展性也更强，便于多人协同开发。
- 组件化开发能大幅度提高应用开发效率、测试性、复用性等。



## 扩展组件（uni-ui）

 uni-ui不包括基础组件，**它是基础组件的补充**。 

在代码区键入`u`，拉出各种内置或uni-ui的组件列表，选择其中一个，即可使用该组件。 

安装方法：

1. 在HBuilderX 新建uni-app项目的模板中，选择uni-ui模板

2. 通过 uni_modules 单独安装组件

    使用 `uni_modules` 方式安装组件库，可以直接通过插件市场导入，通过右键菜单快速更新组件，不需要引用、注册，直接在页面中使用 `uni-ui` 组件。 

3. npm安装
   

 在 `vue-cli` 项目中可以使用 `npm` 安装 `uni-ui` 库 ，或者直接在 `HBuilderX` 项目中使用 `npm` 。 

   **注意:**  cli 项目默认是不编译 `node_modules` 下的组件的，导致条件编译等功能失效 ，导致组件异常 需要在根目录创建 `vue.config.js` 文件 ，增加 `@dcloudio/uni-ui` 包的编译即可正常 

   ```js
   // vue.config.js
   module.exports = {
   		transpileDependencies:['@dcloudio/uni-ui']
   }
   ```

   

## uni-app数据绑定

在页面助攻需要定义数据，和我们之前的vue一模一样，直接在data中定义数据即可

```js
export default {
    data() {
        return {}
    }
}
```

**插值表达式的使用**

- 利用插值表达式渲染基本数据

  ```html
  <view>{{mas}}</view>
  ```

- 在插值表达式总能使用三元运算

  ```html
  <view>{{flag ? '我是真的' : '我是假的' }}</view>
  ```

- 基本运算



**v-bind动态绑定属性**

利用v-bind进行渲染

```html
<iamge v-bind:src="img"></iamge>
```

还可以缩写成：

```html
<iamge :src="img"></iamge>
```



**v-for的使用**

```html
<view v-for="{item,i} in arr" :key="i">名字：{{item.name}}--年龄：{{item.age}}</view>
```

注意：key是检验元素的唯一标识，必须独一无二（不建议使用索引值来进行标识）。

## uni的事件

#### 事件绑定

和vue中一样的，通过v-on进行事件的绑定，也可以简写为@

```vue
<button @click="tapHandle">
    点我啊
</button>
```

事件函数定义在methods中

```js
methods:[
    tapHandle(){
		console.log("点我了耶")
    }
]
```

#### 事件传参

- 默认如果没有传递参数，事件函数第一个形参为事件对象
- 如果事件函数传递参数了，则对应的事件函数形式接收的这是传递过来的数据
  - 将第一个参数设置为$event则可以得到一个事件对象

#### 生命周期

`uni-app`支持如下页面声明周期函数

| 函数名  | 说明                                |
| ------- | ----------------------------------- |
| onlint  | 监听页面初始化（在onload之前）      |
| onShow  | 当uni-app启动，或从后台进入前台显示 |
| onHide  | 当uni-app从前台进入后台             |
| onError | 当uni-app报错时触发                 |

**页面的生命周期**

| 函数名   | 说明                           |
| -------- | ------------------------------ |
| onlint   | 监听页面初始化（在onload之前） |
| onload   | 监听页面加载                   |
| onShow   | 监听页面显示                   |
| onRead   | 监听页面初始渲染完成           |
| onHide   | 监听页面隐藏                   |
| onUnload | 监听页面卸载                   |





# 网络

### 发起请求

```js
uni.request({
    url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
    data: {
        text: 'uni.request'
    },
    header: {
        'custom-header': 'hello' //自定义请求头信息
    },
    success: (res) => {
        console.log(res.data);
        this.text = 'request success';
    }
});
```



# Vue3

### vuex

 Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。 

 <img src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/b1ba7f40-45ec-11eb-8a36-ebb87efcf8c0.png" alt="img" style="zoom:50%;" /> 

**优势与使用场景**

- Vuex的状态存储是响应式的，可跟踪每一个状态变化，一旦它改变，所有关联组件都会自动更新相对应的数据。
- 共享数据，解决了非父子组件的消息传递（将数据存放在state中）。
- 统一状态管理，减少了请求次数，有些情景可以直接从内存中的state获取数据。



**项目结构**

使用 Vuex 需要遵守的规则：

- 应用层级的状态应该集中到单个 `store` 对象中。
- 提交 `mutation` 是更改状态的唯一方法，并且这个过程是同步的。
- 异步逻辑都应该封装到 `action` 里面。



**State**

单一状态树，定义应用状态的默认初始值，页面显示所需的数据从该对象中进行读取。

- 不可直接对 `state` 进行更改，需要通过 `Mutation` 方法来更改。

  Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）： 

1. 在 `uni-app` 项目根目录下，新建 `store` 目录，在此目录下新建 `index.js` 文件。在 `index.js` 文件配置如下：

```js
// 页面路径：store/index.js
import { createStore } from 'vuex'
const store = createStore({
	state:{//存放状态
		"username":"foo",
		"age":18
	}
})

export default store
```

2. 在 `main.js` 中导入文件。

```js
// 页面路径：main.js
import App from './App'
import store from './store'
import {createSSRApp} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	return {
		app
	}
}
```



**获取state**

1. 通过属性访问，需要在根节点注入 `store` 。

```html
<!-- 页面路径：pages/index/index.vue -->
<template>
	<view>
		<text>用户名：{{username}}</text>
	</view>
</template>
<script>
	import store from '@/store/index.js';//需要引入store
	export default {
		data() {
			return {}
		},
		computed: {
			username() {
				return store.state.username
			}
		}
	}
</script>
```

2. 在组件中使用，通过 `this.$store` 访问到 `state` 里的数据。

```html
<!-- 页面路径：pages/index/index.vue -->
<template>
	<view>
		<text>用户名：{{username}}</text>
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		},
		computed: {
			username() {
				return this.$store.state.username
			}
		}
	}
</script>
```

3. 通过 `mapState` 辅助函数获取。

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。

```html
<!-- 页面路径：pages/index/index.vue -->
<template>
	<view>
		<view>用户名：{{username}}</view>
		<view>年龄：{{age}}</view>
	</view>
</template>
<script>
	import { mapState } from 'vuex'//引入mapState
	export default {
		data() {
			return {}
		},
		computed: mapState({
		   // 从state中拿到数据 箭头函数可使代码更简练
		   username: state => state.username,
			age: state => state.age,
		})
	}
</script>
```

- 当映射的计算属性的名称与 `state` 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。

```html
<!-- 页面路径：pages/index/index.vue -->
<template>
	<view>
		<view>用户名：{{username}}</view>
		<view>年龄：{{age}}</view>
	</view>
</template>
<script>
	import { mapState } from 'vuex'//引入mapState
	export default {
		data() {
			return {}
		},
		computed: mapState([
			'username',//映射 this.username 为 store.state.username
			'age',
		])
	}
</script>
```

- 为了能够使用 `this` 获取组件自己的data数据，必须使用常规函数。

- 使用对象展开运算符

  `mapState` 函数返回的是一个对象。使用对象展开运算符将多个对象合并为一个，以使我们可以将最终对象传给 `computed` 属性。

  ```html
  <!-- 页面路径：pages/index/index.vue -->
  <template>
  	<view>
  		<view>用户名：{{username}}</view>
  		<view>年龄：{{age}}</view>
  	</view>
  </template>
  <script>
  	import { mapState } from 'vuex'//引入mapState
  	export default {
  		data() {
  			return {}
  		},
  		computed: {
  			//使用对象展开运算符将此对象混入到外部对象中
  			...mapState({
  				username: state => state.username,
  				age: state => state.age,
  			})
  		},
  	}
  </script>
  
  ```

**Getter**

`Vuex` 允许我们在 `store` 中定义`“getter”`（可以认为是 `store` 的计算属性），对 `state` 的加工，是派生出来的数据。

```js
// 页面路径：store/index.js
import { createStore } from 'vuex'
const store = createStore({
	state: {
		todos: [{
				id: 1,
				text: '我是内容一',
				done: true
			},
			{
				id: 2,
				text: '我是内容二',
				done: false
			}
		]
	},
	getters: {
		doneTodos: state => {
			return state.todos.filter(todo => todo.done)
		}
	}
})
export default store
```

**获取getters**

1. 通过属性访问，`Getter` 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值。

```html
<!-- 页面路径：pages/index/index.vue -->
<template>
	<view>
		<view v-for="(item,index) in todos">
			<view>{{item.id}}</view>
			<view>{{item.text}}</view>
			<view>{{item.done}}</view>
		</view>
	</view>
</template>
<script>
	import store from '@/store/index.js'//需要引入store
	export default {
		computed: {
			todos() {
				return store.getters.doneTodos
			}
		}
	}
</script>
```

 注意，`getter` 在通过属性访问时是作为 `Vue` 的响应式系统的一部分缓存其中的。 

2. 通过 this.$store 访问。

```html
<!-- 页面路径：pages/index/index.vue -->
<template>
	<view>
		<view v-for="(item,index) in todos">
			<view>{{item.id}}</view>
			<view>{{item.text}}</view>
			<view>{{item.done}}</view>
		</view>
	</view>
</template>
<script>
	export default {
		computed: {
			todos() {
				return this.$store.getters.doneTodos
			}
		}
	}
</script>
```

3. 通过方法访问。

你也可以通过让 `getter` 返回一个函数，来实现给 `getter` 传参。在你对 `store` 里的数组进行查询时非常有用。

```html
<!-- 页面路径：pages/index/index.vue -->
<template>
	<view>
		<view v-for="(item,index) in todos">
			<view>{{item}}</view>
		</view>
	</view>
</template>
<script>
	export default {
		computed: {
			todos() {
				return this.$store.getters.getTodoById(2)
			}
		}
	}
</script>
```

4. 通过 `mapGetters` 辅助函数访问。

`mapGetters` 辅助函数仅仅是将 `store` 中的 `getter` 映射到局部计算属性：

```html
<!-- 页面路径：pages/index/index.vue -->
<template>
	<view>
		<view>{{doneTodosCount}}</view>
	</view>
</template>
<script>
	import {mapGetters} from 'vuex' //引入mapGetters
	export default {
		computed: {
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([
				'doneTodos',
				'doneTodosCount',
				// ...
			])
		}
	}
</script>
```

 如果你想将一个 `getter` 属性另取一个名字，使用对象形式： 

```js
export default {
		computed: {
			...mapGetters({
			  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
			  doneCount: 'doneTodosCount'
			})
		}
	}
```















# 页面

##### 新建页面

uni-app中的页面，通常会保存在工程根目录的`pages`目录下。

每次新建页面，均需要在`pages.json`中配置`pages`列表；未配置的页面，uni-app会在编译阶段进行忽略。

小知识：通过HbuilderX开发uni-app项目时，在uni-app项目上右键“新建页面”，HbuilderX会自动再`pages.json`中完成页面注册，开发更方便。



##### 删除页面

删除页面时，需要做两件工作：

- 删除`.vue`文件或`.nvue`文件
- 删除`pages.json -> pages`列表项中的配置



##### 应用首页

`uni-app`会将`pages.json->pages`配置中的第一个页面作为当前工程的首页（启动页）



##### 页面生命周期

`uni-app`支持如下页面声明周期函数

| 函数名                            | 说明                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| onlint                            | 监听页面初始化（在onload之前）                               |
| onload                            | 监听页面加载                                                 |
| onShow                            | 监听页面显示                                                 |
| onRead                            | 监听页面初始渲染完成                                         |
| onHide                            | 监听页面隐藏                                                 |
| onUnload                          | 监听页面卸载                                                 |
| onResize                          | 监听窗口尺寸变化                                             |
| onPullDownRefreh                  | 监听用户下拉动作，一般用于下拉刷新                           |
| onReachBottom                     | 页面滚动到底部事件，常用于下拉下一页数据<br />可在`pages.json`里定义具体页面底部的触发距离`onReachBottomDistance`，比如设为50 |
| onTabItemTab                      | 点击tab时触发                                                |
| onShareAppMessage                 | 用户点击右上角分享                                           |
| onPageScroll                      | 监听页面滚动<br />属性scrollTop：页面在垂直方向以滚动的距离（单位px） |
| onNavigationBarButtonTap          | 监听原生标题栏按钮点击事件                                   |
| onBackPress                       | 监听页面返回<br />返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键 |
| onNavigationBarSearchInputChanged | 监听原生标题栏搜索输入框输入内容变化事件（pages.json 中的 searchInput 配置 disabled 为 true 时才会触发） |
| onShareTimeline                   | 监听用户点击右上角转发到朋友圈                               |
| onAddToFavorites                  | 监听用户点击右上角收藏                                       |



##### 组件生命周期

`uni-app`组件支持的生命周期，与vue标准组件的生命周期相同。

| 函数名        | 说明                                                         |
| :------------ | :----------------------------------------------------------- |
| beforeCreate  | 在实例初始化之前被调用                                       |
| created       | 在实例创建完成后被立即调用。                                 |
| beforeMount   | 在挂载开始之前被调用。                                       |
| mounted       | 挂载到实例上去之后调用。注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用`$nextTick` |
| beforeUpdate  | 数据更新时调用，发生在虚拟 DOM 打补丁之前。                  |
| updated       | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。 |
| beforeDestroy | 实例销毁之前调用。在这一步，实例仍然完全可用。               |
| destroyed     | Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 |



##### 页面调用接口

- **getApp()**

  ​	`getApp()`函数用来获取当前应用实例，一般用于获取globalData。

  ```js
  // 实例
  const app = getApp()
  console.log(app.globalSata);
  ```

  注意：

  - 不要在定义与`App()`内的函数中，或调用`App`前斯调用`getApp()`，可以通过`this.$scope`获取对应的app实例
  - 通过 `getApp()` 获取实例之后，不要私自调用生命周期函数。
  - 当在首页`.nvue`中使用`getApp()`不一定可以获取真正的`App`对象。对此提供了`const app = getApp({allowDefault: true})`用来获取原始的`App`对象，可以用来在首页对`globalData`等初始化

- **getCurrentPages()**

  ​	`getCurrentPages()`函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。

  ​	注意：`getCurrentPages()`仅用于展示页面栈的情况，请勿修改页面栈，以免造成页面状态错误。

  每个页面实例的方法属性列表：

  | 方法                  | 描述                          |
  | --------------------- | ----------------------------- |
  | page.$getAppWebview() | 获取当前页面的webview对象实例 |
  | page.route            | 获取当前页面的路由            |



# uni-app连接数据库

1. 搭建后端

   1. 全局命令

      ```js
      npm install express-generator -g
      ```

   2. 进入项目目录

      ```js
      express --view=esj server
      ```

2. 在server文件夹中的新建db文件夹，然后在里面新建一个sql.js连接数据库

   ```js
   let mysql = require('mysql');
   let connection = mysql.createConnection({
   	host : 'localhost',
   	user : '你自己数据库账号',
   	password: '你自己数据库密码',
   	database: '你项目数据库名称'
   })
   module.exports = connection;
   ```

3. 正在index.js文件中操作mysql数据库

4. 前台通过url传值访问后台api接口

5. 后台编写api对数据库操作

   ```js
   var express = require('express');
   var router = express.Router();
   var connection = require('../db/sql.js')
   /* GET home page. */
   router.get('/', function(req, res, next) {
     res.render('index', { title: 'Express' });
   });
   
   //对数据库的操作
   router.get('/api/goods',function(req, res, next) {
   	
   	//desc降序 asc升序
   	//获取对象的key
   	let [goodsName,orderName] = Object.keys(req.query);
   	let name = req.query.name;
   	let order = req.query[orderName];
   	
       connection.query("select * from shopdata where name like '%"+name+"%' order by "+orderName+" "+order+" ", function (error,results,fields) {
   		if(error) throw error;
   		// console.log(results);
   		res.send({
   			code:"0",
   			data:results
   		})
   	  
       });
   });
   
   
   ```

   









用php获取数据库中的数据 

向服务器发送获取的数据

uni-app向服务器请求数据