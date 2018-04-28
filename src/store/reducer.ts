import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import update from 'immutability-helper'
import {composeWithDevTools} from 'redux-devtools-extension'
import * as types from './types'
import {generateResult} from '../utils/generateResult'
const persistState = require('redux-localstorage')

const initialState: RootState = {
  editor: {
    htmlEditor: {
      content: `<div class="test">test</div>`,
      test: 12345678
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
    case(types.UPDATE_RESULT): {
      let result = generateResult({
        html: state.editor.htmlEditor.content,
        css: state.editor.cssEditor.content,
        js: state.editor.jsEditor.content
      })
      console.log('new result:', result)
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
