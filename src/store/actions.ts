import * as types from './types'
import { Dispatch } from 'react-redux';

export function setTitle(title: string) {
  return {
    type: types.SET_TITLE,
    title
  }
}

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

export function setSelected(selected: Object) {
  return {
    type: types.SET_SELECTED,
    selected
  }
}

export function initEditor(file: File) {
  return async function(dispatch: Dispatch) {
    await dispatch(setTitle(file.title))
    await dispatch({
      type: types.SET_HTMLEDITOR_CONTENT,
      html: file.content.html
    })
    await dispatch({
      type: types.SET_CSSEDITOR_CONTENT,
      css: file.content.css
    })
    await dispatch({
      type: types.SET_JSEDITOR_CONTENT,
      js: file.content.js
    })
    await dispatch({
      type: types.UPDATE_RESULT
    })
  }
}

export function clearEditor() {
  return async function(dispatch: Dispatch) {
    await dispatch(setTitle(''))
    await dispatch({
      type: types.SET_HTMLEDITOR_CONTENT,
      html: ''
    })
    await dispatch({
      type: types.SET_CSSEDITOR_CONTENT,
      css: ''
    })
    await dispatch({
      type: types.SET_JSEDITOR_CONTENT,
      js: ''
    })
    await dispatch({
      type: types.UPDATE_RESULT
    })
  }
}
