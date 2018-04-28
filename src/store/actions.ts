import * as types from './types'
import { Dispatch } from 'react-redux';

export function setHTML(html: string) {
  return function(dispatch: Dispatch, getState: Function) {
    dispatch({
      type: types.SET_HTMLEDITOR_CONTENT,
      html
    })
    dispatch({
      type: types.SET_RESULT_CONTENT
    })
  }
}

export function setCSS(css: string) {
  return function(dispatch: Dispatch, getState: Function) {
    dispatch({
      type: types.SET_HTMLEDITOR_CONTENT,
      css
    })
    dispatch({
      type: types.SET_RESULT_CONTENT
    })
  }
}

export function setJS(js: string) {
  return function(dispatch: Dispatch, getState: Function) {
    dispatch({
      type: types.SET_HTMLEDITOR_CONTENT,
      js
    })
    dispatch({
      type: types.SET_RESULT_CONTENT
    })
  }
}