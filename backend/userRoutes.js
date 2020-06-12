// User model
const { User } = require('./models/User.js');
const { Comment } = require('./models/Comment.js');
const { Group } = require('./models/Group.js');
const { Goal } = require('./models/Goal.js');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const path = require('path');
const { sendInviteEmail } = require('./mailer.js');

const checkSesssionAndSessionId = (session, sessionUserId) => {
	!(session && sessionUserId) ? false : true;
};
// Root route for users
router.route('/').get((req, res) => {
	res.sendFile(path.resolve('dist/index.html'));
});
// Route for user filtered by id
router.route('/user_id=:user_id').get((req, res) => {
	User.findById(req.params.user_id)
		.then((user) => res.status(200).json(user))
		.catch((err) => res.status(403).json(err));
});
// New user route
router.route('/new_user').post((req, res) => {
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
		.then((newUser) => res.status(201).json(newUser))
		.catch((err) => res.status(403).json(err));
});
// Login route
router.route('/login').post((req, res) => {
	User.findOne({ userName: req.body.userName }, (err, user) => {
		if (!user || !bcrypt.compareSync(req.body.passWord, user.passWord)) {
			res.status(401).json(err);
			return;
		}
		req.session.userId = user._id;
		req.session.userName = user.userName;
		res.status(200).json(user);
	});
});
// route that pulls up group dashboard
router.route('/group_dashboard/group_id=:group_id').get((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
	Group.findOne({ _id: req.params.group_id })
		.then((dashboard) => {
			res.status(200).json(dashboard);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});
// route to grab members in the group
router.route('/group_dashboard/group_id=:group_id/members').get((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
	User.find({ groups: req.params.group_id }, { userName: 1 })
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});
//route to grab goals in the group
router.route('/group_dashboard/group_id=:group_id/goals').get((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
	Goal.find({ groupId: req.params.group_id })
		.then((goals) => {
			res.status(200).json(goals);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});
// find goals for specific member
router.route('/goals/curr_user=:curr_user').get((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
	Goal.find({ 'createdBy.userName': req.params.curr_user })
		.then((goals) => {
			res.status(200).json(goals);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});
//dashboard route
router.route('/dashboard/curr_user=:curr_user').get((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
	User.findOne({ userName: req.params.curr_user })
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});
//route to get group comments
router.route('/group_dashboard/group_id=:group_id/get_comments').get((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
	Comment.find({ group: req.params.group_id })
		.sort({ createdAt: 'desc' }) // sorts list with createdAt descending
		.then((comment) => {
			res.status(200).json(comment);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});
// route to create group and add user that created group to group
router.route('/user_id=:user_id/create_group').post((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
	const createdBy = req.params.user_id;
	const groupName = req.body.groupName;
	const newGroup = new Group({
		createdBy: createdBy,
		groupName: groupName,
	});
	newGroup
		.save()
		.then((newGroup) => {
			res.status(200).json(newGroup._id);
		})
		.catch((err) => res.status(404).json(err));
});
// add group to user array
router.route('/user_id=:user_id/group_id=:group_id/group_to_user').post((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
	User.findByIdAndUpdate(req.params.user_id, { $push: { groups: req.params.group_id } }, function (
		err,
		model
	) {
		err ? res.status(404).json(err) : res.status(200).json(model);
	});
});
// invite user to the group
router.route('/group_id=:group_id/invite_user').post((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
	User.findOne({ email: req.body.email }, (err, user) => {
		let newEmail;
		user ? (newEmail = user.email) : (newEmail = req.body.email);
		if (err) {
			res.status(404).json(err);
			return;
		}
		res.status(200).json(user);
		sendInviteEmail(newEmail);
	});
});
// route to add user to group array
router.route('/user_id=:user_id/group_id=:group_id/add_user_to_group').post((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
	Group.findByIdAndUpdate(
		req.params.group_id,
		{ $push: { members: req.params.user_id } },
		function (err, model) {
			err ? res.status(404).json(err) : res.status(200).json(model);
		}
	);
});
// find group
router.route('/user_id=:user_id/find_group').get((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
	Group.find({ members: req.params.user_id })
		.then((groups) => {
			res.status(200).json(groups);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});
// create goal and add to group
router.route('/group_id=:group_id/create_goal').post((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
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
			err ? res.status(200).json(model) : res.status(400).json(model);
		}
	);
});
// route to add goalstep
router.route('/goal_id=:goal_id/create_goalstep').post((req, res) => {
	checkSesssionAndSessionId(req.session, req.session.userId) ? res.status(401) : null;
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
