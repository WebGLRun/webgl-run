import * as types from './types'
import { Dispatch } from 'react-redux';

export function setTitle(title: string) {
  return {
    type: types.SET_TITLE,
    title
  }
}

export function setHTML(html: string) {
  return {
    type: types.SET_HTMLEDITOR_CONTENT,
    html
  }
}

export function setCSS(css: string) {
  return {
    type: types.SET_CSSEDITOR_CONTENT,
    css
  }
}

export function setJS(js: string) {
  return {
    type: types.SET_JSEDITOR_CONTENT,
    js
  }
}

export function setGLSL({name, glsl}: {
  name: string,
  glsl: string
}) {
  return {
    type: types.SET_GLSLEDITOR_CONTENT,
    name,
    glsl
  }
}

export function setSelected(selected: Object) {
  return {
    type: types.SET_SELECTED,
    selected
  }
}

export function setVerticalDividerPosition(position: number) {
  return {
    type: types.SET_VERTICAL_DIVIDER_POSITION,
    position
  }
}

export function setLeftHorizontalDividerPosition(index: number, position: number) {
  return {
    type: types.SET_LEFT_HORIZONTAL_DIVIDER_POSITION,
    index,
    position
  }
}

export function setRightHorizontalDividerPosition(index: number, position: number) {
  return {
    type: types.SET_RIGHT_HORIZONTAL_DIVIDER_POSITION,
    index,
    position
  }
}

export function initEditor(file: WebGLFile) {
  return async function(dispatch: Dispatch) {
    console.log(file)
    await dispatch(setTitle(file.title))
    await dispatch(setHTML(file.content.html))
    await dispatch(setCSS(file.content.css))
    await dispatch(setJS(file.content.js))
    for(let shaderName in file.content.glsl) {
      await dispatch(setGLSL({name: shaderName, glsl: file.content.glsl[shaderName]}))
    }
  }
}

export function clearEditor() {
  return async function(dispatch: Dispatch, getState: Function) {
    const state = getState()
    await dispatch(setTitle(''))
    await dispatch(setHTML(''))
    await dispatch(setCSS(''))
    await dispatch(setJS(''))
    for(let shaderName in state.editor.glslEditor) {
      await dispatch(setGLSL({name: shaderName, glsl: ''}))
    }
  }
}

export function updateResult() {
  return {
    type: types.UPDATE_RESULT
  }
}
