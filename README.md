# 雷雨天｜AI 应用开发作品集

面向 2027 校招，展示 AI 应用集成、AI 辅助开发与业务交互实践。作者为武汉轻工大学软件工程本科生雷雨天。

**[打开在线作品集 →](https://nigu666.github.io/ai-application-engineer-portfolio/)**

## 项目索引

| 项目 | 展示内容 | 入口 |
| --- | --- | --- |
| AI 修图智能体 | 悬浮画布、图层与本地编辑、可确认的 AI 计划、异步任务、本机安装交付 | [源码](https://github.com/nigu666/ai-picture-editor) · [v0.1.0 安装包](https://github.com/nigu666/ai-picture-editor/releases/tag/v0.1.0) |
| 智慧水产 AI 助手 | Dify Workflow、RAG、已有业务 API 集成、异常分支与移动端对话原型 | [技术证据](https://nigu666.github.io/ai-application-engineer-portfolio/#evidence) |
| 智慧增殖放流站 Web 原型 | 业务字段、状态操作、页面迁移与跨模块异常工单衔接 | [原型作品集](https://nigu666.github.io/zhihui-shuichan-jiaohu-yuanxing/) |
| 数字孪生养殖监控 | 数据驾驶舱布局、图表、视频墙与场景切换等交互原型 | [页面与职责](https://nigu666.github.io/ai-application-engineer-portfolio/#twin-detail) |

首页采用白底蓝色的项目展示布局：横向目录、桌面图文并排、小屏顺序阅读。统一中文无衬线字体、正文行高和内容宽度，提供运行画面、个人参与、开发过程与版本下载。工程证据支持筛选，图片只在当前项目或筛选结果内切换，支持放大、方向键切换、Escape 关闭和焦点归还；单图项目不显示翻页按钮。页面尊重系统“减少动态效果”设置。

底部“技术与实践”按 Python 与后端、Agent 与 RAG、前端与工程三组说明项目所用技术，移除泛化的学习名词和重复提示，不额外推断个人熟练程度。

## 角色与证据范围

**AI 修图智能体**通过 AI 辅助实现。我参与需求取舍、模型方案选择、界面反馈、功能验收和开发推进；项目交付包含接口、画布、任务进程与 Docker 安装编排。项目实现情况与本人独立掌握程度分别说明，Python 和相关框架持续学习中。

修图项目当前是 Windows x64 本机运行版本，需要 Docker Desktop。云端 AI 需使用者自行配置阿里云百炼北京地域密钥、网络和模型权限，并可能产生费用。静态作品集不提供在线修图服务，也不保存或调用任何模型密钥。

**智慧水产 AI 助手**展示通过 Dify 参与的资料整理与 RAG 配置、意图分类、参数提取、设备 ID 映射、已有业务接口调用、JSON 返回处理及异常分支。知识问答引用检索内容，设备与水质数据来自已有业务 API，截图不代表商业规模或性能指标。

移动端是交互原型，服务不可用时展示网络异常，该画面不作为真实服务成功调用的证据。Web 与数字孪生案例的职责集中于页面、交互原型和迁移适配，未表述为本人开发完整生产后端、数字孪生引擎或训练识别模型。

## 本地预览

在本仓库与 `zhihui-shuichan-jiaohu-yuanxing` 共同所在的父目录启动静态服务：

```powershell
python -m http.server 8877 --bind 127.0.0.1
```

打开 <http://127.0.0.1:8877/ai-application-engineer-portfolio/>。

保留现有 React 18.3.1 UMD、ReactDOM 18.3.1 与 Babel Standalone 7.26.10 的 CDN 方式，首次加载需要网络；无需 npm 安装或构建。页面样式统一位于 `assets/project.css`，避免内联样式与增量覆盖互相冲突。

原型使用相邻仓库的相对路径，在共同父目录预览及同域 GitHub Pages 部署下可访问。单独将本仓库作为服务根时，需另行提供相邻原型仓库。

## 素材与来源

原有 15 份工程、移动端与数字孪生截图保持原文件不变。新增 `assets/ai-picture-editor/workbench.png` 为修图项目实际运行截图，画布采用自制蓝调海报素材，不包含个人照片或密钥。

修图项目学习与功能设计参考[编程导航 AI 修图智能体](https://github.com/yuyuanweb/ai-picture-editor)，自行实现部分及第三方许可见[修图项目仓库](https://github.com/nigu666/ai-picture-editor)。智慧水产职责同时参考[原型作品集既有说明](https://github.com/nigu666/zhihui-shuichan-jiaohu-yuanxing)。

## 联系

[3077602965@qq.com](mailto:3077602965@qq.com) · [GitHub 主页](https://github.com/nigu666)

“发送邮件”通过 `mailto:` 打开设备默认邮件应用，预填收件人和作品集联系主题，需访客配置可用邮件应用并自行确认发送。
