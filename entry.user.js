// ==UserScript==
// @name         cakeresume-html-editor
// @namespace    https://2yc.tw
// @version      0.1.3
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
    '<script src="https://rawcdn.githack.com/x3388638/cakeresume-html-editor/2ec4db61cae2fe57d14236e07d3b7cb746718320/index.user.js"></script>'
  )
)
