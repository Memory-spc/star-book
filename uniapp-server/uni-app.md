# 全局文件

## pages.json 页面路由 

#### topWindow/leftWindow/rightWindow

用于解决宽屏适配问题（以现有的手机应用为mainWindow，在左、上、右可以追加新的页面显示窗体）

​	整体的宽屏适配思路

| 属性       | 类型   | 描述                      |
| ---------- | ------ | ------------------------- |
| path       | String | 配置页面路径              |
| Style      | Object | 配置页面窗口表现pageStyle |
| marchMedia | Object | 配置显示该窗口的规则      |

注意：

- 目前style节点仅支持width、height等css样式相关属性

- 如果需求当存在topWindow时，自动隐藏页面的 navigationBar，根据需求不同在App.vue中配置如下css

  - 只需要隐藏某个页面的 navigationBar 

    ```css
    /* 隐藏路径为 pages/component/view/view 页面的 navigationBar */
    .uni-app--showtopwindow [data-page="pages/component/view/view"] uni-page-head {
    	display: none;
    }
    ```

  - 隐藏大部分页面的navigationBar，显示某个页面的navigationBar

    ```css
    /* 隐藏所有页面的 navigationBar */
    .uni-app--showtopwindow uni-page-head {
    	display: none;
    }
    
    /* 显示路径为 pages/component/view/view 页面的 navigationBar */
    .uni-app--showtopwindow [data-page="pages/component/view/view"] uni-page-head {
    	display: block;
    }
    
    ```

- **marchMedia**：

  | 属性     | 类型   | 默认值 | 描述                                                         |
  | -------- | ------ | ------ | ------------------------------------------------------------ |
  | minWidth | Number | 768    | 当设备可见区域宽度>=minWidth时，显示该window。值为Number，默认值是768 |

  ```json
  "topWindow": {
      "path":"responsive/top-window.vue",// 指定 topWindow 页面文件
      "style":{
          "height":"40px",
      },
      "matchMedia": {
          "minWidth":768 //生效条件，当窗口宽度大于768px时显示
      }
  }
  ```

  

#### 自定义导航栏使用注意

当navigationStyle设为custom或titleNView设为false时，原生导航栏不显示，此时需要注意以下几个问题：

- 非h5端，手机顶部状态栏区域会被页面内容覆盖。uni-app提供了状态栏高度的css变量，**--status-bar-height**，如果需要把状态栏的位置从前景部分让出来，可写一个占位div，高度设为css变量

  ```html
  <template>
      <view>
          <view class="status_bar">
              <!-- 这里是状态栏 -->
          </view>
          <view> 状态栏下的文字 </view>
      </view>
  </template>
  <style>
      .status_bar {
          height: var(--status-bar-height);
          width: 100%;
      }
  </style>
  ```

- 如果原生导航栏不能满足需求，推荐使用uni ui的自定义导航栏**NavBar**。这个前端导航栏自动处理了状态栏高度占位问题。

- 前端导航栏搭配原生下拉刷新时，会有问题。

- 非h5端，前端导航盖不住原生组件。如果页面有video、map、textarea(仅小程序)等原生组件，滚动时会覆盖导航栏

  -  如果是小程序下，可以使用cover-view来做导航栏，避免覆盖问题
  - 如果是App下，建议使用titleNView或subNVue，体验更好

- 前端组件在渲染速度上步入原生导航栏，原生导航可以在动画期间渲染，保证动画期间不白屏，但使用前端导航栏，在新窗体进入动画期间可能会整页白屏，月地段的手机越明显

- 在App侧，原生导航栏页提供了比小程序导航更丰富的自定义性

  - **titleNView**：给原生导航栏提供更多配置，包括自定义按钮、滚动渐变效果、搜索框等
  - **subNVue**：使用功能nvue原生渲染，所有布局自己开发，具备一切自定义灵活度

-  页面禁用原生导航栏后，想要改变状态栏的前景字体样式，仍可设置页面的 **navigationBarTextStyle** 属性（只能设置为 black或white）。如果想单独设置状态栏颜色，App端可使用**plus.navigator.setStatusBarStyle**设置。 



#### easycom

传统vue组件，需要安装、引用、注册，三个步骤后才能使用组件。easycom将其精简为异步。只要安装在项目components目录下，并且`components/组件名称/组件名称.vue`目录结构。就可以不用引入、注册，直接在页面中使用。

```html
<template>
	<view class="container">
		<uni-list>
			<uni-list-item title="第一行"></uni-list-item>
			<uni-list-item title="第二行"></uni-list-item>
		</uni-list>
	</view>
</template>
<script>
	// 这里不用import引入，也不需要在components内注册uni-list组件。template里就可以直接用
	export default {
		data() {
			return {

			}
		}
	}
</script>
```

不噶怒components目录下安装了多少组件，`easycom`打包后会自动剔除没有使用功能的组件，对组件库的使用尤为友好。

**组件库批量安装，随意使用，自动按需打包**

 `easycom`是自动开启的，不需要手动开启，有需求时可以在`pages.json`的`easycom`节点进行个性化设置，如关闭自动扫描，或自定义扫描匹配组件的策略。 



#### condition

启动模式配置，仅开发期间生效，用于模拟直达页面的场景，如：小程序转发后，用户点击所打开的页面。

属性说明：

| 属性    | 类型   | 是否必填 | 描述                             |
| :------ | :----- | :------- | :------------------------------- |
| current | Number | 是       | 当前激活的模式，list节点的索引值 |
| list    | Array  | 是       | 启动模式列表                     |

**list说明：**

| 属性  | 类型   | 是否必填 | 描述                                                         |
| :---- | :----- | :------- | :----------------------------------------------------------- |
| name  | String | 是       | 启动模式名称                                                 |
| path  | String | 是       | 启动页面路径                                                 |
| query | String | 否       | 启动参数，可在页面的 [onLoad](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle) 函数里获得 |

**注意：**在App里真机运行可直接打开配置页面，微信开发者工具里需要手动改变编译模式

 ![img](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a4ceac70-4f2e-11eb-b680-7980c8a877b8.png) 

```js
"condition": { //模式配置，仅开发期间生效
	"current": 0, //当前激活的模式（list 的索引项）
	"list": [{
			"name": "swiper", //模式名称
			"path": "pages/component/swiper/swiper", //启动页面，必选
			"query": "interval=4000&autoplay=false" //启动参数，在页面的onLoad函数里面得到。
		},
		{
			"name": "test",
			"path": "pages/component/switch/switch"
		}
	]
}

```

