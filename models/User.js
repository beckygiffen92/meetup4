const mongoose = require('mongoose');

//A scheme is used to structure data, here we make a structure based around the form that is going
//to be used in our front end files, so that we can save that data to our database.
const UserSchema = new mongoose.Schema({
    personalisedName: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
        contactGroups: [{
        groupName: {
            type: String
        },
        members: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "contacts"
            }
        }], 
        date: {
            type: Date,
            default: Date.now
        }
        }],
    date: {
        type: Date,
        default: Date.now
    }
});
//We use module.exports to 'expose' this module, so that we can call it in different files of pur project
module.exports = User = mongoose.model('user', UserSchema);



