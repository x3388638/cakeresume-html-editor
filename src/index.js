import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution.js'
const prettier = require('prettier/standalone')
const parserHtml = require('prettier/parser-html')

let _EDITOR

/**
 * ==================
 * monaco setting
 * ==================
 */
self.MonacoEnvironment = {
  getWorkerUrl: () => './editor.worker.bundle.js'
}

/**
 * ==================
 * editor elements
 * ==================
 */
const editorStyle = document.createElement('style')
editorStyle.innerHTML = `
  .cakeresume-html-editor {
    display: flex;
    visibility: hidden;
    width: 700px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 99999;
  }

  .cakeresume-html-editor.open {
    visibility: visible;
  }

  .cakeresume-html-editor .tools {
    width: 50px;
    background: yellow;
  }

  .cakeresume-html-editor .editorContainer {
    flex: 1 0 0;
  }
`

const cakeresumeHtmlEditor = document.createElement('div')
cakeresumeHtmlEditor.classList.add('cakeresume-html-editor')

const tools = document.createElement('div')
tools.classList.add('tools')

const editorContainer = document.createElement('div')
editorContainer.classList.add('editorContainer')

cakeresumeHtmlEditor.appendChild(tools)
cakeresumeHtmlEditor.appendChild(editorContainer)
document.body.appendChild(editorStyle)
document.body.appendChild(cakeresumeHtmlEditor)

_EDITOR = monaco.editor.create(editorContainer, {
  value: ['<div>', '\thello world', '</div>'].join('\n'),
  language: 'html',
  theme: 'vs-dark',
  tabSize: 2,
  minimap: {
    enabled: false
  }
})

console.log(_EDITOR)

/**
 * ==================
 * entry button
 * ==================
 */
const entryBtnStyle = document.createElement('style')
entryBtnStyle.innerHTML = `
  .toolbar-btn.btn-openEditor {
    background: #FFD333;
    color: #232A31;
  }

  .toolbar-btn.btn-openEditor:hover {
    background: #FF8B12;
    color: #1D2228;
  }
`

document.body.appendChild(entryBtnStyle)

$('.contentarea').on(
  'click',
  '.ui-draggable .toolbar .btn-openEditor',
  function () {
    const html = $(this).parents('.ui-draggable').html()
    _EDITOR.setValue(
      prettier.format(html, {
        semi: false,
        useTabs: true,
        singleQuote: true,
        endOfLine: 'lf',
        trailingComma: 'none',
        parser: 'html',
        plugins: [parserHtml]
      })
    )
    cakeresumeHtmlEditor.classList.add('open')
  }
)

$('.contentarea .ui-draggable .toolbar').each(function () {
  const $btn = $(
    '<div class="toolbar-btn btn-openEditor" title="Open HTML editor"><i class="fas fa-laptop-code"></i></div>'
  )
  $(this).append($btn)
})
