import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution.js'

self.MonacoEnvironment = {
  getWorkerUrl: () => './editor.worker.bundle.js'
}

monaco.editor.create(document.getElementById('container'), {
  value: ['<div>', '\thello world', '</div>'].join('\n'),
  language: 'html'
})
