"""
电气工程及其自动化学习平台 v3 - PyCharm 可直接运行版

运行方式：
1. 用 PyCharm 打开本项目文件夹。
2. 右键运行 app.py。
3. 浏览器会自动打开网站。

本项目特点：
- 使用 Python 标准库启动本地网站，不需要安装 Flask / Django。
- 3D 实验室使用本地 Canvas 3D 投影，不依赖 Three.js、WebGL 或 CDN。
- 网页采用明亮背景色，包含科技前沿、研究方向、课程讲解、B站资源、课程拓扑图。
"""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import socket
import webbrowser


PROJECT_ROOT = Path(__file__).resolve().parent
DEFAULT_PORT = 8000


class LocalWebsiteHandler(SimpleHTTPRequestHandler):
    """用于本地运行 HTML/CSS/JS 的静态文件服务器。"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


def is_port_available(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.2)
        return sock.connect_ex(("127.0.0.1", port)) != 0


def find_available_port(start_port: int = DEFAULT_PORT) -> int:
    for port in range(start_port, start_port + 100):
        if is_port_available(port):
            return port
    raise RuntimeError("没有找到可用端口，请关闭占用 8000-8099 端口的程序后重试。")


def main() -> None:
    port = find_available_port()
    server = ThreadingHTTPServer(("127.0.0.1", port), LocalWebsiteHandler)
    url = f"http://127.0.0.1:{port}/index.html"

    print("=" * 72)
    print("电气工程及其自动化学习平台 v3 已启动")
    print(f"网站地址：{url}")
    print("提示：")
    print("1. 科技前沿、研究方向、课程拓扑图、3D实验室均已升级。")
    print("2. 3D实验室支持拖拽、滚轮缩放、滑块、轨迹、标签、粒子密度等控制。")
    print("3. 在 PyCharm 中点击停止按钮，或在终端按 Ctrl + C 可以关闭服务器。")
    print("=" * 72)

    webbrowser.open(url)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n正在关闭本地网站服务器...")
    finally:
        server.server_close()
        print("服务器已关闭。")


if __name__ == "__main__":
    main()
