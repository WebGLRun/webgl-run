import * as types from './types'
import { Dispatch } from 'react-redux';

export function setHTML(html: string) {
  return async function(dispatch: Dispatch) {
    await dispatch({
      type: types.SET_HTMLEDITOR_CONTENT,
      html
    })
    await dispatch({
      type: types.UPDATE_RESULT
    })
  }
}

export function setCSS(css: string) {
  return async function(dispatch: Dispatch) {
    await dispatch({
      type: types.SET_CSSEDITOR_CONTENT,
      css
    })
    await dispatch({
      type: types.UPDATE_RESULT
    })
  }
}

export function setJS(js: string) {
  return async function(dispatch: Dispatch) {
    await dispatch({
      type: types.SET_JSEDITOR_CONTENT,
      js
    })
    await dispatch({
      type: types.UPDATE_RESULT
    })
  }
}
