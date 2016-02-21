#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var midi = require('midi')
var minimist = require('minimist')

var argv = minimist(process.argv.slice(2), {
  alias: { k: 'key', t: 'threshold' }
})
if (argv._[0] === 'help' || argv.help) {
  usage(0)
} else if (argv._[0] === 'list') {
  var input = new(midi.input)()
  var ports = input.getPortCount()
  for (var i = 0; i < ports; i++) {
    console.log(i + '  ' + input.getPortName(i))
  }
  process.exit(0)
} else if (argv._[0] === 'open' && argv._[1] !== undefined) {
  var n = argv._[1]
  var input = new(midi.input)()
  var state = {}
  input.on('message', function (dt, data) {
    if (argv.key) {
      var k = data[argv.key]
      state[k] = data
      var t = argv.threshold
      if (t) {
        var s = t.split(':')
        if (data[s[0]] <= Number(s[1])) delete state[k]
      }
      console.log(JSON.stringify({ delta: dt, data: state }))
    } else console.log(JSON.stringify({ delta: dt, data: data }))
  })
  input.openPort(n)
} else usage(1)

function usage (code) {
  fs.readFile(path.join(__dirname, 'usage.txt'), 'utf8', onread)
  function onread (err, src) {
    console.log(src)
    process.exit(code)
  }
}
