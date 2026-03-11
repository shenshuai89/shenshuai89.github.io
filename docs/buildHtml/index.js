import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// 配置路径
const MD_DIR = './docs/theme/geektime'; // geektime.md 文件所在目录
// const MD_DIR = './docs/theme/mooc'; // mooc.md 文件所在目录
const OUTPUT_DIR = './dist';
const SRC_OUTPUT_DIR = path.join(OUTPUT_DIR, 'src');
const ITEMS_PER_PAGE = 40;
const LAZY_LOAD_THRESHOLD = 40;

// ========== 工具函数 ==========
function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ========== 确保输出目录存在 ==========
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(SRC_OUTPUT_DIR)) fs.mkdirSync(SRC_OUTPUT_DIR, { recursive: true });

// ========== 获取并排序 MD 文件 ==========
let files = fs.readdirSync(MD_DIR)
  .filter(file => file.endsWith('.md') && file !== 'index.md');

files = files
  .map(file => {
    const match = file.match(/^(\d+)-/);
    const num = match ? parseInt(match[1], 10) : 0;
    return { file, num };
  })
  .sort((a, b) => b.num - a.num) // 倒序
  .map(item => item.file);

console.log(`📄 找到 ${files.length} 个 Markdown 文件，正在处理...`);

// ========== 处理每个文章 ==========
const articleLinks = [];

files.forEach(file => {
  const mdPath = path.join(MD_DIR, file);
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  let htmlContent = marked.parse(mdContent);

  // 替换元信息 h2 块为 h1 + 发布日期
  htmlContent = htmlContent.replace(
    /<h2>([\s\S]*?)<\/h2>/,
    (fullMatch, innerText) => {
      let newHtml = '';
      const titleMatch = innerText.match(/title:\s*(.+)/i);
      const dateMatch = innerText.match(/date:\s*(.+)/i);

      if (titleMatch) {
        const title = titleMatch[1].trim();
        newHtml += `<h1>${escapeHtml(title)}</h1>\n`;
      }

      if (dateMatch) {
        const dateTime = dateMatch[1].trim();
        newHtml += `<p class="publish-date">发布日期: ${escapeHtml(dateTime)}</p>\n`;
      }

      return newHtml || fullMatch; // 若无匹配，保留原 h2
    }
  );

  const title = file.replace(/\.md$/, '');
  const htmlFileName = `${title}.html`;
  const encodedHref = encodeURI(`src/${htmlFileName}`);
  const htmlPath = path.join(SRC_OUTPUT_DIR, htmlFileName);

  const fullHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="../index.css">
</head>
<body>
  <div class="article-content">
    ${htmlContent}
  </div>
  <script src="../index.js"></script>
</body>
</html>
  `.trim();

  fs.writeFileSync(htmlPath, fullHtml, 'utf8');
  articleLinks.push({ title, href: encodedHref });
});

// ========== 生成 index.html ==========
const articlesData = articleLinks.map(item => ({
  title: item.title,
  href: item.href
}));

// 安全注入 JSON（防止 </script> 闭合）
const safeJson = JSON.stringify(articlesData, null, 2)
  .replace(/</g, '\\u003c')
  .replace(/\u2028/g, '\\u2028')
  .replace(/\u2029/g, '\\u2029');

const indexHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>课程目录</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <header>
    <h1>课程目录</h1>
    <div class="controls">
      <input type="text" id="search-input" placeholder="🔍 搜索课程（如 NestJS、Vue、Flutter...）" />
      <button id="theme-toggle" aria-label="切换主题">🌙</button>
    </div>
    <p id="total-count"></p>
  </header>
  <main>
    <div id="card-container" class="card-grid"></div>
    <button id="load-more" style="display:none;">加载更多</button>
  </main>
  <script>
    const articles = ${safeJson};
  </script>
  <script src="index.js"></script>
</body>
</html>
`.trim();
fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexHtml, 'utf8');

// ========== 生成 index.css ==========
const indexCss = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Microsoft YaHei", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f5f7fa;
  color: #333;
  padding: 2rem;
  line-height: 1.6;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

header h1 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

#total-count {
  color: #7f8c8d;
  font-size: 1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 1.2rem;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
}

.card a {
  text-decoration: none;
  color: #2980b9;
  font-weight: 600;
  font-size: 1.05rem;
  line-height: 1.4;
  flex-grow: 1;
  word-break: break-word;
}

