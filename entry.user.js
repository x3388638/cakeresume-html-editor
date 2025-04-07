// ==UserScript==
// @name         cakeresume-html-editor
// @namespace    https://2yc.tw
// @version      0.1.7
// @description  A user friendly HTML editor to be plugged to CakeResume to easily tweak your resume layout
// @author       Y.Y.
// @match        https://www.cake.me/resumes/*/edit
// @license      MIT
// @homepage     https://github.com/x3388638/cakeresume-html-editor
// @updateURL    https://openuserjs.org/meta/x3388638/cakeresume-html-editor.js
// @grant        none
// ==/UserScript==
$('body').append(
  $(
    '<script src="https://rawcdn.githack.com/x3388638/cakeresume-html-editor/5f62c59a4ac990a84a9a41f56cce849a932e700d/index.user.js"></script>'
  )
)
