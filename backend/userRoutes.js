// User model
const { User } = require("./models/User.js");
const { Comment } = require("./models/Comment.js");
const { Group } = require("./models/Group.js");
const { Goal } = require("./models/Goal.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const path = require("path");
const { sendInviteEmail } = require("./mailer.js");
const { upLoadCommentImage } = require("./S3.js");

// Root route for users
router.route("/").get((req, res) => {
  res.sendFile(path.resolve("dist/index.html"));
});
// Route for user filtered by id
router.route("/user_id=:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(404).json(err));
});
// New user route
router.route("/newUser").post((req, res) => {
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  const hash = bcrypt.hashSync(passWord, 8);
  const email = req.body.email;
  const newUser = new User({
    userName: userName,
    passWord: hash,
    email: email,
  });
  newUser
    .save()
    .then((newUser) => res.status(200).json(newUser))
    .catch((err) => res.status(404).json(err));
});
// login route
router.route("/login").post((req, res) => {
  User.findOne({ userName: req.body.userName }, (err, user) => {
    if (!user || !bcrypt.compareSync(req.body.passWord, user.passWord)) {
      res.status(404).json(err);
      return;
    }
    req.session.userId = user._id;
    req.session.userName = user.userName;
    res.status(200).json(user);
  });
});
// route that pulls up group dashboard
router.route("/group_dashboard/:group_id").get((req, res) => {
  Group.findOne({ _id: req.params.group_id }, (err, group) => {
    if (!(req.session && req.session.userId)) {
      res.status(401).json(err);
      return;
    }
    res.status(200).json(group);
  });
});
// route to grab members in the group
router.route("/group_dashboard/:group_id/members").get((req, res) => {
  User.find({ groups: req.params.group_id }, { userName: 1 })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//route to grab goals in the group
router.route("/group_dashboard/:group_id/goals").get((req, res) => {
  Goal.find({ groupId: req.params.group_id })
    .then((goals) => {
      res.status(200).json(goals);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//dashboard route
router.route("/dashboard/:userName").get((req, res) => {
  User.findOne({ userName: req.params.userName }, (err, user) => {
    if (!(req.session && req.session.userId)) {
      res.status(401).json(err);
      return;
    }
    res.status(200).json(user);
  });
});
// route to create the comments
router.route("/group_dashboard/group_id=:group_id/create_comment").post((req, res) => {
  console.log(req.files);
  // const text = req.body.text;
  // const buffer = Buffer.from(req.body.image.toString());
  // const image = upLoadCommentImage(buffer, `${req.session.userId}-${Math.random()}`);
  // const newComment = new Comment({
  //   createdBy: { 
  //     userId: req.session.userId,
  //     userName: req.session.userName
  //   },
  //   group: req.params.group_id,
  //   image: image,
  //   text: text,
  // });
  // newComment
  //   .save()
  //   .then((newComment) => res.status(200).json(newComment))
  //   .catch((err) => res.status(404).json(err));
})
//route to get group comments
router.route("/group_dashboard/group_id=:group_id/get_comments").get((req, res) => { 
  Comment.find({ group: req.params.group_id })
    .then((comment) => { 
      res.status(200).json(comment);
    })
    .catch((err) => { 
      res.status(400).json(err);
    });
});
// route to create group and add user that created group to group
router.route("/user_id=:id/create_group").post((req, res) => {
  const createdBy = req.params.id;
  const groupName = req.body.groupName;
  const newGroup = new Group({
    createdBy: createdBy,
    groupName: groupName,
  });
  newGroup
    .save()
    .then((newGroup) => res.status(200).json(newGroup._id))
    .catch((err) => res.status(404).json(err));
});
// add group to user array
router
  .route("/user_id=:user_id/group_id=:group_id/group_to_user")
  .post((req, res) => {
    User.findByIdAndUpdate(
      req.params.user_id,
      { $push: { groups: req.params.group_id } },
      function (err, model) {
        err ? res.status(404).json(err) : res.status(200).json(model);
      }
    );
  });
// invite user to the group
router.route("/group_id=:group_id/invite_user").get((req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    let newEmail;
    user ? (newEmail = user.email) : (newEmail = req.body.newPeerEmail);
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(user);
    sendInviteEmail(newEmail);
  });
});
// route to add user to group array
router
  .route("/user_id=:user_id/group_id=:group_id/add_user_to_group")
  .post((req, res) => {
    Group.findByIdAndUpdate(
      req.params.group_id,
      { $push: { members: req.params.user_id } },
      function (err, model) {
        err ? res.status(404).json(err) : res.status(200).json(model);
      }
    );
  });
// find group
router.route("/user_id=:user_id/find_group").get((req, res) => {
  Group.find({ members: req.params.user_id })
    .then((groups) => {
      res.status(200).json(groups);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
// create goal and add to group
router.route("/group_id=:group_id/create_goal").post((req, res) => {
  const goalName = req.body.goalName;
  const goal = req.body.goal;
  const goalStep = req.body.goalStep;
  const groupId = req.params.group_id;
  const goalDuration = new Date(req.body.goalDuration);
  const newGoal = new Goal({
    createdBy: {
      userId: req.session.userId,
      userName: req.session.userName,
    },
    groupId: groupId,
    goal: goal,
    goalName: goalName,
    goalStep: goalStep,
    goalDuration: goalDuration,
  });
  newGoal
    .save()
    .then((newGoal) => res.status(200).json(newGoal))
    .catch((err) => res.status(404).json(err));
  Group.findByIdAndUpdate(
    req.params.group_id,
    { $push: { goals: newGoal._id } },
    { useFindAndModify: false },
    function (err, model) {
      err ? res.status(404).json(err) : res.status(200).json(model);
    }
  );
});
// route to add goalstep
router.route("/goal_id=:goal_id/create_goalstep").post((req, res) => {
  const newGoalStep = req.body.newGoalStep;
  Goal.findByIdAndUpdate(
    // refactor so code isn't so dry but works for now
    req.params.goal_id,
    { $push: { goalStep: newGoalStep } },
    function (err, model) {
      err ? res.status(404).json(err) : res.status(200).json(newGoalStep);
    }
  );
});

module.exports = router;
