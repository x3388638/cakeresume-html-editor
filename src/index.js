import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution.js'
import './style.css'
const prettier = require('prettier/standalone')
const parserHtml = require('prettier/parser-html')

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
 * variable
 * ==================
 */
let _EDITOR

/**
 * ==================
 * $element
 * ==================
 */
const $body = $('body')
const $contentarea = $('.contentarea')

const $cakeresumeHtmlEditor = $('<div>').addClass('cakeresume-html-editor')
const $tools = $('<div>').addClass('tools')
const $toolBtnClose = createToolBtn('toolBtnClose', 'times')
const $toolBtnToggleCollapse = createToolBtn(
  'toolBtnToggleCollapse',
  'angle-right'
)
const $editorContainer = $('<div>').addClass('editorContainer')

/**
 * ==================
 * event binding
 * ==================
 */
$contentarea.on(
  'click',
  '.ui-draggable .toolbar .btn-openEditor',
  handleOpenEditor
)

$toolBtnClose.on('click', handleCloseEditor)
$toolBtnToggleCollapse.on('click', handleToggleEditor)

/**
 * ==================
 * event handler
 * ==================
 */
function handleOpenEditor() {
  const $block = $(this).parents('.ui-draggable')
  const html = $block.html()
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

  $cakeresumeHtmlEditor.removeClass('collapsed').addClass('open')

  clearBlockHighlight()
  $block.addClass('editorOpen')
}

function handleCloseEditor() {
  $cakeresumeHtmlEditor.removeClass('open')
  clearBlockHighlight()
}

function handleToggleEditor() {
  $cakeresumeHtmlEditor.toggleClass('collapsed')
}

/**
 * ==================
 * utils
 * ==================
 */
function clearBlockHighlight() {
  $contentarea.find('.ui-draggable').each(function () {
    $(this).removeClass('editorOpen')
  })
}

function createToolBtn(className, icon) {
  return $('<div>')
    .addClass(`toolBtn ${className}`)
    .html(`<i class="fa fa-${icon}"></i>`)
}

/**
 * ==================
 * init
 * ==================
 */
$tools.append($toolBtnClose).append($toolBtnToggleCollapse)
$cakeresumeHtmlEditor.append($tools).append($editorContainer)
$body.append($cakeresumeHtmlEditor)

_EDITOR = monaco.editor.create($editorContainer[0], {
  value: ['<div>', '\thello world', '</div>'].join('\n'),
  language: 'html',
  theme: 'vs-dark',
  tabSize: 2,
  minimap: {
    enabled: false
  }
})

$contentarea.find('.ui-draggable .toolbar').each(function () {
  const $btn = $(
    '<div class="toolbar-btn btn-openEditor" title="Open HTML editor"><i class="fas fa-laptop-code"></i></div>'
  )

  $(this).append($btn)
})
