
function template (s) {
   var e = document.createElement('h1')
   e.innerText = s
   return e
}

var array = 'Apple,Banana,Cherry,Durian,ElderBerry'.split(',')
var pre = document.createElement('pre')

var emitter = require('./')(array, template).on('change', ch)

function ch(v, ch) {
  pre.innerText = 
    JSON.stringify(v, null, 2) + '\n\nsplices:' 
  + JSON.stringify(ch)
}

ch(array, [])

document.body.appendChild(emitter.element)

document.body.appendChild(pre)


