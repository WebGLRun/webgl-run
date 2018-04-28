interface GenerateResultParams {
  htmlTemplate?: string,
  html: string,
  css: string,
  js: string
}

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Webgl-playground</title>
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
  return tmp.replace('{{html}}', a)
            .replace('{{css}}', b)
            .replace('{{js}}', c)
            .replace(a, params.html)
            .replace(b, params.css)
            .replace(c, params.js)
}