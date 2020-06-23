const ExampleOfWork = require('../models/ExampleOfWork')
const path = require('path');
var slugify = require('slugify')
exports.create_example = function(req, res) {
  ExampleOfWork.create(req.body , function (err, record) {
    if (err) return res.status(400).send(err);
    res.send(record)
  });
}

exports.create = function(req, res, next) {
  var record = new ExampleOfWork(req.body);
  if (req.files.cover) {
    var filename = slugify(req.files.cover.name)
    var directory = path.join(__dirname, '..', 'public', 'uploads', filename)
    record.image = path.join('uploads', filename)
  }
  record.save(function (err, work) {
    if (err) return res.status(400).send(err);
    if (directory) {
      req.files.cover.mv(directory)
    }
    res.json(work)
  })
}

exports.list = function(req, res, next) {
  ExampleOfWork.find({}, (err, works) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.json(works)
    }
  })
}
exports.show = function(req, res, next) {
  var { id } = req.params
  ExampleOfWork.findById(id, function (err, doc) {
    if (err) {
      return res.status(404).send(err)
    }
    res.json(doc)
  });
}
exports.update = function(req, res, next) {
  var { id } = req.params
  ExampleOfWork.findByIdAndUpdate(
    id,
    req.body,
    { new: true, upsert: false},
      function (err, doc) {
        if (err) {
          return res.status(404).send(err)
        }
        res.json(doc)
    }
  );
}
exports.delete = function(req, res, next) {
  ExampleOfWork.remove({ _id: req.params.id }, function(err) {
    if (!err) {
      return res.status(204).json("No content")
    }
    res.send(err)
  });
}
