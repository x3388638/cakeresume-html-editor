// ==UserScript==
// @name         cakeresume-html-editor
// @namespace    https://2yc.tw
// @version      0.1.1
// @description  A user friendly HTML editor to be plugged to CakeResume to easily tweak your resume layout
// @author       Y.Y.
// @match        https://www.cakeresume.com/resumes/*/edit
// @license      MIT
// @homepage     https://github.com/x3388638/cakeresume-html-editor
// @updateURL
// @grant        none
// ==/UserScript==
$('body').append(
  $(
    '<script src="https://rawcdn.githack.com/x3388638/cakeresume-html-editor/069d809b41fb6827a4fc06f66e463be12144060f/index.user.js"></script>'
  )
)