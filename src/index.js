import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution.js'
import debounce from 'lodash.debounce'
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
let EDITOR
let $activeBlock

/**
 * ==================
 * $element
 * ==================
 */
const $body = $('body')
const $contentarea = $('#contentarea')

const $cakeresumeHtmlEditor = $('<div>').addClass('cakeresume-html-editor')
const $tools = $('<div>').addClass('tools')
const $toolBtnClose = createToolBtn({
  className: 'toolBtnClose',
  faClass: 'fa fa-times'
})
const $toolBtnToggleCollapse = createToolBtn({
  className: 'toolBtnToggleCollapse',
  faClass: 'fas fa-chevron-right'
})
const $toolBtnSync = createToolBtn({
  className: 'toolBtnSync',
  faClass: 'fas fa-sync-alt'
})
const $toolBtnGitHub = createToolBtn({
  className: 'toolBtnGitHub',
  faClass: 'fab fa-github',
  link: 'https://github.com/x3388638/cakeresume-html-editor'
})
const $editorContainer = $('<div>').addClass('editorContainer')

/**
 * ==================
 * event binding
 * ==================
 */
$contentarea.on('click', '.ui-draggable', appendEntryBtn)
$contentarea.on(
  'click',
  '.ui-draggable .toolbar .btn-openEditor',
  handleOpenEditor
)

$toolBtnClose.on('click', handleCloseEditor)
$toolBtnSync.on('click', handleSyncCode)
$toolBtnToggleCollapse.on('click', handleToggleEditor)

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

function createToolBtn({ className, faClass, link }) {
  const $ele = link
    ? $('<a>').attr({ href: link, target: '_blank' })
    : $('<div>')
  return $ele
    .addClass(`toolBtn ${className}`)
    .html(`<i class="${faClass}"></i>`)
}

function setEditorValue(value) {
  EDITOR.setValue(
    prettier.format(value, {
      semi: false,
      useTabs: true,
      singleQuote: true,
      endOfLine: 'lf',
      trailingComma: 'none',
      parser: 'html',
      plugins: [parserHtml]
    })
  )
}

/**
 * ==================
 * event handler
 * ==================
 */
function appendEntryBtn() {
  const $toolbar = $(this).find('.toolbar')
  if (!$toolbar.find('.btn-openEditor').size()) {
    const $btn = $(
      '<div class="toolbar-btn btn-openEditor" title="Open HTML editor"><i class="fas fa-laptop-code"></i></div>'
    )

    $toolbar.append($btn)
  }
}

function handleOpenEditor() {
  $activeBlock = $(this).parents('.ui-draggable')
  const html = $activeBlock.find('> .row').html()
  setEditorValue(html)

  $cakeresumeHtmlEditor.removeClass('collapsed').addClass('open')

  clearBlockHighlight()
  $activeBlock.addClass('editorOpen')
}

function handleCloseEditor() {
  $cakeresumeHtmlEditor.removeClass('open')
  clearBlockHighlight()
}

function handleSyncCode() {
  setEditorValue($activeBlock.find('> .row').html())
}

function handleToggleEditor() {
  $cakeresumeHtmlEditor.toggleClass('collapsed')
}

/**
 * ==================
 * init
 * ==================
 */
const toolBtns = [
  $toolBtnClose,
  $toolBtnToggleCollapse,
  $toolBtnSync,
  $toolBtnGitHub
]
toolBtns.forEach(($btn) => {
  $tools.append($btn)
})

$cakeresumeHtmlEditor.append($tools).append($editorContainer)
$body.append($cakeresumeHtmlEditor)

EDITOR = monaco.editor.create($editorContainer[0], {
  value: ['<div>', '\thello world', '</div>'].join('\n'),
  language: 'html',
  theme: 'vs-dark',
  tabSize: 2,
  minimap: {
    enabled: false
  }
})

EDITOR.getModel().onDidChangeContent(
  debounce((e) => {
    if (!e.isFlush) {
      // not set by api
      const value = EDITOR.getValue()
      $activeBlock.find('> .row').html(value)
      $contentarea.data('contenteditor').onChanged()
    }
  }, 1000)
)
