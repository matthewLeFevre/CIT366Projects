
var express = require('express');
let model = require("../modals/document");
let sequenceGenerator = require("./SequenceGenerator");

var router = express.Router();

function getDocuments(req, res){
  model.find().exec(function(err, documents) {
    if (err) {
      return res.status(500).json({
        title: 'An Error occurred',
        error: err
      });
    }

    res.status(200).json({
      documents: 'Success',
      obj: documents
    });
  });
}
function postDocuments(req, res){
  let maxDocumentId = sequenceGenerator.nextId("documents");
  var document = new model({
    id: maxDocumentId,
    name: req.body.name,
    url: req.body.url,
  });
  document.save(function( err, result ){
    if (err) {
      return res.status(500).json({
        title: 'An Error occurred',
        error: err
      });
    }

    res.status(201).json({
      message: 'saved document',
      obj: result
    });
  });
}
function patchDocuments(req, res){

  model.findOne({id: req.params.id}, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'An Error occurred',
        error: err,
      });
    }

    if (!document) {
      return res.status(500).json({
        title: 'An document found',
        error: {
          message: 'Document not found',
        }
      });
    }
    document.content = req.body.content;
    document.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An Error occurred',
          error: err,
        });
      }
      res.status(200).json({
        message: "Updated document",
        obj: result,
      })
    });
  });

}
function deleteDocuments(req, res){
  model.findOne({id: req.params.id}, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'An Error occurred',
        error: err,
      });
    }

    if (!document) {
      return res.status(500).json({
        title: 'An document found',
        error: {
          message: 'document not found',
        }
      });
    }
    document.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An Error occurred',
          error: err,
        });
      }
      res.status(200).json({
        message: "Delete document",
        obj: result,
      })
    });
  });
}

// HTTP requests


router.get('/', function (req, res, next) {
  getDocuments(req, res);
});

router.post('/', function(req, res, next) {
  postDocuments(req, res);
});

router.patch('/:id', function (req, res, next) {
  patchDocuments(req, res);
});

router.delete('/:id', function (req, res, next) {
  deleteDocuments(req, res);
});

module.exports = router;