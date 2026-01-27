---
title: Claude Code使用技巧-为Claude Code接入国产大模型
date: 2026-01-27 16:16:09
permalink: /pages/d3d853/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---
在AI时代的程序员，越来越离不开AI开发代码工具，目前比较热门的有Claude code、codex、opencode以及智能AI的IDE比如，cursor、trae、[antigravity](https://antigravityide.net/zh)等其他工具。

使用AI开发工具离不开大模型的接入，AI工具就比如是一辆车的外壳，只有加上大模型发动机才能发挥出巨大的能量。

本文介绍下比较的Claude Code【简称CC】的使用，并且可以接入国产大模型，免费使用大模型。

## 安装Claude
<font style="color:rgb(51, 51, 51);">第一步是获取 </font>[Claude Code](https://claude.com/product/claude-code)<font style="color:rgb(51, 51, 51);"> 的命令行客户端（CLI）</font>

### 环境准备
<font style="color:rgb(51, 51, 51);">在安装之前，请确保你的系统中已经安装了 Node.js 18.0 或更高版本。Claude Code 是基于 Node.js 生态构建的，npm 是其首选的安装工具。你可以在终端中运行以下命令来检查你的 Node.js 版本：</font>

```bash
node -v
```

<font style="color:rgb(51, 51, 51);">如果版本低于 18.0，请先前往</font>[ Node.js](https://nodejs.org/zh-cn)<font style="color:rgb(51, 51, 51);"> 官网进行升级</font>

或者使用nvm进行升级

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.20.0".

# Verify npm version:
npm -v # Should print "10.9.3".
```

### <font style="color:rgb(51, 51, 51);">全局安装 Claude Code</font>
<font style="color:rgb(51, 51, 51);">打卡终端，运行以下命令来全局安装 Claude Code</font>

```bash
npm install -g @anthropic-ai/claude-code
```



等一会，安装完成后，<font style="color:rgb(51, 51, 51);">可以通过运行以下命令来验证 Claude Code 安装和运行是否成功</font>

```bash
# 查看 claude 的安装位置
# which claude
/usr/local/bin/claude

# claude --version
2.1.12 (Claude Code)
```

看到版本号说明已经安装成功。

### <font style="color:rgb(51, 51, 51);">首次运行 Claude Code</font>
<font style="color:rgb(51, 51, 51);">如果你直接运行 claude 命令，你将看到 Claude Code 的“欢迎”页面，如下图所示：</font>

<!-- 这是一张图片，ocr 内容为：WELCOME TO CLAUDE CODE V2.0.11 LET'S GET STARTED. WITH YOUR TERMINAL STYLE THAT LOOKS BEST CHOOSE THE TEXT TO CHANGE THIS LATER, RUN /THEME  > 1. DARK MODE 2.LIGHT MODE 3. DARK MODE (COLORBLIND-FRIENDLY) 4. LIGHT MODE (COLORBLIND-FRIENDLY) 5. DARK MODE (ANSI CO COLORS ONLY) (ANSI COLORS ONLY) 6.LIGHT MODE 1 FUNCTION GREET() 2 WORLD!); CONSOLE.LOG("HELLO, 23  CONSOLE.LOG("HELLO, CLAUDE!"); -->
![](https://cdn.nlark.com/yuque/0/2026/png/737887/1769396273015-7ba7dd7d-b8c2-4c71-b398-9ade368a9fad.png)

可以看<font style="color:rgb(51, 51, 51);">到 Claude Code 让你选择终端主题（Terminal Theme），默认是第一个 Dark mode。这里我们可以</font>**<font style="color:rgb(51, 51, 51);">直接敲击回车进入下一个页面</font>**<font style="color:rgb(51, 51, 51);">（后续如果要重新配置主题时，可以通过 /config 斜杠命令进行）：</font>

<font style="color:rgb(51, 51, 51);"></font>

<font style="color:rgb(51, 51, 51);">第二个页面会引导你选择登录方式，</font>

+ <font style="color:rgb(51, 51, 51);">Claude Code 支持通过浏览器登录官方 Anthropic 账户，</font>
+ <font style="color:rgb(51, 51, 51);">也可以通过 API 方式与 Claude 大模型进行交互 (通过方向键选择下面的选项“Anthropic Console account”)。</font>

<font style="color:rgb(51, 51, 51);">不过，这里请先不要进行这一步，因为我们的目标是绕过官方 API，连接到我们自己的“引擎”。</font>

## 接入国产大模型
### <font style="color:rgb(51, 51, 51);">连接国产 AI 大模型- </font>智谱大模型
<font style="color:rgb(51, 51, 51);">首先需要注册智谱 AI 的账户 并创建 API Key</font>

<font style="color:rgb(51, 51, 51);">打开 </font>[智谱](https://open.bigmodel.cn/)<font style="color:rgb(51, 51, 51);"> 官网，注册并登录你的账户。打卡</font>[API keys](https://bigmodel.cn/usercenter/proj-mgmt/apikeys)<font style="color:rgb(51, 51, 51);">页面</font>

然后<font style="color:rgb(51, 51, 51);">就可以通过环境变量配置 Claude Code 访问智谱大模型 API 的连接地址和身份令牌了。你可以在你的 Shell 配置文件中添加下面两行</font>

```bash
export ANTHROPIC_BASE_URL="https://open.bigmodel.cn/api/anthropic"
export ANTHROPIC_AUTH_TOKEN="<your_zhipu_api_key>"
```

以上是MAC系统配置；windows系统需要在环境变量中进行配置。

+ `ANTHROPIC_BASE_URL`：这是最关键的一行。它告诉 Claude Code 客户端，不要去访问默认的 Anthropic API 地址，而是将所有的网络请求都发送到智谱 AI 的 API 兼容端点。我们在这里实现了“请求重定向”。
+ ANTHROPIC_AUTH_TOKEN：尽管变量名看起来是“Anthropic”的，但由于我们已经重定向了 BASE_URL，这个 Token 实际上会被发送给智谱 AI 的服务器进行验证。我们在这里实现了“身份凭证替换”。

<font style="color:rgb(51, 51, 51);">环境变量生效后，我们在本地新建一个项目test重新执行 claude：</font>

<font style="color:rgb(51, 51, 51);">可以看到下图</font>

<!-- 这是一张图片，ocr 内容为：SECURITY NOTES: CLAUDE CAN MAKE MISTAKES CLAUDE'S RESPONSES, ESPECIALLY WHEN YOU SHOULD ALWAYS REVIEW RUNNING CODE. INJECTION RISKS, ONLY USE IT DUE TO PROMPT INJ WITH CODE YOU TRUST DETAILS FOR MORE SEE: HTTPS://DOCS.CLAUDE.COM/S/CLAUDE-CODE-SECURITY ENTER TO CONTINUE... PRESS -->
![](https://cdn.nlark.com/yuque/0/2026/png/737887/1769397023516-26651f45-a668-4b8c-a282-3f79d495b7d8.png)

<font style="color:rgb(51, 51, 51);">这次 Claude Code 没有让我们选择 login method，而是直接 login 成功了！敲击回车后，我们看到下一个页面：</font>

<!-- 这是一张图片，ocr 内容为：CLAUDE DO YOU TRUST THE FILES IN THIS FOLDER? /USERS/SHENSHUAI/DOWNLOADS/WEB-TEMPLATE/BLOG HIS CAN POSE SECURITY RISKS, SO CLAUDE CODE MAY READ, WRITE, OR EXECUTE FILES CONTAINED IN THIS DIRECTORY. THIS FILES FROM TRUSTED SOURCES. ONLY USE LEARN MORE 1. YES, PROCEED 2. NO, EXIT ENTER TO CONFIRM -ESC TO CANCEL -->
![](https://cdn.nlark.com/yuque/0/2026/png/737887/1769397178117-246bdba4-2678-444a-9099-04bef40a2504.png)

<font style="color:rgb(51, 51, 51);">询问我是否信任该本地文件夹，敲击回车选择信任后，我们便正式进入 Claude Code 的工作页面：</font>

<font style="color:rgb(51, 51, 51);">在输入提示符后面输入 /status 后回车，就可以看到当前 Claude Code 使用的模型的各种最新信息：</font>

<!-- 这是一张图片，ocr 内容为：/STATUS TAB TO CYCLE) CONFIG (T/一 SETTINGS: STATUS USAGE OR VERSION: 2.1.12 SESSION NAME: / RENAME TO ADD A NAME SESSION ID: B8AA7711-D154-4E1D-A212-CD879145A06A CWD:/ USERS/SHENSHUAI/DOWNLOADS/WEB-TEMPLATE/BLOG AUTH TOKEN: ANTHROPIC_AUTH_TOKEN ANTHROPIC BASE URL:HTTPS://CLAUDE-CODE.CLUB/API MODEL: DEFAULT (CLAUDE-SONNET-4-5-20250929) MEMORY: SETTING SOURCES: -->
![](https://cdn.nlark.com/yuque/0/2026/png/737887/1769397230092-2233d517-e23c-4fa3-bc7a-09d8cea6d0dc.png)

<font style="color:rgb(51, 51, 51);">使用的是 claude-sonnet-4-5-20250929，不过显然这不是真的，背后智谱大模型到底使用什么模型呢?我们可以自行设置;</font>

### <font style="color:rgb(51, 51, 51);">设置默认模型</font>
<font style="color:rgb(51, 51, 51);">接下来就设置一下要使用的智谱 AI 的模型。找到并修改 Claude Code 的（分级）配置文件 settings.json。这个文件是 Claude Code 的“大脑中枢”，控制着它的核心行为，包括环境变量、权限、工具行为等;</font>

<font style="color:rgb(51, 51, 51);">在我们动手修改 settings.json 之前，你必须先建立一个清晰的认知：Claude Code 的配置并非只有一个文件，而是一个</font>**<font style="color:rgb(51, 51, 51);">设计精巧的分层配置体系</font>**<font style="color:rgb(51, 51, 51);">。有点类似npm包的层级，项目中的级别最高，也可全局中安装依赖包。</font>

<font style="color:rgb(51, 51, 51);">核心思想是，</font>**<font style="color:rgb(51, 51, 51);">高层级的配置会覆盖低层级配置中的同名设置</font>**<font style="color:rgb(51, 51, 51);">。</font>

<font style="color:rgb(51, 51, 51);">这五个层级各自的用途非常明确：</font>

+ <font style="color:rgb(51, 51, 51);">企业级策略（managed-settings.json）：由 IT/DevOps 团队统一分发，用于强制执行公司级安全策略，拥有最高优先级，不可被覆盖。</font>
+ <font style="color:rgb(51, 51, 51);">命令行参数（例如–model …）：为单次会话提供的临时覆盖，非常适合快速测试。</font>
+ <font style="color:rgb(51, 51, 51);">项目级个人设置（.claude/settings.local.json）：你个人在此项目的特定偏好（如测试用模型），默认被 Git 忽略，不会与团队共享。</font>
+ <font style="color:rgb(51, 51, 51);">项目级共享设置（.claude/settings.json）：需要团队所有成员共享的项目级规范（如权限规则），应该提交到代码库。</font>
+ <font style="color:rgb(51, 51, 51);">用户级全局设置（~/.claude/settings.json）：存放你个人的、希望在所有项目中都生效的全局配置。这正是我们本次“引擎移植”手术的核心操作区。</font>

<font style="color:rgb(51, 51, 51);">我们以用户级全局配置 ~/.claude/settings.json 为例，来看看如何设置默认使用的智谱大模型。</font>

<font style="color:rgb(51, 51, 51);">这个文件通常位于你用户主目录下的 .claude 文件夹中</font>

```bash
mkdir -p ~/.claude
# 使用你熟悉的编辑器打开，比如VS Code或Vim
# 如果文件不存在，这个命令会创建它
touch ~/.claude/settings.json
# 或者
# vim ~/.claude/settings.json
```

<font style="color:rgb(51, 51, 51);">打开这个（可能是空的）settings.json 文件，将以下内容完整地复制进去：</font>

```bash
{
  "env": {
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.6",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-4.6"
  }
}
```

<font style="color:rgb(51, 51, 51);">保存并关闭 settings.json 文件。我们重新运行 Claude Code 并通过 /status 命令查看当前模型信息：</font>

<!-- 这是一张图片，ocr 内容为：/STATUS CONFIG (-// OR TAB TO CYCLE) USAGE SETTINGS: STATUS VERSION:2.1.12 SESSION NAME: /RENAME TO ADD A NAME SESSION ID: FA214287-4765-4B92-B788-376ADC030FA8 CWD:/ USERS/SHENSHUAI/DOWNLOADS/WEB-TEMPLATE/BLOG AUTH TOKEN: ANTHROPIC_AUTH_TOKEN ANTHROPIC BASE URL:HTTPS:// TPS://CLAUDE-CODE.CLUB/API MODEL:DEFAULT(GLM-4.6) MEMORY: SETTING SOURCES: USER SETTINGS -->
![](https://cdn.nlark.com/yuque/0/2026/png/737887/1769397799935-0f4c13ee-8709-48f5-8d1b-2c7a900f31fa.png)

可以看到修改了模型的调用。

智谱提供了一些免费模型的使用

[https://docs.bigmodel.cn/cn/guide/models/free/glm-4.7-flash](https://docs.bigmodel.cn/cn/guide/models/free/glm-4.7-flash)

<!-- 这是一张图片，ocr 内容为：BIGMODEL 控制台 财务 价格 SEARCH... API KE SK 使用指南 更新日志条款与协议 常见问题 编码套餐 API文档 场景示例 体验中心:快速测试模型在业务场景上的效果 图像生成模型 接口文档:API调用方式 视频生成模型 ON THIS PAGE 概览 音视频模型 调用示例 能力支持 向量模型 推荐场景 以下是完整的调用示例,帮助您快速上手GLM-4.7-FIASH模型. 角色模型 详细介绍 免费模型 使用资源 PYTHON JAVA PYTHON(L日) CURL GLM-4.7-FLASH 调用示例 GLM-4.6V-FLASH 基础调用 GLM-4.1V-THING-FLASH CURL -X POST "HTTPS://OPEN.BIGMODEL.CN/API/PAAS/V4/CHAT/COMPLETIONS" GLM-4-FLASH-250414 -H "CONTENT-TYPE:APPLICATION/JSON" -H "AUTHORIZATION: BEARER YOUR-API-KEY" GLM-4V-FLASH F P- COGVIEW-3-FLASH "MODEL":"QLM-4.7-FLASH", "MESSAGES":[ COGVIDEOX-FLASH "ROLE": "USER", 模型能力 "CONTENT":"作为一名营销专家,请为我的产品创作一个吸引人的口号" 深度思考 思考模式 "ROLE": "ASSISTANT", -->
![](https://cdn.nlark.com/yuque/0/2026/png/737887/1769397941042-017a6bb4-e377-4be0-a2b7-eb757684c4a5.png)

可以修改成这些模型进行使用。

免费模型开发能力有限，开发一些简单功能可以使用，如果使用热门流行的模型，还是需要付费使用。

### 通过代理转发链接
如果不想使用国产模型，也可以使用国内的一些代理商，通过他们提供的转发API可以使用原生的claude的大模型。

作为曾注册和测试了10来个系统账户，测试使用下来 [CC club](https://customer.claude-code.club/invite/CMHEVT) 使用最方便，售后服务也比较好，免费的额度给的比较多，而且每周都可以重置免费额度。这里的付费额度也是非常优惠和划算的。

当然你也可以注册其它代理使用：

+ [https://deeprouter.top/](https://deeprouter.top/)
+ [https://moacode.org/](https://moacode.org/)
+ [https://api.code-relay.com/](https://api.code-relay.com/)

#### 主要介绍下CC club的使用
可以按照官方提供的[使用文档](https://academy.claude-code.club/getting-started/installation)进行配置；前提是已经安装好了CC；

然后就主要在 [配置](https://academy.claude-code.club/getting-started/installation/macos#3-%E8%AE%BE%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F) 这一步

<!-- 这是一张图片，ocr 内容为：3.设置环境变量 配置CLAUDE CODE环境变量 为了让CLAUDECODE连接到你的中转服务,需要设置两个环境变量. 在TERMINAL中运行以下命令设置永久环境变量(一条执行): #对于ZSH(默认) ANTHROPIC_BASE_URL-"HTTPS://CLAUDE-CODE.CLUB/API""" ECHO 'EXPORT ANT ~/.ZSHRC 'EXPORT ANTHROPIC_AUTH_TOKEN-"你的API密钥"'' >> ~/.ZSHRC ECHO CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC-1' ~/.ZSHRC 'EXPORT VV ECHO ~/.ZSHRC SOURCE #对于BASH ECHO 'EXPORT ANTHROPIC_BASE_URL-"HTTPS://CLAUDE-CODE.CLUB/API"' Z VV7 ~/.BASH_PROFILE ~/.BASH_PROFILE ANTHROPIC_AUTH_TOKEN"你的API密钥"' >> ~/. 'EXPORT ECHO CLAUDE_CODE_DISABLE NONESSENTIAL_TRAFFIC-1' >> ~/.BASH-PROFILE "EXPORT ECHO ~/.BASH_PROFILE SOURCE .记得将"你的API密钥"替换为在上方"APIKEYS"标签页中创建的实际密钥.设置后需要重新打开TERMINAL 窗口才能生效. 关于 CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC E的非必要网络请求(如遥测数据上报).设置为1后: 该环境变量用于关闭 CLAUDE CODE的 -->
![](https://cdn.nlark.com/yuque/0/2026/png/737887/1769399128284-05f4ff2d-e2e8-4889-8e1c-eb2843fcb8bb.png)

配置完成后，就可以使用原汁原味的claude工具。

## 使用Claude-code-router调用魔搭社区的模型
使用claude-code-router，可以调用魔搭社区的模型，魔搭社区提供每天2000次的调用额度，当然每个模型还有日调用限制额度。可以测试使用不同的模型。

首先全局安装 claude-code-router 插件

[https://github.com/musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

```bash
npm install -g @musistudio/claude-code-router
```

然后按照说明问题创建并配置 <font style="color:rgb(31, 35, 40);background-color:rgba(129, 139, 152, 0.12);">~/.claude-code-router/config.json </font>

```bash
{
  "OPENAI_API_KEY": "$OPENAI_API_KEY",
  "GEMINI_API_KEY": "${GEMINI_API_KEY}",
  "Providers": [
    {
      "name": "openai",
      "api_base_url": "https://api.openai.com/v1/chat/completions",
      "api_key": "$OPENAI_API_KEY",
      "models": ["gpt-5", "gpt-5-mini"]
    }
  ]
}
```

openai是chatGPT的模型，使用时会有一些网络问题。

我们可以使用[魔搭社区](https://www.modelscope.cn/models)的免费模型，每天有2000的免费调用额度。

魔搭社区的使用，要先完成阿里云的认证。

在首页-[访问控制](https://www.modelscope.cn/my/access/token)下，创建key，也可以使用默认的key。后边调用模型时，都需要填写key；

<!-- 这是一张图片，ocr 内容为："NAME": "MODELSCOPE", "HTTPS://API-INFERENCE.MODELSCOPE.CN/V1/CHAT/COMPLETIONS", "API_BASE_URL":"HTTPS://A "API_KEY": "U ["QWEN/QWEN3-CODER-480B-A35B-INSTRUCT", "QWEN/QWEN/QWEN3-235B-THINKIN "MODELS": "TRANSFORMER": { "USE": [ 1 "MAXTOKEN", Y "MAX_TOKENS": 65536 了 ], "ENHANCETOOL" ], "QWEN/QWEN3-235B-A22B-THINKING-2507": { "USE": ["REASONING"] 子 -->
![](https://cdn.nlark.com/yuque/0/2026/png/737887/1769398636513-af7cf1d7-7b99-4ff1-aa19-7f2905256b3f.png)

### 在模型页面选择支持推理的模型
<!-- 这是一张图片，ocr 内容为：社区 文档 首页 模型库 数据集 创空间 科学智能 搜索您感... AIGC专区 MCP广场 ADODEL5COPE 模型库 支持部署 支持训练 支持体验 综合排序1L 支持评测 输入关键词搜索您想要的模型(共36,576个) 推理API-INFERENCE 共找到36,576个结果 任务 其他 组织 框架 推理API-INFERENCE 支持通过标准推理API接口迅速调用 快速搜索 GLM-4.7-FLASH NEW 民文本生成  222B TRANSFORMERS 等3个框架 热门任务 2026.01.21 智谱.AL 63.7K                                                                                                 模型DEMO体验 支持自定义输入内容,一键体验模型推理效果 日文本生成图文本生成图片 文本生成视频 国视觉多模态理解 ZHIPUAI/GLM-4.7 风语音合成品统一多模态 RESTFUL API体验 提供RESTFUL API 集成能力,快速实现概念验证 2026.01.20 智谱.A 154 48.1K 多模态 ZHIPUAI/AUTOGLM-PHONE-9B DEEPSEEK-AI/DEEPSEEK-V3.2 &视觉多模态理解风文本生成图片 园图像描述区文本生成视频 287 2026.01.20 498.8K 232.6K 2025.12.01 智谱.AL 283 DEEPSEEK 品视频描述炎视觉定位印多模态表征 &视觉问答视频问答跟图文检索 回视觉蕴含冻生成式多模态表征 通义千问3-8B 通义千问3-VL-8B-INSTRUCT 金多模态相似度国文档理解 通义千问  2025.10.15 女通义千问 229 1.0M 2025.07.27 已视频时序定位 生成模型调优 图片生成视频 品多模态对话 图 品统一多模态 图片生成图片 通义千问3-32B 通义千问3-235B-A22B-INSTRUCT-2507 以具身智能 -->
![](https://cdn.nlark.com/yuque/0/2026/png/737887/1769398796979-1582b879-0dd9-4f1b-a373-0114c9118888.png)

选择一个点击进去

在模型的详情页面中，可以在查看代码示例中找到配置使用方法

比如：GLM-4.7模型

<!-- 这是一张图片，ocr 内容为：X 推理API-INFERENCE 热可用 BETA API提供: API令牌 魔搭社区 ANTHROPIC OPENAI TOKEN-CLAUDE-CODE IMPORT ANTHROPIC CLIENTHROPIC.ANTHROPIC BASE_URL-'HTTPS://API-INFERENCE.MODELSCOPE.CN', #MODELSCOPE TOKEN 2' API_KEY WITH CLIENT.MESSAGES.STREAM( MODEL-'ZHIPUAI/GLM-4.7', # MODELSCOPE MODEL-ID MESSAGES[ 丹 "ROLE": "USER", "CONTENT":"你好" 子 开启流式返回 免费魔搭API-INFERENCE,感谢 阿里云百炼提供支持 -->
![](https://cdn.nlark.com/yuque/0/2026/png/737887/1769398915536-27f320e3-6d8c-44a6-8dc4-727bc1cbbe92.png)

### 不同模型的json配置
下面是使用GLM-4.7模型的完整的config.json配置；

```json
{
  "Providers": [
    {
      "name": "modelscope",
      "api_base_url": "https://api-inference.modelscope.cn/v1/chat/completions",
      "api_key": "你自己的APIKEY",
      "models": ["ZhipuAI/GLM-4.7"],
      "transformer": {
        "use": [
          [
            "maxtoken",
            {
              "max_tokens": 65536
            }
          ],
          "enhancetool"
        ],
        "Qwen/Qwen3-235B-A22B-Thinking-2507": {
          "use": ["reasoning"]
        }
      }
    }
  ],
  "Router": {
    "default": "modelscope,ZhipuAI/GLM-4.7",
    "think": "modelscope,ZhipuAI/GLM-4.7",
    "background": "modelscope,ZhipuAI/GLM-4.7",
    "longContext": "modelscope,ZhipuAI/GLM-4.7"
  }
}
```

添加deepseek的模型配置

```json
{
  "Providers": [
    {
      "name": "modelscope",
      "api_base_url": "https://api-inference.modelscope.cn/v1/chat/completions",
      "api_key": "ms-fd370b1c-3aed-4c0c-9980-2c545dbc4782",
      "models": ["deepseek-ai/DeepSeek-V3.2"],
      "transformer": {
        "use": [
          [
            "maxtoken",
            {
              "max_tokens": 65536
            }
          ],
          "enhancetool"
        ],
        "Qwen/Qwen3-235B-A22B-Thinking-2507": {
          "use": ["reasoning"]
        }
      }
    }
  ],
  "Router": {
	  "default": "modelscope,deepseek-ai/DeepSeek-V3.2",
	  "think": "modelscope,deepseek-ai/DeepSeek-V3.2",
	  "background": "modelscope,deepseek-ai/DeepSeek-V3.2",
	  "longContext": "modelscope,deepseek-ai/DeepSeek-V3.2"
  }
}
```

其他的模型都是类似的配置方法。使用下来，越是热门模型每日的调用限制额度越低，可以进行多测试。

