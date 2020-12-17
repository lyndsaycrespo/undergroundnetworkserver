const router = require("express").Router();
const Message = require("../db").import("../models/message"); 
//const { restart } = require("nodemon");
const validateSession = require("../middleware/validate-session");
//const { Op } = require("sequelize");


//Create a message
router.post("/create", (req, res) => {
  //console.log(req.user);
  let messageModel = { 
    info: req.body.info,
    urgency: req.body.urgency,
    owner_id: req.body.id
  };

  Message.create(messageModel) 
    //.then((event) => console.log("Message Create:", message))
    .then((message) => res.status(200).json(message))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get a message you created by ID to view its details
router.get('/owner', validateSession, (req, res) => {
    Message
      .findAll({
        where: { owner_id: req.user.id},
      })
      .then((messages) => res.status(200).json(messages))
      .catch((err) => res.status(500).json({ error: err }));
});

//LOOK: Get all messages by event - how to relate to event id?
//Organize by timestamp on the front end
//No validate session here
router.get('/event/:event', (req, res) => {
    Event.findAll({ 
        where: {zip: zip} //this needs to be the event id?
    })
        .then(messages => res.status(200).json(messages)) 
        .catch(err => res.status(500).json({error: err})) 
});

//Update an event you created
router.put("/edit/:id", validateSession, function (req, res) {
  const message = {
    info: req.body.message.info,
    urgency: req.body.message.urgency
  };

  const query = { where: { owner_id: req.user.id, id: req.params.id } }; 
Message 
    .update(message, query)
    .then((message) =>
      res
        .status(200)
        .json({ message: "Your message has been edited successfully" })
    ) 
    .catch((err) => res.status(500).json({ error: err }));
});

//Delete event
router.delete("/delete/:id", validateSession, (req, res) => {
  Message 
    .destroy({ where: { owner_id: req.user.id, id: req.params.id } })
    .then((message) => res.status(200).json({ message: "Message has been deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;