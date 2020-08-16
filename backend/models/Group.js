const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema(
	{
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		groupName: {
			type: String,
			min: 3,
			max: 15,
			trim: true,
			required: [true, 'Group must have a name'],
			unique: [true, 'Group name is already taken'],
		},
		peers: [{
			peerId: {
				type: [mongoose.Types.ObjectId],
				ref: 'User',
			},
		  peerName: {
				type: String,
				trim: true,
			}
		}],
		goals: {
			type: [mongoose.Types.ObjectId],
			ref: 'Goals',
		},
	},
	{
		timestamps: true,
	}
);

const Group = mongoose.model('Group', groupSchema);
module.exports = {
	Group,
	groupSchema,
};
