
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

function button(name, fun) {
  if(!fun) fun = name, name = null
  return h('button', {onclick: fun}, name || fun.name || 'button')
}

var input

document.body.appendChild(
  h('div#content', 
    h('div',
      input = h('input', {onchange: function () {
        if(this.value) {
  //        emitter.push(this.value)
  //        this.value = ''
          this.select()
        }
      }}),
      button(function shift () {
        input.value = emitter.shift()
      }),
      button(function unshift () {
        if(input.value)
          emitter.unshift(input.value)
        input.value = ''
      }),
      button(function pop () {
        input.value = emitter.pop()
      }),
      button(function push () {
        if(input.value)
          emitter.push(input.value)
        input.value = ''
      })
    ),
    emitter.element,
    pre
  )
)

ch(array, [])

