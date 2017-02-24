var express = require('express');
var app = express();
var server;

app.all('/pullthetrigger', function (req, res) {
  const commands = [
    'ls',
    'cat /etc/passwd',
    'pwd',
    'git status',
    'cat ~/.bashrc',
    'echo "lol"'
  ];
  const commandToRun = commands[Math.floor(Math.random() * commands.length)];

  res.send(commandToRun);
});


exports.start = function(cb) {
  server = app.listen(3003, function () {
    var host = server.address().address;
    var port = server.address().port;
    if (cb) {
      cb();
    }
    console.log('Example app listening at http://%s:%s', host, port);
  });
}

exports.close = function(cb) {
  if (server) {
    server.close(cb);
  } else {
    cb();
  }
}

if (module.id === require.main.id) {
  exports.start()
}
