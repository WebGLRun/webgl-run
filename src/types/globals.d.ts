declare const monaco: Monaco

interface Monaco {
  editor: any
}

interface RootState {
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