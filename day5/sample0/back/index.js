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
        });

      } else {
        console.log('collection users does not exists, fill data');
        users = collection;
        for (var i = 0; i < 15; i++) {
          users.insert(mkusr(i));
        }
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
  var pname = req.query.name;
  var psurname = req.query.surname;
  users.find(pname || psurname ? {name: pname, surname: psurname} : {}).toArray(function(err, items) {
    if (err) {
      console.log(err);
    }
    res.json(items);
  });
});
app.get("/api/users/:id", function(req,res) {
  var userId = Number(req.params.id);
  users.find({id: userId}).limit(1).each(function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).json(err).end();
    } else {
      if (data == null) {
        res.status(404).end();
      } else {
        res.json(data).end();
      }
    }
  });
});
app.post("/api/users", function(req,res) {
  var user = req.body;
  newid().then(function(uid) {
    user.id = uid;
    users.insert(user);
    res.json(user).end();
  })
});
app.put("/api/users/:id", function(req,res) {
  var user = req.body;
  var uid = Number(req.params.id);
  users.update({id:uid}, {$set:user}, {w:1}, function(err, result) {});
  return res.json(user).end();
});
app.delete("/api/users/:id", function(req,res) {
  var userId = Number(req.params.id);
  users.remove({id: userId});
  return res.status(200).end();
});


app.get("*", function(req, res) {
  return res.sendFile(__dirname + '/public/index.html');
})

app.listen(8080);
