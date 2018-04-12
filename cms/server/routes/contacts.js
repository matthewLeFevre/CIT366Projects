
var express = require('express');
let model = require("../modals/contact");

let sequenceGenerator = require("./SequenceGenerator");
var router = express.Router();

function getContacts(req, res) {

  model.find().populate('group').exec(function(err, contacts) {
    if (err) {
      return res.status(500).json({
        title: 'An Error occurred',
        error: err
      });
    }

    res.status(200).json({
      contacts: 'Success',
      obj: contacts
    });
  });
}

function postContacts(req, res){
  let maxContactId = sequenceGenerator.nextId("contacts");

  var contact = new model({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    imageUrl: req.body.imageUrl,
    phone: req.body.phone,
    group: req.body.group,
  });

  if  (contact.group && contact.group.length > 0) {
    for (let groupContact of contact.group) {
      groupContact = groupContact.__id;
    }
  }
  contact.save(function( err, result ){
    if (err) {
      return res.status(500).json({
        title: 'An Error occurred',
        error: err
      });
    }

    res.status(201).json({
      message: 'saved contact',
      obj: result
    });
  });
}
function patchContacts(req, res){

  model.findOne({id: req.params.id}, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'An Error occurred',
        error: err,
      });
    }

    if (!contact) {
      return res.status(500).json({
        title: 'An contact found',
        error: {
          message: 'contact not found',
        }
      });
    }
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imageUrl = req.body.imageUrl;
    contact.group = req.body.group;
    contact.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An Error occurred',
          error: err,
        });
      }
      res.status(200).json({
        message: "Updated contact",
        obj: result,
      })
    });
  });

}
function deleteContacts(req, res){
  model.findById({id: req.params.id}, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'An Error occurred',
        error: err,
      });
    }

    if (!contact) {
      return res.status(500).json({
        title: 'An contact found',
        error: {
          message: 'contact not found',
        }
      });
    }
    contact.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An Error occurred',
          error: err,
        });
      }
      res.status(200).json({
        message: "Delete contact",
        obj: result,
      })
    });
  });
}


// HTTP requests


router.get('/', function (req, res, next) {
  getContacts(req, res);
});

router.post('/', function(req, res, next) {
  postContacts(req, res);
});

router.patch('/:id', function (req, res, next) {
  patchContacts(req, res);
});

router.delete('/:id', function (req, res, next) {
  deleteContacts(req, res);
});


module.exports = router;