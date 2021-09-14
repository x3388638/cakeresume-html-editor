// ==UserScript==
// @name         cakeresume-html-editor
// @namespace    https://2yc.tw
// @version      0.1.6
// @description  A user friendly HTML editor to be plugged to CakeResume to easily tweak your resume layout
// @author       Y.Y.
// @match        https://www.cakeresume.com/resumes/*/edit
// @license      MIT
// @homepage     https://github.com/x3388638/cakeresume-html-editor
// @updateURL    https://openuserjs.org/meta/x3388638/cakeresume-html-editor.js
// @grant        none
// ==/UserScript==
$('body').append(
  $(
    '<script src="https://rawcdn.githack.com/x3388638/cakeresume-html-editor/cc95bd1b76d1a1e288e37b9b57de9e636f855c49/index.user.js"></script>'
  )
)
