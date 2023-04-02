
const $ = require("../../dist/babyQuery")
const { JSDOM } = require('jsdom')
const { window, document } = new JSDOM(`<p>Hello world</p>`).window
global.window = window
global.document = document
console.log($("p").text())