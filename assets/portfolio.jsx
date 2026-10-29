
    const MEDIA = [
      {id:"workflow",group:"workflow",title:"Dify Workflow",src:"assets/01_Dify_Workflow_脱敏.png",alt:"智慧水产 AI 助手的 Dify 完整工作流，接口地址已脱敏",caption:"意图分类后进入不同业务分支；知识检索与设备工具调用各自展开。"},
      {id:"rag",group:"rag",title:"知识库与检索配置",src:"assets/02_Dify_RAG检索配置_脱敏.png",alt:"Dify 知识库的高质量索引、Embedding、混合检索与 Rerank 配置",caption:"领域资料经过分段与索引，通过混合检索和 Rerank 选择相关知识片段。"},
      {id:"api",group:"api",title:"设备状态查询",src:"assets/03_业务API_设备状态查询_脱敏.png",alt:"设备 H_P3_PU1 状态查询的实际 Dify 运行记录与回答",caption:"提取设备参数、映射设备 ID、调用已有业务接口，解析返回数据后组织回答。"},
      {id:"not-found",group:"api",title:"设备不存在的分支",src:"assets/03_API_NOT_FOUND_真实截图.png",alt:"查询不存在的 ABC 设备时，Dify 工作流进入 NOT_FOUND 分支",caption:"设备检索为空时进入 NOT_FOUND 分支，明确反馈未找到对应设备。"},
      {id:"water",group:"api",title:"业务数据与水质分析",src:"assets/03_水质分析_脱敏.png",alt:"读取水质业务数据后的分析回答，包含液位、pH 和缺失温度数据的提示",caption:"读取传感器返回数据后分析，并保留数据缺失时无法评估的提示。"},
      {id:"qa",group:"rag",title:"知识问答与引用",src:"assets/02_RAG_知识问答_真实截图.png",alt:"溶解氧知识问答的运行截图，回答保留领域知识库引用",caption:"根据检索上下文解释领域知识，并保留知识来源引用。"},
      {id:"mobile-home",group:"mobile",title:"移动端 AI 入口",src:"assets/mobile-ai-assistant/05_移动端AI落地全景.png",alt:"智慧水产移动端业务首页与 AI 助手入口",caption:"AI 入口融入水质监测、知识库和设备管理的移动端业务环境。"},
      {id:"mobile-chat",group:"mobile",title:"移动端对话界面",src:"assets/mobile-ai-assistant/02_AI对话页面.png",alt:"智慧水产移动端 AI 助手对话页面、消息输入和发送操作",caption:"移动端对话界面与消息交互；该画面不作为成功调用真实服务的证据。"},
      {id:"dashboard",group:"twin",title:"养殖监控数据驾驶舱",src:"assets/05_渔立方_Dashboard_真实项目.png",alt:"渔立方数字孪生养殖监控 Dashboard，展示水质、鱼情、设备状态与告警",caption:"水质、鱼情、设备与告警的页面信息层级和数据可视化原型。"},
      {id:"twin-scene",group:"twin",title:"数字孪生场景页面",src:"assets/05_渔立方_数字孪生场景_真实项目.png",alt:"渔立方养殖场数字孪生场景页面，部分业务信息已遮盖",caption:"数字孪生场景的页面与交互原型展示。"},
      {id:"video",group:"twin",title:"监控场景与视频界面",src:"assets/05_渔立方_监控画面_真实项目.png",alt:"渔立方养殖设备监控场景画面",caption:"监控场景界面素材，用于视频墙、全屏和轮巡等交互原型展示。"}
      ,{id:"picture-workbench",group:"picture",title:"AI 修图智能体",src:"assets/ai-picture-editor/workbench.png",alt:"AI 修图智能体本机运行画面，蓝调海报位于画布中，周围是编辑工具、图层与 AI 指令面板",caption:"本机运行中的悬浮画布、图层、选区工具与导出入口。"}
    ];
    const FILTERS=[{id:"all",label:"全部证据"},{id:"workflow",label:"工作流"},{id:"rag",label:"知识检索"},{id:"api",label:"业务 API"}];
    MEDIA.push(
      {id:"picture-plan",group:"picture",title:"待确认的实际工具计划",src:"assets/ai-picture-editor/process-plan.png?v=paired",alt:"真实运行的待确认水平翻转计划，包含工具名称、等待确认状态及确认执行按钮，画布修订为1",caption:"同一次运行的执行前状态：将水平翻转要求明确为 transform_canvas / flip_horizontal，核对步骤后再确认。此时画布修订为1。"},
      {id:"picture-result",group:"picture",title:"执行完成与画布结果",src:"assets/ai-picture-editor/process-result.png?v=paired",alt:"水平翻转后的真实画布与已完成计划记录",caption:"确认后执行本地翻转，结果保存到会话。此例验证本地编辑链路，不涉及AI生图或云端图片处理。"}
    );
    const ENGINEERING_MEDIA=MEDIA.slice(0,6);
    const mediaById=id=>MEDIA.find(item=>item.id===id);

    function MediaButton({id,onOpen,className="",lazy=true}){
      const item=mediaById(id);
      return <button type="button" className={"evidence-trigger "+className} data-evidence-id={id} aria-haspopup="dialog" aria-label={"放大查看"+item.title} onClick={event=>onOpen(id,event.currentTarget)}><img src={item.src} alt={item.alt} loading={lazy?"lazy":"eager"}/><span className="image-zoom" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 5 5M10.5 8v5m-2.5-2.5h5"/></svg></span></button>;
    }

    function Lightbox({items,index,trigger,onClose,onChange}){
      const dialogRef=React.useRef(null),closeRef=React.useRef(null),closeTimer=React.useRef(null);
      const [closing,setClosing]=React.useState(false),[zoomed,setZoomed]=React.useState(false);
      const item=items[index];
      const mediaRef=React.useRef(null);
      React.useEffect(()=>{setZoomed(false);mediaRef.current?.scrollTo(0,0);},[item.id]);
      React.useEffect(()=>{
        const dialog=dialogRef.current,oldOverflow=document.body.style.overflow;
        document.body.style.overflow="hidden";
        if(!dialog.open)dialog.showModal();
        closeRef.current.focus({preventScroll:true});
        return()=>{
          window.clearTimeout(closeTimer.current);
          if(dialog.open)dialog.close();
          document.body.style.overflow=oldOverflow;
          if(trigger&&trigger.isConnected)trigger.focus({preventScroll:true});
        };
      },[trigger]);
      function requestClose(){
        if(closing)return;
        if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){onClose();return;}
        setClosing(true);
        closeTimer.current=window.setTimeout(onClose,180);
      }
      function change(step){if(!closing&&items.length>1)onChange((index+step+items.length)%items.length);}
      function onKeyDown(event){
        if(zoomed&&event.target===mediaRef.current&&['ArrowLeft','ArrowRight'].includes(event.key))return;
        if(event.key==="ArrowLeft"){event.preventDefault();change(-1);return;}
        if(event.key==="ArrowRight"){event.preventDefault();change(1);return;}
        if(event.key!=="Tab")return;
        const focusable=Array.from(dialogRef.current.querySelectorAll('button:not([disabled]),a[href],[tabindex="0"]')).filter(node=>node.getClientRects().length>0);
        const first=focusable[0],last=focusable[focusable.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
      function onBackdropClick(event){
        if(event.target!==event.currentTarget)return;
        const rect=event.currentTarget.getBoundingClientRect();
        if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)requestClose();
      }
      return <dialog id="lightbox-dialog" ref={dialogRef} className={"viewer"+(closing?" is-closing":"")} aria-modal="true" aria-labelledby="lightbox-title" aria-describedby="lightbox-caption" onCancel={event=>{event.preventDefault();requestClose();}} onClose={onClose} onKeyDown={onKeyDown} onClick={onBackdropClick}>
        <header className="viewer-head"><h2 id="lightbox-title">{item.title}</h2><button type="button" className="viewer-close" ref={closeRef} onClick={requestClose} aria-label="关闭图片查看器">×</button></header>
        <div ref={mediaRef} className={"viewer-media"+(zoomed?" is-zoomed":"")} tabIndex={zoomed?0:undefined} role={zoomed?"region":undefined} aria-label={zoomed?"图片细节，可滚动查看":undefined} onDoubleClick={()=>setZoomed(value=>!value)}><img key={item.id} src={item.src} alt={item.alt}/></div>
        <p className="viewer-caption" id="lightbox-caption">{item.caption}</p>
        <div className={"viewer-controls"+(items.length===1?" single":"")}>
          <button type="button" className="button viewer-detail" aria-pressed={zoomed} onClick={()=>setZoomed(value=>!value)}>{zoomed?"适应窗口":"查看细节"}<Icon name="zoom"/></button>
          {items.length>1&&<><div className="viewer-step"><button type="button" className="button" onClick={()=>change(-1)} aria-label="查看上一张图片">← 上一张</button><button type="button" className="button" onClick={()=>change(1)} aria-label="查看下一张图片">下一张 →</button></div><output aria-live="polite" aria-label="当前图片编号">{index+1} / {items.length}</output></>}
          <a className="viewer-original" href={item.src} target="_blank" rel="noopener noreferrer">查看原图 ↗</a>
        </div>
      </dialog>;
    }


    MEDIA.push({id:"web-overview",group:"web",title:"智慧增殖站综合看板",src:"assets/web-prototype/overview.png",alt:"智慧增殖站 Web 交互原型中的综合看板与业务模块",caption:"已有 Web 原型的综合看板，展示页面布局、筛选与业务模块入口。"});

    const PROJECTS = [
      {id:"picture",section:"picture-editor",name:"AI 修图智能体",kind:"个人项目 · AI 协作开发",description:"自然语言规划修图，画布编辑、预览与导出。",technical:"FastAPI 提供接口，Redis 与 ARQ Worker 处理异步任务。",media:"picture-workbench",icon:"image",url:"https://github.com/nigu666/ai-picture-editor",linkLabel:"项目源码"},
      {id:"dify",section:"evidence",name:"智慧水产 AI 助手",kind:"实习实践 · Dify / RAG",description:"知识问答、设备查询，接入已有业务 API。",technical:"Dify 组织检索与工作流，按问题类型调用知识库或业务接口。",media:"workflow",icon:"workflow",url:"../zhihui-shuichan-jiaohu-yuanxing/智慧水产设备管理助手/",linkLabel:"移动端原型"},
      {id:"web",section:"web-detail",name:"Web 交互原型",kind:"实习实践 · 业务与交互",description:"设备、生产与报修业务的页面和流程。",technical:"梳理业务字段、页面状态与跨模块交互，参与页面迁移适配。",media:"web-overview",icon:"layout",url:"../zhihui-shuichan-jiaohu-yuanxing/智慧增殖站综合看板/",linkLabel:"打开 Web 原型"},
      {id:"twin",section:"twin-detail",name:"数据可视化",kind:"实习实践 · 监控与数字孪生原型",description:"养殖监控、图表交互与数字孪生原型。",technical:"组织水质、设备、告警和监控信息，呈现图表与场景交互。",media:"dashboard",icon:"chart",url:"../zhihui-shuichan-jiaohu-yuanxing/渔立方数据驾驶舱/",linkLabel:"打开数据驾驶舱"}
    ];

    function Icon({name,className=""}){
      const shapes={
        code:<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>,
        arrow:<path d="M6 18 18 6M6 6h12v12"/>,
        down:<path d="M12 4v16m-6-6 6 6 6-6"/>,
        right:<path d="M4 12h16m-6-6 6 6-6 6"/>,
        left:<path d="M20 12H4m6-6-6 6 6 6"/>,
        up:<path d="M12 20V4m-6 6 6-6 6 6"/>,
        mail:<><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></>,
        image:<><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8" r="1.5"/><path d="m4 17 5-5 4 4 3-3 5 5"/></>,
        workflow:<><rect x="2" y="9" width="6" height="6" rx="2"/><rect x="16" y="2" width="6" height="6" rx="2"/><rect x="16" y="16" width="6" height="6" rx="2"/><path d="M8 12h4V5h4M12 12v7h4"/></>,
        layout:<><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18M9 9v12"/></>,
        chart:<path d="M4 3v17h17M9 15v-4M14 15V7M19 15v-6"/>,
        zoom:<><path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6"/></>
      };
      return <svg className={"icon "+className} viewBox="0 0 24 24" aria-hidden="true">{shapes[name]||shapes.arrow}</svg>;
    }

    function ExternalLink({href,children,className="button"}){
      return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<Icon name="arrow"/></a>;
    }

    function PictureCase({openMedia}){
      return <>
        <header className="case-head reveal-title"><h2><span className="title-phrase">从编辑，</span><span className="title-phrase">到规划与交付。</span></h2></header>
        <div className="case-columns">
          <section className="reveal-copy"><h3>我主要做了什么</h3><p>我参与需求取舍、模型选择、界面反馈与功能验收，通过 AI 协作推进开发。</p><h3 className="purpose-heading">要解决什么问题</h3><p>把一句修图要求转成可确认的编辑步骤，保留手动调整、预览和导出的完整入口。</p></section>
          <section className="case-focus reveal-copy"><h3>画布、图层与 AI 指令</h3><MediaButton id="picture-workbench" onOpen={openMedia}/></section>
        </div>
        <ol className="build-path">
          <li className="reveal-step"><span className="step-index" aria-hidden="true">01</span><div><h3>画布与图层</h3><p>素材上传、会话保存、裁剪调色与多图层编辑，支持历史回退和图片导出。</p></div></li>
          <li className="reveal-step"><span className="step-index" aria-hidden="true">02</span><div><h3>规划与执行</h3><p>LangGraph 组织规划与校验，Pydantic 约束工具参数。确认计划后，由 Worker 处理任务并返回进度。</p></div></li>
          <li className="reveal-step"><span className="step-index" aria-hidden="true">03</span><div><h3>本机交付</h3><p>连接接口、数据库、队列与图片存储，通过 Docker Compose 提供中文安装入口。</p></div></li>
        </ol>
        <section className="agent-story" aria-labelledby="agent-story-title">
          <header className="case-head reveal-title"><h2 id="agent-story-title"><span className="title-phrase">一句要求，</span><span className="title-phrase">怎样变成一次编辑？</span></h2><p className="story-lead">以“将当前画布水平翻转”为例，沿着一次真实操作看输入、规划、确认和结果。</p></header>
          <ol className="agent-journey">
            <li><span className="journey-number">01</span><div><h3>读取正在编辑的画布</h3><p>先确认会话、画布尺寸和当前版本，收集候选素材、图层及已有选区。启用视觉分析时，把已保存图层合成预览交给模型，作为本轮修改的上下文。</p></div><span className="journey-output">会话与版本</span></li>
            <li><span className="journey-number">02</span><div><h3>把要求转成工具步骤</h3><p>模型提出工具与参数；LangGraph 依次经过规划和校验。服务端再检查工具是否注册、参数格式、依赖关系和素材归属。当前最多规划 8 步，需要局部编辑时还要核对选区。</p></div><span className="journey-output">可核对的计划</span></li>
            <li><span className="journey-number">03</span><div><h3>由人确认要执行什么</h3><p>页面展示实际步骤、参数和依赖，核对完整后再确认。参数校验通过，也需要检查模型是否漏掉要求；不合适时可以取消并重新描述。确认前不修改画布。</p></div><span className="journey-output">确认或取消</span></li>
            <li><span className="journey-number">04</span><div><h3>按顺序推进，记录每一步</h3><p>翻转、裁剪和调色等本地工具直接保存编辑；生图、整图编辑等图片任务进入队列，由 Worker 处理并返回状态。每次推进核对预期版本，画布变化后停止剩余步骤。</p></div><span className="journey-output">步骤与任务状态</span></li>
            <li><span className="journey-number">05</span><div><h3>检查结果，再决定保留</h3><p>本地修改进入编辑历史，可以撤销。图片任务完成后把结果加入候选区，用户再决定是否采用。最终按已保存的画布合成导出 PNG、JPG，或多尺寸 ZIP。</p></div><span className="journey-output">可继续编辑的结果</span></li>
          </ol>
          <div className="process-evidence"><figure><MediaButton id="picture-plan" onOpen={openMedia}/><figcaption><h3>执行前：核对实际工具步骤</h3><p>待确认状态为 0 / 1 步，画布修订为 1。本次明确了翻转工具与参数，仍需点击确认才会执行。</p></figcaption></figure><figure><MediaButton id="picture-result" onOpen={openMedia}/><figcaption><h3>执行后：查看画布与记录</h3><p>同一次运行完成水平翻转，计划为 1 / 1 步，画布修订更新为 2，可用撤销恢复。</p></figcaption></figure></div>
          <details className="agent-details" onToggle={()=>window.ScrollTrigger?.refresh()}><summary>画布变了、执行中断了，会怎样？</summary><div className="agent-detail-grid"><section><h3>版本变化</h3><p>规划和执行绑定画布版本。中途手动修改后，旧计划停止推进，避免用旧上下文继续编辑。</p></section><section><h3>任务中断</h3><p>已提交的图片任务保留编号。符合恢复条件时读取原结果或查询原任务；本地失败步骤回滚后，可明确选择重试该步。</p></section><section><h3>取消与撤销</h3><p>取消会停止后续步骤，已完成的编辑仍保留；已提交的图片任务可能继续。需要恢复画布时使用撤销。</p></section></div></details>
        </section>
        <div className="release-row reveal-copy"><div><h3>下载本机版本</h3><p id="picture-install-note">Windows x64 · 需 Docker Desktop</p></div><ExternalLink className="button primary" href="https://github.com/nigu666/ai-picture-editor/releases/latest">下载体验</ExternalLink><ExternalLink className="text-link" href="https://github.com/nigu666/ai-picture-editor/releases/tag/v0.1.0">版本说明 · v0.1.0</ExternalLink></div>
        <details className="project-notes" onToggle={()=>window.ScrollTrigger?.refresh()}><summary>安装与许可</summary><div><p>当前提供本机使用版本。云端 AI 需自行配置阿里云百炼北京地域密钥、网络和模型权限，调用可能产生费用。静态作品集不提供在线修图服务，也不保存模型密钥。</p><p>学习参考编程导航 AI 修图智能体教程；本项目自行实现部分采用 MIT 许可，第三方框架、服务与模型保留各自授权。</p></div></details>
      </>;
    }

    function DifyCase({filter,setFilter,visibleMedia,openMedia}){
      return <>
        <header className="case-head reveal-title"><h2><span className="title-phrase">知识问答和业务查询，</span><br className="mobile-break"/><span className="title-phrase">各走对应的流程。</span></h2></header>
        <div className="case-columns">
          <section className="reveal-copy"><h3>我的工作</h3><p>整理养殖资料，配置 RAG 检索、提示词与工作流；提取查询参数，映射设备 ID，处理已有业务接口的返回与异常分支。</p></section>
          <section className="reveal-copy"><h3>业务流程</h3><p>知识问题进入检索回答，设备问题进入工具调用。匹配到多个设备时，先追问编号或池体，再继续查询。</p></section>
        </div>
        <ol className="dify-journey" aria-label="水产助手运行流程"><li><span>01</span><h3>先判断问题</h3><p>意图分类决定走知识问答，还是设备与水质等业务查询分支。</p></li><li><span>02</span><h3>补齐查询条件</h3><p>提取设备、池体等参数，映射已有业务 ID；匹配不明确时先追问。</p></li><li><span>03</span><h3>检索或调用接口</h3><p>知识问题检索资料并重排；业务问题调用已有 API，解析 JSON 和异常返回。</p></li><li><span>04</span><h3>组织有依据的回答</h3><p>知识回答保留引用；查不到设备或数据缺失时明确反馈，方便继续询问。</p></li></ol>
        <div className="evidence-tools"><div className="filters" role="group" aria-label="筛选技术证据">{FILTERS.map(item=><button className="filter" type="button" key={item.id} aria-pressed={filter===item.id} onClick={()=>setFilter(item.id)}>{item.label}</button>)}</div><span className="evidence-count" aria-live="polite">{visibleMedia.length} 项证据</span></div>
        <div className="evidence-grid" key={filter}>{visibleMedia.map(item=><article className="evidence-item" key={item.id}><MediaButton id={item.id} onOpen={openMedia}/><h3>{item.title}</h3><p>{item.caption}</p></article>)}</div>
        <section className="mobile-section">
          <div className="mobile-copy reveal-copy"><h3>移动端 AI 入口</h3><p>完成 AI 入口、对话面板、消息状态与接口异常反馈，参与现有 Vue2 页面的迁移适配和接口联调。</p><p>移动端为交互原型，在线服务不可用时会显示异常提示。</p><ExternalLink href="../zhihui-shuichan-jiaohu-yuanxing/智慧水产设备管理助手/">打开移动端原型</ExternalLink></div>
          <div className="mobile-visuals"><MediaButton id="mobile-home" onOpen={openMedia}/><MediaButton id="mobile-chat" onOpen={openMedia}/></div>
        </section>
      </>;
    }

    function WebCase(){
      return <>
        <header className="case-head reveal-title"><h2><span className="title-phrase">把业务关系，</span><span className="title-phrase">整理成</span><span className="title-phrase">能操作的页面。</span></h2></header>
        <div className="case-columns">
          <section className="reveal-copy"><h3>负责内容</h3><ul className="scope-list"><li>参与需求沟通，梳理业务字段与页面关系</li><li>综合看板及设备、生产模块的交互原型</li><li>筛选、分页、抽屉、表单与页面状态联动</li></ul></section>
          <section className="reveal-copy"><h3>联动问题怎么处理</h3><p>针对维修工单与经验库记录不一致的问题，统一业务 ID，补充状态判断和提交校验，让维修记录、经验提交与审核结果能够对应。</p></section>
        </div>
        <div className="business-flow"><h3>异常处理流程</h3><ol><li className="reveal-step">巡检异常</li><li aria-hidden="true"><Icon name="right"/></li><li className="reveal-step">报修</li><li aria-hidden="true"><Icon name="right"/></li><li className="reveal-step">维修工单</li></ol></div>
        <div className="actions"><ExternalLink className="button primary" href="../zhihui-shuichan-jiaohu-yuanxing/智慧增殖站综合看板/">打开 Web 原型</ExternalLink><ExternalLink href="https://github.com/nigu666/zhihui-shuichan-jiaohu-yuanxing">原型仓库</ExternalLink></div>
      </>;
    }

    function TwinCase({openMedia}){
      return <>
        <header className="case-head reveal-title"><h2><span className="title-phrase">让监控信息</span><span className="title-phrase">更容易找到。</span></h2></header>
        <div className="case-columns">
          <section className="reveal-copy"><h3>负责内容</h3><p>界面布局、图表交互、视频墙与场景切换，组织水质、设备、告警和监控信息。</p></section>
          <section className="reveal-copy"><h3>页面与交互</h3><p>围绕数据驾驶舱、视频墙和数字孪生场景，完成信息分组、图表交互与场景切换等原型展示。</p></section>
        </div>
        <div className="twin-visuals"><figure className="twin-main"><MediaButton id="dashboard" onOpen={openMedia}/></figure><div className="twin-support"><MediaButton id="twin-scene" onOpen={openMedia}/><MediaButton id="video" onOpen={openMedia}/></div></div>
        <div className="actions"><ExternalLink className="button primary" href="../zhihui-shuichan-jiaohu-yuanxing/渔立方数据驾驶舱/">打开数据驾驶舱</ExternalLink><ExternalLink href="../zhihui-shuichan-jiaohu-yuanxing/渔立方数字孪生养殖系统/">打开监控原型</ExternalLink></div>
      </>;
    }

    function selectedFromHash(){
      let hash=location.hash.slice(1);
      try{hash=decodeURIComponent(hash);}catch{}
      const index=PROJECTS.findIndex(item=>hash===item.section||hash==="work="+item.id);
      const saved=PROJECTS.findIndex(item=>item.id===new URLSearchParams(location.search).get("project"));
      return index<0?Math.max(0,saved):index;
    }

    function ReadingTools(){
      const bar=React.useRef(null),[showTop,setShowTop]=React.useState(false);
      React.useEffect(()=>{
        let frame=0;
        function update(){
          frame=0;
          const distance=document.documentElement.scrollHeight-innerHeight;
          bar.current?.style.setProperty('--progress',distance>0?Math.min(1,Math.max(0,scrollY/distance)):0);
          setShowTop(scrollY>innerHeight*.8);
        }
        function schedule(){if(!frame)frame=requestAnimationFrame(update);}
        const observer=new ResizeObserver(schedule);observer.observe(document.body);
        window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);update();
        return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
      },[]);
      return <><div className="reading-progress" ref={bar} aria-hidden="true"/><a className={"back-top"+(showTop?" is-visible":"")} href="#profile" aria-label="返回顶部" title="返回顶部" tabIndex={showTop?0:-1}><Icon name="up"/></a></>;
    }

    function App(){
      const [selected,setSelected]=React.useState(selectedFromHash),[direction,setDirection]=React.useState(1);
      const [filter,setFilter]=React.useState("all"),[lightbox,setLightbox]=React.useState(null);
      const scope=React.useRef(null),initial=React.useRef(true);
      const touchStart=React.useRef(null),suppressClickUntil=React.useRef(0);
      const project=PROJECTS[selected],cover=mediaById(project.media);
      const visibleMedia=filter==="all"?ENGINEERING_MEDIA:ENGINEERING_MEDIA.filter(item=>item.group===filter);

      function selectProject(index,focus=false){
        if(index!==selected){setDirection(index>selected?1:-1);setSelected(index);setFilter("all");}
        const url=new URL(location.href);
        url.searchParams.set("project",PROJECTS[index].id);
        url.hash="work="+PROJECTS[index].id;
        history.replaceState(null,"",url);
        if(focus)document.getElementById("project-tab-"+PROJECTS[index].id)?.focus({preventScroll:true});
      }
      function stepProject(step){
        const next=(selected+step+PROJECTS.length)%PROJECTS.length;
        selectProject(next);setDirection(step);
      }
      function startSwipe(event){
        suppressClickUntil.current=0;
        const touch=event.touches.length===1?event.touches[0]:null;
        touchStart.current=touch&&!event.target.closest('.stage-step,.stage-zoom')?{x:touch.clientX,y:touch.clientY}:null;
      }
      function finishSwipe(event){
        const start=touchStart.current;touchStart.current=null;
        if(!start||!event.changedTouches.length)return;
        const touch=event.changedTouches[0],dx=touch.clientX-start.x,dy=touch.clientY-start.y;
        if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5){suppressClickUntil.current=Date.now()+500;stepProject(dx<0?1:-1);}
      }
      function onProjectKey(event){
        let next;
        if(event.key==="ArrowRight")next=(selected+1)%PROJECTS.length;
        if(event.key==="ArrowLeft")next=(selected-1+PROJECTS.length)%PROJECTS.length;
        if(event.key==="Home")next=0;
        if(event.key==="End")next=PROJECTS.length-1;
        if(next!==undefined){event.preventDefault();selectProject(next,true);}
      }
      function showCase(index){
        selectProject(index);
        requestAnimationFrame(()=>document.getElementById('case-study')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
      }
      function openMedia(id,trigger){
        const item=mediaById(id);
        const items=ENGINEERING_MEDIA.some(media=>media.id===id)?(visibleMedia.some(media=>media.id===id)?visibleMedia:ENGINEERING_MEDIA):MEDIA.filter(media=>media.group===item.group);
        setLightbox({items,index:items.findIndex(media=>media.id===id),trigger});
      }
      React.useEffect(()=>{
        const onHash=()=>{
          const hash=location.hash.slice(1);
          const index=PROJECTS.findIndex(item=>hash===item.section||hash==="work="+item.id);
          if(index>=0){setSelected(index);setFilter("all");}
        };
        window.addEventListener("hashchange",onHash);
        return()=>window.removeEventListener("hashchange",onHash);
      },[]);
      React.useEffect(()=>{
        const legacy=PROJECTS.some(item=>location.hash==="#"+item.section);
        if(initial.current&&legacy)requestAnimationFrame(()=>document.getElementById(project.section)?.scrollIntoView());
        initial.current=false;
      },[selected]);
      React.useEffect(()=>{
        if(!window.gsap||!window.ScrollTrigger)return;
        gsap.registerPlugin(ScrollTrigger);
        const mm=gsap.matchMedia();
        mm.add({desktop:"(min-width: 761px)",mobile:"(max-width: 760px)",reduce:"(prefers-reduced-motion: reduce)"},context=>{
          if(context.conditions.reduce)return;
          const ctx=gsap.context(()=>{
            gsap.to(".stage-screen",{scale:.84,y:context.conditions.desktop?52:24,ease:"none",scrollTrigger:{trigger:".stage",start:"top top",end:context.conditions.desktop?"+=340":"+=190",scrub:true}});
            gsap.utils.toArray(".reveal-title").forEach(node=>gsap.from(node,{y:18,opacity:0,duration:.48,ease:"power3.out",scrollTrigger:{trigger:node,start:"top 94%",once:true}}));
            gsap.utils.toArray(".reveal-copy").forEach(node=>gsap.from(node,{opacity:0,duration:.45,ease:"power2.out",scrollTrigger:{trigger:node,start:"top 94%",once:true}}));
            gsap.utils.toArray(".reveal-step").forEach((node,index)=>gsap.from(node,{x:-18,opacity:0,duration:.42,delay:index%3*.06,ease:"power3.out",scrollTrigger:{trigger:node,start:"top 95%",once:true}}));
          },scope);
          return()=>ctx.revert();
        });
        return()=>mm.revert();
      },[selected]);
      React.useEffect(()=>{const frame=requestAnimationFrame(()=>window.ScrollTrigger?.refresh());return()=>cancelAnimationFrame(frame);},[filter]);
      React.useEffect(()=>{let active=true;document.fonts.ready.then(()=>{if(active)window.ScrollTrigger?.refresh();});return()=>{active=false;};},[]);

      return <>
        <div id="page-shell" ref={scope} data-project={project.id}>
          <div className="page-atmosphere" aria-hidden="true">{PROJECTS.map((item,index)=><span key={item.id} className={"ambience ambience-"+item.id+(index===selected?" is-current":"")}/>)}</div>
          <ReadingTools/>
          <a className="skip-link" href="#catalog">跳到作品</a>
          <div className="wrap">
            <header className="masthead" id="profile">
              <a className="identity" href="#profile" aria-label="雷雨天，返回顶部"><div><h1>雷雨天<span className="name-dot" aria-hidden="true">.</span></h1><p className="role">AI 应用开发</p></div></a>
              <nav className="quick-links" aria-label="主导航"><a href="#catalog">作品</a><a href="#skills">技术与实践</a><a href="#contact">联系<Icon name="right"/></a></nav>
              <p className="school">武汉轻工大学 · 软件工程 · 2027 届</p>
            </header>
            <main>
              <section className="showcase" id="catalog" aria-label="作品放映厅">
                <div id="showcase-panel" role="tabpanel" aria-labelledby={"project-tab-"+project.id} tabIndex="0">
                  <div className={"stage stage-"+project.id} onTouchStart={startSwipe} onTouchEnd={finishSwipe} onTouchCancel={()=>{touchStart.current=null;}} onTouchMove={event=>{if(event.touches.length!==1)touchStart.current=null;}}>
                    <button type="button" className="stage-screen" aria-label={"放大查看"+cover.title} aria-haspopup="dialog" onClick={event=>{if(Date.now()<suppressClickUntil.current){event.preventDefault();return;}openMedia(project.media,event.currentTarget);}}><img className="stage-artwork" style={{"--enter-x":direction*28+"px"}} key={project.id} src={cover.src} alt={cover.alt} fetchPriority="high" draggable="false"/></button>
                    <button type="button" className="stage-step stage-previous" aria-label="上一个作品" onClick={()=>stepProject(-1)}><Icon name="left"/></button>
                    <button type="button" className="stage-step stage-next" aria-label="下一个作品" onClick={()=>stepProject(1)}><Icon name="right"/></button>
                    <button type="button" className="stage-zoom" onClick={event=>openMedia(project.media,event.currentTarget)} aria-label={"放大"+project.name+"画面"}><Icon name="zoom"/><span>放大画面</span></button>
                    <output className="stage-position" aria-label="当前作品" aria-live="polite"><span>{String(selected+1).padStart(2,'0')}</span><span aria-hidden="true"> / </span><span>{String(PROJECTS.length).padStart(2,'0')}</span><span className="sr-only"> · {project.name}</span></output>
                  </div>
                  <div className="project-caption" key={project.id}><div><h2 id="current-project">{project.name}</h2><p className="project-kind">{project.kind}</p></div><div className="project-description"><p>{project.id==="picture"?<><span className="keep">自然语言规划修图，</span><span className="keep">画布编辑、预览与导出。</span></>:project.description}</p></div><a className="button primary project-cta" href="#case-study">查看项目<Icon name="down"/></a></div>
                </div>
                <div className="project-picker" role="tablist" aria-label="选择作品" style={{"--active":selected,"--column":selected%2,"--row":Math.floor(selected/2)}} onKeyDown={onProjectKey}>
                  <span className="picker-indicator" aria-hidden="true"/>
                  {PROJECTS.map((item,index)=><button type="button" className="project-entry" id={"project-tab-"+item.id} key={item.id} role="tab" aria-label={item.name} aria-selected={index===selected} aria-controls="showcase-panel" tabIndex={index===selected?0:-1} onClick={()=>selectProject(index)}><img className="project-preview" src={mediaById(item.media).src} alt=""/><span className="project-entry-copy"><span className="project-entry-name">{item.name}</span><span className="project-entry-short">{["AI 修图","水产 AI","Web 原型","数据可视化"][index]}</span><Icon name={item.icon}/></span></button>)}
                </div>
              </section>

              <article className="case-study" id="case-study" aria-label={project.name+"项目详情"}><div id={project.section} key={project.id}>
                <div className="case-top"><p>{project.name}</p><ExternalLink className="text-link" href={project.url}>{project.linkLabel}</ExternalLink></div>
                {project.id==="picture"&&<PictureCase openMedia={openMedia}/>}
                {project.id==="dify"&&<DifyCase filter={filter} setFilter={setFilter} visibleMedia={visibleMedia} openMedia={openMedia}/>}
                {project.id==="web"&&<WebCase/>}
                {project.id==="twin"&&<TwinCase openMedia={openMedia}/>}
              </div></article>

              <section className="expertise" id="skills" aria-labelledby="skills-title"><header className="reveal-title"><h2 id="skills-title">技术与实践</h2></header><div className="skill-rows">
                <article className="skill-row reveal-copy"><div className="practice-title"><span aria-hidden="true">01</span><h3>接口与任务</h3></div><div><p>结合修图项目学习 Python、FastAPI 与 Pydantic，梳理请求校验、数据保存和异步任务。</p><button type="button" className="practice-link" onClick={()=>showCase(0)}>看修图项目<Icon name="right"/></button></div></article>
                <article className="skill-row reveal-copy"><div className="practice-title"><span aria-hidden="true">02</span><h3>检索与工作流</h3></div><div><p>在 Dify 中配置知识检索与业务分支；结合修图项目理解 LangGraph 规划、工具调用和人工确认。</p><button type="button" className="practice-link" onClick={()=>showCase(1)}>看水产 AI 实践<Icon name="right"/></button></div></article>
                <article className="skill-row reveal-copy"><div className="practice-title"><span aria-hidden="true">03</span><h3>交互与交付</h3></div><div><p>参与交互原型、页面迁移和界面验收，通过 AI 协作推进 React 画布与本机交付，继续学习 JavaScript、Git 和 Docker。</p><button type="button" className="practice-link" onClick={()=>showCase(2)}>看交互原型<Icon name="right"/></button></div></article>
              </div></section>
              <section className="contact" id="contact" aria-labelledby="contact-title"><h2 id="contact-title">聊聊项目，<br/>也聊聊机会。</h2><div className="contact-links"><a className="contact-email" title="打开默认邮件应用" href="mailto:3077602965@qq.com?subject=AI%E5%BA%94%E7%94%A8%E5%B7%A5%E7%A8%8B%E5%B8%88%E4%BD%9C%E5%93%81%E9%9B%86%E8%81%94%E7%B3%BB"><Icon name="mail"/>3077602965@qq.com</a><div className="contact-more"><ExternalLink className="contact-other" href="https://github.com/nigu666">GitHub 主页</ExternalLink><ExternalLink className="contact-other" href="../zhihui-shuichan-jiaohu-yuanxing/">更多交互作品</ExternalLink></div></div></section>
            </main>
            <footer className="footer"><span>雷雨天 · AI 应用开发</span><a href="#profile">返回顶部<Icon name="up"/></a></footer>
          </div>
        </div>
        {lightbox&&<Lightbox items={lightbox.items} index={lightbox.index} trigger={lightbox.trigger} onClose={()=>setLightbox(null)} onChange={index=>setLightbox(current=>({...current,index}))}/>}
      </>;
    }
    ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
