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

  if (!newUser.name || !newUser.bio) {
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
        return Users.findById(user.id);
      })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: "internal Server Error" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then(countDeleted => {
      if (countDeleted) {
        res
          .status(200)
          .json({ message: `User with ${id} has been removed`, id: id });
      } else {
        res.status(404).json({ errorMessage: "No user found." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "internal Server Error" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;

  if (!changes.name || !changes.bio) {
    res.status(400).json({message: `Please enter all fields!`})
  } else {
const user = Users.findById(id);
  if(!user) {
    res.status(404).json({message: `There is no user with the id of ${id}`})
  } else {
    const updatedCount = Users.update(id, changes);
    const updatedUser = User.findById({id});
    res.status(200).json(updatedCount)
  }
  }
   .catch(err => {
      res.status(500).json({ message: "internal Server Error" })
})



module.exports = router;
