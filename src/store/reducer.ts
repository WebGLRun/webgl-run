import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import update from 'immutability-helper'
import {composeWithDevTools} from 'redux-devtools-extension'
import * as types from './types'
import {generateResult} from '../utils/generateResult'
import data from '../data/data'
const persistState = require('redux-sessionstorage')

const initialState: RootState = {
  mode: 'canvas',
  user: {
    oauthType: '',
    nickName: 'Anonymous',
    id: 1
  },
  title: 'Default Title',
  creator: {
    nickName: '',
    id: -1
  },
  fileInfo: {
    type: 'canvas',
    hash: ''
  },
  listInfo: {
    list: {
      hash: '',
      title: 'Default List',
      items: []
    },
    selected: ''
  },
  editor: {
    htmlEditor: {
      content: ``
    },
    cssEditor: {
      content: ``
    },
    jsEditor: {
      content: ``
    },
    glslEditor: {
      vertexShader: {
        content: `// use $shaders.vertexShader in js to access`
      },
      fragmentShader: {
        content: `// use $shaders.fragmentShader in js to access`
      }
    }
  },
  dividerPosition: {
    verticalDivider: 0,
    leftHorizontalDivider: {
      [0]: 36,
      [1]: 250
    },
    rightHorizontalDivider: {
      [0]: 36,
      [1]: 250
    }
  },
  result: {
    content: ``
  }
}

const reducer = (state: RootState = initialState, action: Action) => {
  switch(action.type) {
    case(types.RESET_STORE): {
      return JSON.parse(JSON.stringify(initialState))
    }
    case(types.SET_TITLE): {
      return update(state, {
        title: {
          $set: action.title
        }
      })
    }
    case(types.SET_HTMLEDITOR_CONTENT): {
      return update(state, {
        editor: {
          htmlEditor: {
            content: {
              $set: action.html
            }
          }
        }
      })
    }
    case(types.SET_CSSEDITOR_CONTENT): {
      return update(state, {
        editor: {
          cssEditor: {
            content: {
              $set: action.css
            }
          }
        }
      })
    }
    case(types.SET_JSEDITOR_CONTENT): {
      return update(state, {
        editor: {
          jsEditor: {
            content: {
              $set: action.js
            }
          }
        }
      })
    }
    case(types.SET_GLSLEDITOR_CONTENT): {
      return update(state, {
        editor: {
          glslEditor: {
            [action.name]: {
              content: {
                $set: action.glsl
              }
            }
          }
        }
      })
    }
    case(types.SET_LIST): {
      return update(state, {
        listInfo: {
          list: {
            $set: action.list
          }
        }
      })
    }
    case(types.SET_LIST_SELECTED): {
      return update(state, {
        listInfo: {
          selected: {
            $set: action.selected
          }
        }
      })
    }
    case(types.SET_CREATOR): {
      return update(state, {
        creator: {
          $set: action.creator
        }
      })
    }
    case(types.SET_RESULT): {
      return update(state, {
        result: {
          content: {
            $set: action.result
          }
        }
      })
    }
    case(types.UPDATE_RESULT): {
      let result = generateResult({
        html: state.editor.htmlEditor.content,
        css: state.editor.cssEditor.content,
        js: (window as any).ts.transpileModule(state.editor.jsEditor.content, {
          compilerOptions: {
            target: (window as any).ts.ModuleKind.ESNext
          }
        }).outputText,
        glsl: state.editor.glslEditor
      })
      return update(state, {
        result: {
          content: {
            $set: result
          }
        }
      })
    }
    case(types.SET_VERTICAL_DIVIDER_POSITION): {
      return update(state, {
        dividerPosition: {
          verticalDivider: {
            $set: action.position
          }
        }
      })
    }
    case(types.SET_LEFT_HORIZONTAL_DIVIDER_POSITION): {
      return update(state, {
        dividerPosition: {
          leftHorizontalDivider: {
            [action.index]: {
              $set: action.position
            }
          }
        }
      })
    }
    case(types.SET_RIGHT_HORIZONTAL_DIVIDER_POSITION): {
      return update(state, {
        dividerPosition: {
          rightHorizontalDivider: {
            [action.index]: {
              $set: action.position
            }
          }
        }
      })
    }
    case(types.SET_USER): {
      return update(state, {
        user: {
          $set: action.user
        }
      })
    }
    case(types.SET_FILE_INFO): {
      return update(state, {
        fileInfo: {
          $set: action.fileInfo
        }
      })
    }
    case(types.SET_MODE): {
      return update(state, {
        mode: {
          $set: action.mode
        }
      })
    }
    default: {
      return state
    }
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk), persistState()))
