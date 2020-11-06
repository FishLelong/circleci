// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".header-container.svelte-9w0bg2 .left img.svelte-9w0bg2{height:50px}.header-container.svelte-9w0bg2 .right .link.svelte-9w0bg2{margin-left:1.3rem}button.svelte-9w0bg2.svelte-9w0bg2{outline:none}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}