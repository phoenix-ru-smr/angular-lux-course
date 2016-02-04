var express = require('express');
var app     = express();

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


function mkusr(id) {
  return {"id": id, "name": "name" + id, "surname": "surname" + id, "admin": false};
}

var users = [
  mkusr(0),
  mkusr(1),
  mkusr(2),
  mkusr(3),
  mkusr(4),
  mkusr(5),
  mkusr(6),
  mkusr(7),
  mkusr(8),
  mkusr(9),
  mkusr(10),
  mkusr(11),
  mkusr(12),
  mkusr(13),
  mkusr(14),
  mkusr(15),
]
var ids = users.length + 1;
function newid() {
  var i = ids;
  ids = ids + 1;
  return i;
}

function usrById(id) {
  var found = users.filter(function(usr) {return usr.id == id});
  if (found.length > 0) {
    return found[0];
  }
  return undefined;
}

app.get("/api/users", function(req,res) {
  return res.json(users);
});
app.get("/api/users/:id", function(req,res) {
  var id = req.params.id;
  return res.json(usrById(id));
});
app.post("/api/users", function(req,res) {
  var user = req.body;
  user.id = newid();
  users.push(user);
  return res.json(user);
});
app.put("/api/users/:id", function(req,res) {
  var user = req.body;
  var id = req.params.id;
  var t = usrById(id);
  if (t) {
    t.name = user.name;
    t.surname = user.surname;
    t.admin = user.admin;
    return res.json(t);
  }
  return res.json({});
});
app.delete("/api/users/:id", function(req,res) {
  var id = req.params.id;
  var t = usrById(id);
  if (t) {
    var index = users.indexOf(t);
    users.splice(index, 1);
  }
  return res.status(200).end();
});




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
