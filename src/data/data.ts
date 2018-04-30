export default [{
  title: '测试submenu标题',
  type: 'submenu',
  children: [{
    title: '测试group标题',
    type: 'group',
    children: [{
      title: '测试item标题A',
      type: 'item',
      content: {
        html: `<div>1312313123</div>`,
        css: `body {
          color: #fff;
          background-color: #1E1E1E;
        }`,
        js: `function x() {
          console.log("Hello world!");
        }`
      }
    }]
  }]
}]