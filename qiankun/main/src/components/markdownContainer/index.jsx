// 引入 ReactMarkdown 组件，用于渲染 Markdown 内容
import ReactMarkdown from 'react-markdown';
// 引入 remark-gfm 插件，用于支持 GitHub Flavored Markdown（GFM）语法
import remarkGfm from 'remark-gfm';
// 引入 GitHub Markdown CSS 文件，用于应用 Markdown 样式
import 'github-markdown-css';
// 引入 rehype-highlight 插件，用于支持代码高亮
import rehypeHighlight from 'rehype-highlight';
// 引入 highlight.js 的核心库
import hljs from 'highlight.js/lib/core';
// 引入 highlight.js 的 JavaScript 语言包
import javascript from 'highlight.js/lib/languages/javascript';
// 引入 highlight.js 的 CSS 语言包
import css from 'highlight.js/lib/languages/css';
// 引入 highlight.js 的 GitHub 样式文件
import 'highlight.js/styles/github.css';

// 注册 JavaScript 语言包到 highlight.js
hljs.registerLanguage('javascript', javascript);
// 注册 CSS 语言包到 highlight.js
hljs.registerLanguage('css', css);

/**
 * MarkdownContainer 组件
 * 用于渲染 Markdown 内容并支持代码高亮
 * @param {Object} props - 组件属性
 * @param {string} props.children - 要渲染的 Markdown 内容
 * @returns {JSX.Element} - 渲染后的 Markdown 内容
 */
const MarkdownContainer = ({ children }) => {
    return <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {children}
        </ReactMarkdown>
    </div>
}

export default MarkdownContainer