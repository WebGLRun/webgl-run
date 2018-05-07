interface GenerateResultParams {
  htmlTemplate?: string,
  glsl: {
    [propNames: string]: {
      content: string
    }
  },
  html: string,
  css: string,
  js: string
}

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>WebGL Playground</title>
    <script src="https://unpkg.com/v3js"></script>
    <script src="https://webgl.404forest.com/assets/js/vconsole.min.js?v=3.2.0"></script>
    <script src="/assets/js/stats.min.js"></script>
    <script>
      {{glsl}}
    </script>
    <style>
      body {margin: 0;padding: 0;}
      #__vconsole .vc-mask {display: none!important}
      #__vconsole .vc-panel {min-height: 250px; transition: none!important;}
      #__vconsole .vc-switch {display: none;}
    </style>
    <style>{{css}}</style>
  </head>
  <body>
    {{html}}
    <script>
      // init vConsole
      var vConsole = new VConsole({defaultPlugins: []})
      var myPlugin = new VConsole.VConsolePlugin('my_plugin', 'My Plugin')
      vConsole.addPlugin(myPlugin)
      myPlugin.on('showConsole', function() {window.parent.showConsole()})
      myPlugin.on('hideConsole', function() {window.parent.hideConsole()})

      // init stats.js
      var stats = new Stats();
      stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(stats.dom);
      stats.dom.style.display = 'none'
      stats.dom.style.left = 'auto'
      stats.dom.style.right = '0px'
      function _animate() {
        stats.begin();
        stats.end();
        requestAnimationFrame(_animate);
      }
      requestAnimationFrame(_animate);
      function _meterHide() {
        stats.dom.style.display = 'none'
        window.parent.hideMeter()
      }
      function _meterShow() {
        stats.dom.style.display = 'block'
        window.parent.showMeter()
      }
    </script>
    <script>
      {{js}}
    </script>
  </body>
</html>`

export function generateResult(params: GenerateResultParams): string {
  let tmp: string = params.htmlTemplate || htmlTemplate
  let a: string = Math.random().toString(36).substr(2)
  let b: string = Math.random().toString(36).substr(2)
  let c: string = Math.random().toString(36).substr(2)
  let d: string = Math.random().toString(36).substr(2)
  let glsl: string = 'window.$shaders = {}\n' + Object.keys(params.glsl).map(e => {
    return `window.$shaders.${e} = \`${params.glsl[e].content}\``
  }).join('\n')
  return tmp.replace('{{html}}', a)
            .replace('{{css}}', b)
            .replace('{{js}}', c)
            .replace('{{glsl}}', d)
            .replace(a, params.html)
            .replace(b, params.css)
            .replace(c, params.js)
            .replace(d, glsl)
}
