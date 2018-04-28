import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import update from 'immutability-helper'
import {composeWithDevTools} from 'redux-devtools-extension'
import * as types from './types'
const persistState = require('redux-localstorage')

const initialState: RootState = {
  editor: {
    htmlEditor: {
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Webgl-playground</title>
  </head>
  <body>
    <div class="test">test</div>
  </body>
</html>`
    },
    cssEditor: {
      content: `body {
  background-color: #eee;
}`
    },
    jsEditor: {
      content: `function x() {
  console.log("Hello world!");
}`
    }
  },
  result: {
    content: '123'
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
    case(types.SET_RESULT_CONTENT): {
      return update(state, {
        result: {
          content: {
            $set: action.result
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
