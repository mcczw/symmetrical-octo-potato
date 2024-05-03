const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		default: true
	}
});

const User = module.exports = mongoose.model('User', userSchema);

// Get All Users - find method
module.exports.getUsers = (callback, limit) => {
        User.find(callback).limit(limit);
}

// Get User - findById method
module.exports.getUserById = (id, callback) =>{
	User.findById({"_id":id}, callback);
}

// Add User - create method
module.exports.addUser = (newUser,callback) =>{
	User.create([newUser], callback);
}

// Update User - findOneAndUpdate method
module.exports.updateUser = (filter, newUser, options, callback)=>{
	User.findOneAndUpdate({"_id":filter}, newUser, {new: true}, callback);
}

// Delete User - deleteOne method
module.exports.removeUser = (id, callback) => {
	User.deleteOne({"_id": id}, callback);
}


