# web_share
通过Lighttpd分享文件，实现上传下载

## 为什么用Lighttpd？
因为它安装包小……

## 为什么这么简陋？
因为我菜。欢迎提PR来帮助我改进。

## 这个项目意义何在？
帮助不同设备之间传输文件。举个例子：手机和电脑要传文件，没有数据线/数据线坏了/电脑上没有合适的驱动，怎么办？希望此项目可以快速实现您传文件的目标。

## 如何使用
0. 首先得有[Lighttpd](https://www.lighttpd.net)
1. `git clone $CLONE_URL`
2. 检查代码，并确认没有混入恶意代码
3. 稍作修改（在代码树的根目录中）：
```bash
$EDITOR lighttpd.conf # 至少要修改var.server_root行与ssl相关行
$EDITOR auth.user # 设置用户名和密码
```
4. 运行服务器（在代码的根目录中）：`lighttpd -f lighttpd.conf`

服务器运行在localhost上，端口号见`lighttpd.conf`中`server.port`那行（http端口）以及`$SERVER["socket"]`那行（https端口）。
