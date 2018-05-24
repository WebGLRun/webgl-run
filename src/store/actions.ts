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

export function setUser(user: UserInfo) {
  return {
    type: types.SET_USER,
    user
  }
}

export function setFileInfo(fileInfo: FileInfo) {
  return {
    type: types.SET_FILE_INFO,
    fileInfo
  }
}

export function setResult(result: string) {
  return {
    type: types.SET_RESULT,
    result
  }
}

export function setCreator(creator: CreatorInfo) {
  return {
    type: types.SET_CREATOR,
    creator
  }
}

export function resetStore() {
  return {
    type: types.RESET_STORE
  }
}

export function initEditor(file: WebGLFile) {
  return async function(dispatch: Dispatch) {
    await dispatch(setTitle(file.title))
    await dispatch(setHTML(file.content.editor.htmlEditor.content))
    await dispatch(setCSS(file.content.editor.cssEditor.content))
    await dispatch(setJS(file.content.editor.jsEditor.content))
    for(let shaderName in file.content.editor.glslEditor) {
      await dispatch(setGLSL({name: shaderName, glsl: file.content.editor.glslEditor[shaderName].content}))
    }
    await dispatch(setResult(file.content.result))
    await dispatch(setCreator(file.creator))
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
