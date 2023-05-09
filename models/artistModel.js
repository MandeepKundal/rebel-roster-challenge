const mongoose = require('mongoose')

// Define artist schema
const artistSchema = new mongoose.Schema(
    {
        artist: String,
        rate: Number,
        streams: Number,
        payout: {
            type: Number,
            default: 0
        },
        completed: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

// Define artist model
const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;