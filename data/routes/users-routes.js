const router = require("express").Router();
const Users = require("../data/db");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});
module.exports = router;

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(users => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "We could not find the user." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.post("/", (req, res) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.body) {
    res.status(400).json({ message: "please enter in all fields" });
  } else {
    Users.insert(newUser)
      .then(user => {
          //
          // user = {
          // id: "3"
          // }
          //
        //res.status(201).json({ ...user, ...newUser });
        return Users.findById(user.id)
      })
      .then( user => {
          res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({ message: "internal Server Error" });
      })
  }
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Users.remove(id)
      .then(user => {
        res
          .status(200)
          .json({ message: `User with ${id} has been removed`, id: id });
      })
      .catch(err => {
        res.status(500).json({ message: "internal Server Error" });
      });
})

module.exports = router;
