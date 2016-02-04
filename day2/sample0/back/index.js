var express = require('express');
var app     = express();

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

var todos = [{id:0, name:"Test"}];
app.get("/api/todos", function(req,res) {
  return res.json(todos);
});
app.get("/api/todos/:id", function(req,res) {
  var id = req.params.id;
  return res.json(todos.filter(function(item) {
    return item.id == id;
  }));
});
app.post("/api/todos", function(req,res) {
  var todo = req.body;
  todo.id = todos.length + 1;
  todos.push(todo);
  return res.json(todo);
});
app.put("/api/todos/:id", function(req,res) {
  var todo = req.body;
  var id = req.params.id;
  var t = todos.filter(function(item) {
    return item.id == id;
  });
  if (t.length > 0) {
    t[0].id = todo.id;
    t[0].name = todo.name;
    return res.json(t[0]);
  }
  return res.json({});
});
app.delete("/api/todos/:id", function(req,res) {
  var id = req.params.id;
  var t = todos.filter(function(item) {
    return item.id == id;
  });
  if (t.length > 0) {
    var item = t[0];
    var index = todos.indexOf(item);
    todos.splice(index, 1);
  }
  return res.status(200).end();
});


app.listen(8080);
