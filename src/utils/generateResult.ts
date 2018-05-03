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
    <script src="https://webgl.404forest.com/assets/js/vconsole.min.js?v=3.2.0"></script>
    <script>
      {{glsl}}
    </script>
    <script>
      var vConsole = new VConsole({defaultPlugins: []})
      var myPlugin = new VConsole.VConsolePlugin('my_plugin', 'My Plugin')
      vConsole.addPlugin(myPlugin)
      myPlugin.on('showConsole', function() {window.parent.showConsole()})
      myPlugin.on('hideConsole', function() {window.parent.hideConsole()})
    </script>
    <style>
      #__vconsole .vc-mask {display: none!important}
      #__vconsole .vc-panel {min-height: 250px; transition: none!important;}
      #__vconsole .vc-switch {display: none;}
    </style>
    <style>{{css}}</style>
  </head>
  <body>
    {{html}}
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
  let glsl: string = Object.keys(params.glsl).map(e => {
    return `window.${e} = \`${params.glsl[e].content}\``
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