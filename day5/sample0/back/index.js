var express = require('express');
var app     = express();

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


// Retrieve
var MongoClient = require('mongodb').MongoClient;

var users;

function mkusr(id) {
  return {"id": id, "name": "name" + id, "surname": "surname" + id, "admin": false};
}
var ids;
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/angular-course", function(err, db) {
  if(err) {
    console.log(err);
  } else {
    db.createCollection('users', {strict:true}, function(err, collection) {
      if (err) {
        console.log('collection users already exists, using it');
        db.createCollection('users', function(err, collection) {
          users = collection;
          users.findOne({$query:{},$orderby:{id:-1}}).then(function(a) {
            ids = a.id + 1;
          });
        });

      } else {
        console.log('collection users does not exists, fill data');
        users = collection;
        for (var i = 0; i < 15; i++) {
          users.insert(mkusr(i));
        }
        users.findOne({$query:{},$orderby:{id:-1}}).then(function(a) {
          ids = a.id + 1;
        });
      }
    });
  }

});



function newid() {
  return users.findOne({$query:{},$orderby:{id:-1}}).then(function(a) {
    return a.id + 1;
  });
}

function usrById(id) {
  var found = users.filter(function(usr) {return usr.id == id});
  if (found.length > 0) {
    return found[0];
  }
  return undefined;
}

app.get("/api/users", function(req,res) {
  users.find().toArray(function(err, items) {
    if (err) {
      console.log(err);
    }
    console.log(items);
    res.json(items);
  });
});
app.get("/api/users/:id", function(req,res) {
  var id = req.params.id;
  return res.json(usrById(id));
});
app.post("/api/users", function(req,res) {
  var user = req.body;
  newid().then(function(uid) {
    user.id = uid;
    users.insert(user);
    res.json(user);
  })
});
app.put("/api/users/:id", function(req,res) {
  var user = req.body;
  var uid = Number(req.params.id);
  users.update({id:uid}, {$set:user}, {w:1}, function(err, result) {});
  return res.json(user);
});
app.delete("/api/users/:id", function(req,res) {
  var userId = Number(req.params.id);
  users.remove({id: userId});
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