.card a:hover {
  color: #1a5276;
  text-decoration: underline;
}

#load-more {
  display: block;
  margin: 2rem auto 0;
  padding: 0.8rem 2rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

#load-more:hover {
  background: #2980b9;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.2rem;
  }
  body {
    padding: 1.2rem;
  }
}

@media (max-width: 480px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

/* ========== 控件栏 ========== */
.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

#search-input {
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 30px;
  width: 320px;
  max-width: 100%;
  outline: none;
  transition: border-color 0.3s;
}

#search-input:focus {
  border-color: #3498db;
}

#theme-toggle {
  background: #f0f0f0;
  border: 2px solid #ddd;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

#theme-toggle:hover {
  background: #e0e0e0;
  transform: rotate(15deg);
}

/* ========== 暗色模式 ========== */
:root {
  --bg-primary: #f5f7fa;
  --bg-card: white;
  --text-primary: #333;
  --text-secondary: #7f8c8d;
  --border-color: #ddd;
  --shadow: rgba(0,0,0,0.08);
  --accent: #3498db;
  --accent-hover: #2980b9;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-card: #252526;
  --text-primary: #e0e0e0;
  --text-secondary: #aaa;
  --border-color: #444;
  --shadow: rgba(0,0,0,0.3);
  --accent: #4a90e2;
  --accent-hover: #5ca0f0;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.card {
  background: var(--bg-card);
  box-shadow: 0 4px 12px var(--shadow);
}

.card a {
  color: var(--accent);
}

.card a:hover {
  color: var(--accent-hover);
}

#search-input {
  background: var(--bg-card);
  border-color: var(--border-color);
  color: var(--text-primary);
}

#search-input::placeholder {
  color: var(--text-secondary);
}

#theme-toggle {
  background: var(--bg-card);
  border-color: var(--border-color);
  color: var(--text-primary);
}

/* 响应式微调 */
@media (max-width: 600px) {
  .controls {
    flex-direction: column;
    align-items: center;
  }
  #search-input {
    width: 100%;
  }
}
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'index.css'), indexCss, 'utf8');

// ========== 生成 index.js ==========
const indexJs = `
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('card-container');
  const loadMoreBtn = document.getElementById('load-more');
  const searchInput = document.getElementById('search-input');
  const themeToggle = document.getElementById('theme-toggle');
  const totalCountEl = document.getElementById('total-count');

  const ITEMS_PER_PAGE = ${ITEMS_PER_PAGE};
  let currentPage = 0;
  const allArticles = articles;
  let filteredArticles = [...allArticles];

  // ========== 主题切换 ==========
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // ========== 搜索过滤 ==========
  function filterArticles(query) {
    const q = query.trim().toLowerCase();
    if (q === '') {
      filteredArticles = [...allArticles];
    } else {
      filteredArticles = allArticles.filter(article =>
        article.title.toLowerCase().includes(q)
      );
    }
    currentPage = 0;
    container.innerHTML = '';
    renderArticles(currentPage);
    updateLoadMoreVisibility();
  }

  searchInput.addEventListener('input', (e) => {
    filterArticles(e.target.value);
  });

  // ========== 工具函数 ==========
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ========== 渲染与分页 ==========
  function renderArticles(page) {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const fragment = document.createDocumentFragment();

    for (let i = start; i < Math.min(end, filteredArticles.length); i++) {
      const article = filteredArticles[i];
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = '<a href="' + escapeHtml(article.href) + '">' + escapeHtml(article.title) + '</a>';
      fragment.appendChild(card);
    }

    container.appendChild(fragment);
  }

  function updateLoadMoreVisibility() {
    const total = filteredArticles.length;
    const isAllLoaded = (currentPage + 1) * ITEMS_PER_PAGE >= total;
    if (total > ITEMS_PER_PAGE && !isAllLoaded) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
    }
    totalCountEl.textContent = '共 ' + allArticles.length + ' 门课程（当前显示 ' + total + ' 项）';
  }

  // ========== 初始化 ==========
  renderArticles(currentPage);
  updateLoadMoreVisibility();

  loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    renderArticles(currentPage);
    updateLoadMoreVisibility();
  });
});
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'index.js'), indexJs, 'utf8');

console.log(`✅ 构建完成！`);
console.log(`📁 输出目录: ./dist`);
console.log(`📄 共生成 ${files.length} 篇文章`);