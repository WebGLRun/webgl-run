declare const monaco: Monaco

interface Monaco {
  editor: any
}

interface UserInfo {
  oauthType: string,
  nickName: string,
  id: number
}

interface CreatorInfo {
  nickName: string,
  id: number
}

interface FileInfo {
  type: string,
  hash: string
}

interface RootState {
  user: UserInfo,
  title: string,
  selected: {
    sub: string,
    item: string
  },
  fileInfo: FileInfo,
  creator: CreatorInfo,
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
        [propName: string]: {
          content: string
        }
      }
    },
    result: string
  },
  creator: {
    id: number,
    nickName: string
  }
}