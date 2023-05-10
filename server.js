const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');

const Artist = require('./models/artistModel.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Enabling CORS for specific origins only
let corsOptions = {
    origin : ['http://localhost:3000'],
}

app.use(cors(corsOptions));

// MongoDB Atlas connection string
const url = 'mongodb+srv://admin:123Admin@devcluster.lrwvjzi.mongodb.net/artistRoster?retryWrites=true&w=majority';

// Read artist data from JSON file
const artistData = JSON.parse(fs.readFileSync('./data/roster.json'));
const { data } = artistData;

async function addArtists() {
    try {
        await Artist.collection.drop(); // Delete any existing Artist collection before entering new data
        console.log('Emptied the collection');
        for (const artist of data) {
            artist.payout = (artist.rate * artist.streams).toFixed(2); // Calculate payout amount for each artist
            const newArtist = new Artist(artist);
            await newArtist.save();
        }
        console.log('Added artists collection to the database');
    } catch (error) {
        console.log('Error when saving artists to the database:', error.message);
    }
}

// Get all artists
app.get('/artists', async(req, res) => {
    try {
        const artistList = await Artist.find({});
        res.status(200).json(artistList);
    } catch (error) {
        console.log('Error when fetching artists from the database:', error.message);
    }
});

// Update artist payout status
app.put('/artists/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        const updatedArtist = await Artist.findByIdAndUpdate(
            id, // Uses the passed id to look for the right artist to update
            { $set: { completed } }, // Sets the artist's payout to complete
            { returnDocument: 'after' } // Returns the updated document
        );
        res.status(200).json(updatedArtist);
        console.log(`Updated ${updatedArtist.artist}'s payout status to ${completed}`);
    } catch(error) {
        console.log('Error when updating payout status in the database:', error.message);
    }
});

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    // Add data to the database
    addArtists();

    // Start the server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error(err);
  });