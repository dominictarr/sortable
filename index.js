var $ = require('./ui')
var EventEmitter = require('events').EventEmitter

module.exports = function (array, template, list) {

  var emitter = new EventEmitter()
  if(!(list instanceof HTMLElement))
    list = document.createElement(list || "ol")

  function index (e) {
    return [].indexOf.call(e.parentNode.children, e)
  }

  sortableList(array, template, function (ary, ch) {
    emitter.emit('change', ary, ch)
  }, list) 

  function sortableList(array, template, onChange, list) {
    array = array.slice()
    array.forEach(function (e, i) {
      var el = e && template(e, i)
      if(el) list.appendChild(el)
    })

    var from
    
    $(list).sortable({
      start: function (e, u) {
        console.log('START', from = index(u.item[0]))
      },
      stop: function (e, u) {
        var to = index(u.item[0])
        console.log('TO', to, 'FROM', from)
        //if(to > from) to
        var a = array.slice()
        var v = array[from]
        var changes = [[from, 1], [to, 0, v]]
        
        changes.forEach(function (ch) {
          a.splice.apply(a, ch)
        })

        array = a.slice()
        onChange(a, changes);
      }
    }).disableSelection();
  }

  emitter.element = list

  return emitter
}
