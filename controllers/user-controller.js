const { User, Thought } = require('../models');

const userController = {
  // get all pizzas
  getAllUsers(req, res) {
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one pizza by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createPizza
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update pizza by id
  updateUser({ params, body}, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
         .then(dbUserData => {
             if (!dbUserData) {
                 res.status(404).json({ message: 'No user found with this id!' });
                 return;
             }
             res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));
} ,
  // delete pizza
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id! '});
            return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

//use addReply from pizza hunt as template
   addFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.id },
        { $push: { friends: params.friendId } },
        { new: true}
    )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},
  //use remove reply to delete friend
   deleteFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId  } },
        { new: true }
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
}
};
module.exports = userController;
