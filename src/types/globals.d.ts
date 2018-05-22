declare const monaco: Monaco

interface Monaco {
  editor: any
}

interface UserInfo {
  oauthType: string,
  nickName: string
}

interface RootState {
  user: UserInfo | null,
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
    },
    glslEditor: {
      [propName: string]: shaderEditorType
    }
  },
  result: {
    content: string
  },
  dividerPosition: {
    verticalDivider: number,
    leftHorizontalDivider: {
      [propName: number]: number
    },
    rightHorizontalDivider: {
      [propName: number]: number
    }
  }
}

interface shaderEditorType {
  content: string
}

interface Action {
  type: string,
  [propName: string]: any
}

interface WebGLFile {
  title: string,
  content: {
    html: string,
    css: string,
    js: string,
    glsl: {
      [propName: string]: string
    }
  }
}