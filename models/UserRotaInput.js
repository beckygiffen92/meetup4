const mongoose = require('mongoose');

//A scheme is used to structure data, here we make a structure based around the form that is going
//to be used in our front end files, so that we can save that data to our database.
const UserRotaInput = new mongoose.Schema({
    inputDateMon: {
        type: Date
    },
    inputDateTue: {
        type: Date
    },
    inputDateWed: {
        type: Date
    },
    inputDatThu: {
        type: Date
    },
    inputDateFri: {
        type: Date
    },
    inputDateSat: {
        type: Date
    },
    inputDateSun: {
        type: Date
    },
    startTimeMon: {
        type: String
    },
    startTimeTue: {
        type: String
    },
    startTimeWed: {
        type: String
    },
    startTimeThu: {
        type: String
    },
    startTimeFri: {
        type: String
    },
    startTimeSat: {
        type: String
    },
    startTimeSun: {
        type: String
    },
    endTimeMon: {
        type: String
    },
    endTimeTue: {
        type: String
    },
    endTimeWed: {
        type: String
    },
    endTimeThu: {
        type: String
    },
    endTimeFri: {
        type: String
    },
    endTimeSat: {
        type: String
    },
    endTimeSun: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
//We use module.exports to 'expose' this module, so that we can call it in different files of pur project
module.exports = User = mongoose.model('user', UserSchema);

