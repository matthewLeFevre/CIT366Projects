var express = require('express');
let model = require("../modals/message");
let sequenceGenerator = require("./SequenceGenerator");
var router = express.Router();

function getMessages (req, res) {
  model.find().exec(function(err, messages) {
    if (err) {
      return res.status(500).json({
        title: 'An Error occurred',
        error: err
      });
    }

    res.status(200).json({
      messages: 'Success',
      obj: messages
    })
  });
}
function postMessages (req, res) {
  var maxMessageId = sequenceGenerator.nextId("messages");
  console.log(maxMessageId);
  var message = new model({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });
  message.save(function( err, result ){
    if (err) {
      return res.status(500).json({
        title: 'An Error occurred',
        error: err
      });
    }

    res.status(201).json({
      message: 'saved message',
      obj: result
    });
  });
}
function patchMessages (req, res) {
  model.findById({id: req.params.id}, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An Error occurred',
        error: err,
      });
    }

    if (!message) {
      return res.status(500).json({
        title: 'An message found',
        error: {
          message: 'message not found',
        }
      });
    }
    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    message.sender = req.body.sender;
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An Error occurred',
          error: err,
        });
      }
      res.status(200).json({
        message: "Updated message",
        obj: result,
      })
    });
  });
}

function deleteMessages (req, res) {
  model.findById({id: req.params.id}, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An Error occurred',
        error: err,
      });
    }

    if (!message) {
      return res.status(500).json({
        title: 'An message found',
        error: {
          message: 'message not found',
        }
      });
    }
    message.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An Error occurred',
          error: err,
        });
      }
      res.status(200).json({
        message: "Delete message",
        obj: result,
      })
    });
  });
}

// HTTP requests


router.get('/', function (req, res, next) {
  getMessages(req, res);
});

router.post('/', function(req, res, next) {
  postMessages(req, res);
});

router.patch('/:id', function (req, res, next) {
  patchMessages(req, res);
});

router.delete('/:id', function (req, res, next) {
  deleteMessages(req, res);
});
module.exports = router;