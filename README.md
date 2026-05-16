# 电气工程及其自动化学习平台 v3

这是一个 **PyCharm 可直接运行** 的本地网站项目。

## 运行方法

1. 解压 `eea-pycharm-website-v3.zip`
2. 用 PyCharm 打开 `eea-pycharm-website-v3` 文件夹
3. 找到 `app.py`
4. 右键运行 `app.py`
5. 浏览器会自动打开网站

运行后地址一般是：

```text
http://127.0.0.1:8000/index.html
```

如果 8000 端口被占用，程序会自动使用 8001、8002 等端口。

## v3 升级内容

### 1. 改成明亮背景

整体 UI 从暗色科技风改为明亮的蓝白色学习平台风格。

### 2. 新增科技前沿板块

包括：

- 新型电力系统与智能电网
- 构网型逆变器与高比例电力电子电网
- 储能系统与长时储能
- 虚拟电厂 VPP 与需求侧响应
- 宽禁带功率半导体 SiC / GaN
- 电机驱动与新能源汽车电驱系统
- AI 调度、数字孪生与预测维护
- 电气安全、网络安全与韧性电网

### 3. 研究方向扩写并加入图片

每个方向都加入本地 SVG 装饰图，内容包括：

- 方向概述
- 关键问题
- 技术方法
- 典型应用
- 关联课程

### 4. 3D 实验室继续优化

3D 实验室仍然不依赖 Three.js 或 CDN，而是本地 Canvas 3D 投影。

新增：

- 粒子 / 线条密度滑块
- 显示 / 隐藏轨迹
- 显示 / 隐藏标签
- 显示 / 隐藏坐标轴
- 重置视角
- 暂停动画
- 俯视图
- 侧视图

### 5. 学习路线变丰富

新增：

- 四阶段学习路线
- 每阶段目标和阶段成果
- 可点击课程拓扑图
- 箭头表示课程依赖关系

## 项目结构

```text
eea-pycharm-website-v3/
├── app.py
├── index.html
├── styles.css
├── data.js
├── app.js
├── requirements.txt
├── README.md
└── assets/
    ├── direction-*.svg
    └── frontier-*.svg
```

## 是否需要安装依赖？

不需要。

本项目使用 Python 标准库 `http.server` 启动本地网站。

## 如何修改内容？

大部分内容集中在 `data.js`：

- `frontiers`：科技前沿
- `directions`：研究方向
- `courses`：课程讲解和 B 站链接
- `roadmapStages`：学习路线
- `graph`：课程拓扑图

## 注意

哔哩哔哩课程中可能包含免费、付费、合集、课程页等不同类型资源，是否需要登录、购买或试看，以哔哩哔哩页面实际显示为准。


---

# AI 大模型接入说明：Render Web Service 部署

这个版本已经新增：

```text
server.js
package.json
.env.example
.gitignore
```

其中：

- `server.js`：后端接口，负责安全调用 OpenAI API。
- `package.json`：Render Web Service 运行 Node.js 后端需要的配置。
- `.env.example`：环境变量示例，不要把真实 API Key 提交到 GitHub。
- `.gitignore`：已经忽略 `node_modules/` 和 `.env`。

## 一、为什么不能把 API Key 写进前端？

不要把 API Key 写进：

```text
index.html
app.js
data.js
styles.css
```

因为这些文件会被浏览器下载，别人可以看到源码。正确结构是：

```text
网页前端  ->  /api/chat  ->  server.js 后端  ->  OpenAI API
```

API Key 只放在 Render 的 Environment Variables 中。

## 二、本地预览

如果只是预览网页外观，仍然可以运行：

```bash
python app.py
```

但是这种方式只启动静态网页，不会启动 `/api/chat` 后端接口。

如果要在本地测试 AI 接口，需要安装 Node.js，然后在项目根目录运行：

```bash
npm install
```

Windows PowerShell：

```powershell
$env:OPENAI_API_KEY="你的APIKey"
$env:OPENAI_MODEL="gpt-4.1-mini"
npm start
```

macOS / Linux：

```bash
export OPENAI_API_KEY="你的APIKey"
export OPENAI_MODEL="gpt-4.1-mini"
npm start
```

然后打开：

```text
http://localhost:3000
```

## 三、上传 GitHub

把这个文件夹里的所有内容上传到 GitHub，包括：

```text
server.js
package.json
index.html
styles.css
data.js
app.js
assets/
```

不要上传 `node_modules/`，也不要上传 `.env`。

## 四、Render 部署

在 Render 里新建：

```text
New +  ->  Web Service
```

配置：

```text
Runtime: Node
Branch: main
Root Directory: 留空 或 .
Build Command: npm install
Start Command: npm start
```

Environment Variables 添加：

```text
OPENAI_API_KEY = 你的 OpenAI API Key
OPENAI_MODEL = gpt-4.1-mini
```

部署成功后，访问 Render 给你的 Web Service 网址。

## 五、和原 Static Site 的区别

原来的 Static Site 只能展示网页，不能安全保存 API Key。

这个 AI 版要用 Render Web Service，因为它需要运行 `server.js` 后端接口。
