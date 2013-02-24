
var h = require('hyperscript')

function template (s) {
   var e = document.createElement('h1')
   e.innerText = s
   return e
}

var array = 'Apple,Banana,Cherry,Durian,ElderBerry'.split(',')
var pre = h('div')

var emitter = require('./')(array, template).on('change', ch)

function ch(v, ch) {
  pre.innerHTML = ''
  pre.appendChild(
    h('div',
      h('pre', JSON.stringify(v, null, 2)),
      h('h3', 'splices'),
      h('pre', JSON.stringify(ch))
    )
  )
}


document.body.appendChild(
  h('div#content', 
    emitter.element,
    h('input', {onchange: function () {
      if(this.value) {
        emitter.push(this.value)
        this.value = ''
        this.select()
      }
    }}),
    pre
  )
)

ch(array, [])

