# 雷雨天｜AI 应用开发工程师作品集

2027届软件工程本科生，围绕 AI 能力与真实业务系统结合进行项目实践。

## 核心方向

- Dify
- RAG
- Prompt Engineering
- Workflow
- Tool Calling
- HTTP / REST API
- JSON
- Python
- JavaScript
- Web业务原型

## 代表项目

### 智慧水产 AI 助手

展示完整的 AI 应用链路：

自然语言 → 意图识别 → RAG / 参数提取 → Tool Calling → HTTP API → 结果分析 → 移动端业务入口

### 智慧增殖放流站 Web 原型

展示业务需求分析、复杂状态设计、跨模块业务关联与 Web 交互原型实践。

### 数字孪生养殖监控

展示水质环境、设备运行、鱼情信息、告警、视频监控与数据可视化。

## Online Portfolio

https://nigu666.github.io/ai-application-engineer-portfolio/

## 本地运行

在当前目录执行：

```bash
python -m http.server 8765 --bind 127.0.0.1
```

然后访问 `http://127.0.0.1:8765`。

页面为单文件静态作品集，通过 CDN 加载 React 18 UMD、ReactDOM、Tailwind CDN 与 Babel Standalone。项目截图统一存放在 `assets/`，页面不包含 API Key，也不会直接调用真实 Dify 密钥。
