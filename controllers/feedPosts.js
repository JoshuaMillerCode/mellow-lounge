const Post = require('../models/feedPost');
const express = require('express');
const postRouter = express.Router()

//CRUD

//Create
postRouter.post('/', async (req, res) => {
    try{
        const newPost = await Post.create(req.body);

        res
            .status(200)
            .json(newPost)
    } catch (error) {
        res 
            .status(400)
            .json(error)
    }
})

//Read
    
    //Index
postRouter.get('/', async (req, res) => {
    try {
        const foundPosts = await Post.find({})

        res
            .status(200)
            .json(foundPosts)
    } catch (error) {
        res
            .status(400)
            .json(error)
    }
})

    //Show 
postRouter.get('/:id', async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.id);

        res
            .status(200)
            .json(foundPost)
    } catch (error) {
        res
            .status(400)
            .json(error)
    }
})

//Delete
postRouter.delete('/:id', async (req, res) => {
    try {
        const foundPost = await Post.findByIdAndDelete(req.params.id);

        res
            .status(200)
            .json(foundPost)
    } catch (error) {
        res
            .status(400)
            .json(error)
    }
})

//Update
postRouter.put('/:id', async (req, res) => {
    try {
        const foundPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res
            .status(200)
            .json(foundPost)
    } catch (error) {
        res
            .status(400)
            .json(error)
    }
})

module.exports = postRouter;