```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				// 导航栏标题文字内容（页面）
				"navigationBarTitleText": "星星买书"
			}
		},
		{
			"path": "pages/ShoppingCart/index",
			"style": {
				"navigationBarTitleText": "购物车"
				// 设置编译到h5平台的特定样式
				// "h5": {
				// 	"pullToRefresh": {
				// 		"color": "#fff000"
				// 	}
				// }
			}
		},
		{
			"path": "pages/myInfo/index",
			"style": {
				"navigationBarTitleText": "我的"
			}
		}
	],
	// 用于设置应用的状态栏、导航栏、标题、窗口背景色等（全局配置）
	"globalStyle": {
		/* 导航栏 */
		// 微信小程序
		// 导航栏背景色（同状态栏背景色） hexColor 值为十六进制格式颜色
		"navigationBarBackgroundColor": "#000",
		// 导航栏标题颜色及状态栏前景颜色 String 值为 black 或 white
		"navigationBarTextStyle": "white",
		// 导航栏标题文字内容  String（全局）
		"navigationBarTitleText":"星星买书",
		// 导航栏样式  String  仅支持default/custome[custome即取消默认的原生导航栏]
		"navigationStyle": "default",
		
		/* 下拉 */
		// 下拉显示出来的窗口背景色  hexColoe
		"backgroundColor": "#bbb",
		// 下拉loading的样式，仅支持 dark/light
		"backgroundTextStyle": "light",
		// 是否开启下拉刷新, true/false
		"enablePullDownRefresh": true,
		
		/* 上拉 */
		// 页面上拉触底事件触发时页面底部距离，Number 单位只支持px
		"onReachBottomDistance": 50,
	
		/* 横屏 */ 
		// 横屏配置，屏幕旋转设置，仅支持auto/portrait[默认]/landscape
		"pageOrientation": "portrait",
		
		// 设置编译到mp-weixin平台的特定样式
		"mp-weixin": {
			
		},
		
		// 引用小程序组件
		"usingComponents": {
			
		}
		
		// 同层渲染，webrtc(实时音视频)[无法正常时尝试配置] seperates[强制关掉同层]
		// "renderingMode": "webrtc"

	},
	//  tabBar 配置项指定一级导航栏，以及 tab 切换时显示的对应页。
	"tabBar": {
		"color": "#ffffff",
		"selectedColor": "#FFC0CB",
		"backgroundColor": "#d8a3ad",
		"borderStyle": "white",
		"fontSize": "16px",
		"list": [
			{
				"pagePath": "pages/index/index",
				"text": "主页"
			},
			{
				"pagePath": "pages/ShoppingCart/index",
				"text": "购物车"
			},
			{
				"pagePath": "pages/myInfo/index",
				"text": "我的"
			}
		]
	},
	"condition" : { //模式配置，仅开发期间生效
		"current": 0, //当前激活的模式(list 的索引项)
		"list": [
			{
				"name": "", //模式名称
				"path": "", //启动页面，必选
				"query": "" //启动参数，在页面的onLoad函数里面得到
			}
		]
	}
}



```