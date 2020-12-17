const router = require("express").Router();
const Event = require("../db").import("../models/event"); 
//const { restart } = require("nodemon");
const validateSession = require("../middleware/validate-session");
//const { Op } = require("sequelize");


//Create an event
router.post("/create", (req, res) => {
  //console.log(req.user);
  let eventModel = { 
    title: req.body.title,
    date: req.body.date,
    //date includes time
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    owner_id: req.body.id
  };

  Event.create(eventModel) 
    //.then((event) => console.log("Event Create:", event))
    .then((event) => res.status(200).json(event))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get an event you created by ID to view its details
router.get('/owner', validateSession, (req, res) => {
    Event
      .findAll({
        where: { owner_id: req.user.id},
      })
      .then((events) => res.status(200).json(events))
      .catch((err) => res.status(500).json({ error: err }));
});

//Get all events by zip
router.get('/zip/:zip', (req, res) => {
    Event.findAll({ 
        where: {zip: zip}
    })
        .then(events => res.status(200).json(events)) 
        .catch(err => res.status(500).json({error: err})) 
});

//Update an event you created
router.put("/edit/:id", validateSession, function (req, res) {
  const event = {
    title: req.body.event.title,
    date: req.body.event.date,
    address: req.body.event.address,
    city: req.body.event.city,
    state: req.body.event.state,
    zip: req.body.event.zip
  };

  const query = { where: { owner_id: req.user.id, id: req.params.id } }; 
Event 
    .update(event, query)
    .then((event) =>
      res
        .status(200)
        .json({ message: "Your event has been edited successfully" })
    ) 
    .catch((err) => res.status(500).json({ error: err }));
});

//Delete event
router.delete("/:id", validateSession, (req, res) => {
  Event 
    .destroy({ where: { owner_id: req.user.id, id: req.params.id } })
    .then((event) => res.status(200).json({ message: "Event has been deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;