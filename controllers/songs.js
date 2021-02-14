const Song = require('../models/song');
const express = require('express');
const songRouter = express.Router()

//CRUD

//Create
songRouter.post('/', async (req, res) => {
    try{
        const newFavSong = await Song.create(req.body);

        res
            .status(200)
            .json(newFavSong)
    } catch (error) {
        res 
            .status(400)
            .json(error)
    }
})

//Read
    
    //Index
songRouter.get('/', async (req, res) => {
    try {
        const foundSongs = await Song.find({})

        res
            .status(200)
            .json(foundSongs)
    } catch (error) {
        res
            .status(400)
            .json(error)
    }
})

    //Show 
songRouter.get('/:id', async (req, res) => {
    try {
        const foundSong = await Song.findById(req.params.id);

        res
            .status(200)
            .json(foundSong)
    } catch (error) {
        res
            .status(400)
            .json(error)
    }
})

//Delete
songRouter.delete('/:id', async (req, res) => {
    try {
        const foundSong = await Song.findByIdAndDelete(req.params.id);

        res
            .status(200)
            .json(foundSong)
    } catch (error) {
        res
            .status(400)
            .json(error)
    }
})

//Update
songRouter.put('/:id', async (req, res) => {
    try {
        const foundSong = await Song.findByIdAndUpdate(req.params.id);

        res
            .status(200)
            .json(foundSong)
    } catch (error) {
        res
            .status(400)
            .json(error)
    }
})

module.exports = songRouter;