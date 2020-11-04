// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@font-face {\n  font-family: \"iconfont\";\n\n  src: url('iconfont.eot?t=1604024695799'); /* IE9 */\n\n  src: url('iconfont.eot?t=1604024695799#iefix') format('embedded-opentype'), /* IE6-IE8 */\n  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),\n  url('iconfont.woff?t=1604024695799') format('woff'),\n  url('iconfont.ttf?t=1604024695799') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */\n  url('iconfont.svg?t=1604024695799#iconfont') format('svg'); /* iOS 4.1- */\n}\n\n.iconfont {\n  font-family: \"iconfont\" !important;\n  font-size: 2rem;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-youtube:before {\n  content: \"\\e8a7\";\n  color: #e53631;\n}\n\n.icon-discord:before {\n  content: \"\\e66e\";\n  color: #6074c3;\n}\n\n.icon-medium:before {\n  content: \"\\e677\";\n  font-size: 1.8rem;\n}\n\n.icon-github:before {\n  content: \"\\e50e\";\n  color: #4ca528;\n}\n\n.icon-Twitterletterlogo:before {\n  content: \"\\e6b4\";\n}\n\n.icon-Twitterletterlogo1:before {\n  content: \"\\e6b7\";\n  color: #55acee;\n}\n\n.icon-twitter:before {\n  content: \"\\e79b\";\n}\n\n.icon-Paper:before {\n  content: \"\\e6b6\";\n}\n\n.icon-medium1:before {\n  content: \"\\ec0e\";\n  font-size: 1.8rem;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}