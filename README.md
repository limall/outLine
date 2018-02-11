outline-lua &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
=======
简介
-------
* **特点：** outline-lua(以下简称outline)致力于为cocos2d-x lua(以下简称2dx，不知道是否支持quick，未作测试)引入组件化工作流。不同于官方版本，outline支持2dx3.14以下版本(我的项目3.10可以使用，具体最低支持到哪个版本还未测试)，并且支持导出自定义组件。
* **导出源码：** outline直接导出lua源码，每一次导出的node整体，或者每个animation clip都会存放于单个lua文件中，开发者只需require对应的lua文件即可直接使用。
* **节点模板：** require文件后，并非直接生成节点，而是生成每个节点的模板(名称是该节点名称的首字母改为大写)，通过节点模板的create方法便可生产该节点实例。例如：  
```local node1=O.Node1:create()```  

* **完整的节点模板索引：** 导出的节点模板，将会保持父子关系，并且所有根节点模板都挂在全局变量O中。例如，导出了节点root1,要访问其子节点child1的模板的代码：```O.Root1.Child1```,如果已经生产过节点实例，则可以通过lastNode方法获取到最新生产的节点实例，例如：```O.Root1.Child1:lastNode():setVisible(false)```  
  **获取节点模板的过程是很快的，因为它支持babel的代码提示。**  

导出node
--------
* 将资源面板outline-components目录下的ExportRule脚本拖至Canvas中的任意子节点中。 
* 设置export rule: <br>
```
       rule name:　　　　　export rule的名称,如"effectNode"; 
　　　　dst_path:　　　　导出的文件的全局路径（包含文件名），如"E:/cocospro/Classes/effectNode/view.lua"; 
　　　　src_node:　　　　　　需要导出的node，在creator直接把node拖过来即可; 
　　　　exclude_nodes:　　　导出node中需要剔除的子node; 
　　　　use_world_position:　导出的node的position是世界坐标系，还是node坐标系。
       res_dst:            同时导出的资源文件，包括plist、图片、字体等。这里需填写导出的目录位置，空着则不导出
```
* 点击outline菜单子菜单export node，就会弹出选择export rule的对话框，勾选需要套用的export rule，然后点导出即可  

添加自定义组件
-------------
* 当需要为一个节点添加额外信息时，可以通过添加组件脚本的方式来进行。这和在普通creator项目中添加组件脚本并无二样。 <br>
* 导出的组件的属性名称，需要作特殊标记，标记分两种，以"o__"为前缀和以"o_"为前缀(嫌前缀碍眼可以通过display属性来修饰)。 <br>
* 属性名以"o_"为前缀的，会被嵌入到对应的节点模板中，直接作为它的成员（属性导出后会自动剔除前缀标记，下同）。 <br>
* 以"o__"为前缀的，则会以key-value对的形式导出到节点模板的outline属性的extraData表中。 <br>
　　（注：目前支持导出的数据类型为int,float,string,bool,cc.SpriteFrame，vec2（图片文件的路径））

导出动画
--------
* 拖动AnimationRecorder.js脚本至播放的node中，将需要导出的animation clip拖到它的clips数组中。 <br>
* 接着将AutoRecorder脚本拖入Canvas节点中，设置好导出的目录，再把需要导出动画的node拖到exportNode数组中。 <br>
* 在浏览器中运行项目。所有设置的动画都会在运行时自动逐个播放，都播完后会导出到指定目录。 
              
              
lua中使用outline
----------------
* **注意** 记得要将assets中用到的资源（保持目录结构），复制到2dx项目的资源根目录下。可以在ExportRule设置res_dst来自动导出 <br>
* 需要先导入outline.lua文件，并保证其他文件能通过```require("outline.outline")```找到它 <br>
* 创建node的代码如下：   
```
  require "xxx.exportView"
  local exportNode=O.ExportNode:create()
  parent:addChild(exportNode)
```  
  也可以这样写：  
```
  require "xxx.exportView"
  O.ExportNode:create(parent)
```

* 每个单例都可以创建若干个节点，也可以调用reset方法将导出的节点的性状赋给作为参数传入的节点...。 <br>
* outline支持Widget组件，不过如果想在父节点size变化后能适配，记得在变化后调用node:applyWidget方法 <br>
* outline.lua目前只有三百多行，支持的ui控件很少，有兴趣的朋友可以看看我的另一个项目outline-idea，里面有我写的几个控件 <br>
          
          
播放动画
--------
* 让node播放动画的代码如下：  
```
require("xxx.exportClip")
local animation=Anims.ExportClip:create()
animation:play(node)
```        
* 用法与cpp版相近  
  
  
使用前必读
---------
        1、第一次使用前需要设置，将creator中偏好设置-常规-导入图片时自动裁剪选项取消掉，才能保证2dx和creator的显示效果一致  
        
        2、导出node前必须先要保存scene 
        
        3、弹出的export rule选择界面可能会比较小，把窗口拉大即可
