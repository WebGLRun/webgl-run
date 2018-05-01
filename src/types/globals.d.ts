declare const monaco: Monaco

interface Monaco {
  editor: any
}

interface RootState {
  title: string,
  selected: {
    sub: string,
    item: string
  },
  editor: {
    htmlEditor: {
      content: string
    },
    cssEditor: {
      content: string
    },
    jsEditor: {
      content: string
    }
  },
  result: {
    content: string
  }
}

interface Action {
  type: string,
  [propName: string]: any
}

interface File {
  title: string,
  content: {
    html: string,
    css: string,
    js: string
  }
}