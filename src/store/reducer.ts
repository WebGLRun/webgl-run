import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import update from 'immutability-helper'
import {composeWithDevTools} from 'redux-devtools-extension'
import * as types from './types'
import {generateResult} from '../utils/generateResult'
import data from '../data/data'
const persistState = require('redux-sessionstorage')

const initialState: RootState = {
  title: 'Default Title',
  selected: {
    sub: data[0].title,
    item: data[0].children[0].children[0].title
  },
  editor: {
    htmlEditor: {
      content: `<div class="test">test</div>`
    },
    cssEditor: {
      content: `body {
  color: #d4d4d4;
  background-color: #1E1E1E;
}`
    },
    jsEditor: {
      content: `function x() {
  console.log("Hello world!");
}`
    }
  },
  result: {
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Webgl-playground</title>
    <style>body {
      color: #d4d4d4;
      background-color: #1E1E1E;
    }</style>
  </head>
  <body>
    <div class="test">test</div>
    <script>
      function x() {
        console.log("Hello world!");
      }
    </script>
  </body>
</html>`
  }
}

const reducer = (state: RootState = initialState, action: Action) => {
  switch(action.type) {
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
    case(types.SET_SELECTED): {
      return update(state, {
        selected: {
          $set: action.selected
        }
      })
    }
    case(types.UPDATE_RESULT): {
      let result = generateResult({
        html: state.editor.htmlEditor.content,
        css: state.editor.cssEditor.content,
        js: (window as any).ts.transpile(state.editor.jsEditor.content)
      })
      return update(state, {
        result: {
          content: {
            $set: result
          }
        }
      })
    }
    default: {
      return state
    }
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk), persistState()))
